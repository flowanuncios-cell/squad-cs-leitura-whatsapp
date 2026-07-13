/**
 * Script de Alerta Crítico — VERSÃO SÓ-LEITURA (Squad CS Flow On MVP)
 *
 * Diferença do alerta-critico.js original: este NUNCA envia mensagem pelo
 * WhatsApp. O Evolution só RECEBE (escuta os grupos). O alerta sai pelo
 * TELEGRAM. É leitura pura no que toca ao WhatsApp — não há nenhuma chamada
 * a /message/sendText.
 *
 * Roda 24/7 na mesma VPS do Evolution (systemd), igual ao original.
 */

const http = require("http");
const https = require("https");

// ============ CONFIG ============
const CONFIG = {
  PORT: 3000,

  // Anthropic Claude API (validação do sinal crítico)
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

  // Telegram — pra onde o alerta vai (em vez do WhatsApp)
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,

  // Palavras de risco (filtro barato antes do Claude)
  PALAVRAS_RISCO: [
    "cancelar", "encerrar contrato", "rescindir",
    "pessimo", "péssimo", "horrivel", "horrível",
    "vocês cobram", "voces cobram", "não entregam", "nao entregam",
    "desistir", "decepcionado", "decepcionada",
    "perdendo tempo", "inadmissível", "inadmissivel",
    "cobrar judicial", "processar", "reclame aqui",
    "denunciar", "absurdo", "inacreditável",
    "nunca mais", "nao recomendo", "não recomendo",
  ],
};

// ============ HELPERS ============
function logInfo(msg) {
  console.log(`[${new Date().toISOString()}] INFO: ${msg}`);
}
function logError(msg, err) {
  console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, err);
}

function contemPalavraRisco(texto) {
  const lower = texto.toLowerCase();
  return CONFIG.PALAVRAS_RISCO.some((p) => lower.includes(p));
}

// Classificação Claude (Haiku — barato e rápido)
async function classificarComClaude(mensagem, autor, grupo) {
  const prompt = `Voce e um analista de Customer Success de uma agencia de marketing.
Analise a mensagem abaixo enviada num grupo de WhatsApp de cliente. Diga se ela representa um sinal critico real (cliente insatisfeito, ameaca de cancelamento, cobranca agressiva) ou se e apenas conversa normal.

Mensagem: "${mensagem}"
Autor: ${autor}
Grupo: ${grupo}

Responda APENAS em JSON valido:
{"is_critico": true/false, "urgencia": "P0|P1|P2", "motivo": "explicacao curta", "citacao": "trecho mais critico"}

Regras:
- P0 = ameaca direta de cancelamento ou processo judicial
- P1 = insatisfacao grave, cobranca agressiva
- P2 = leve incomodo, nao critico (is_critico=false)`;

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CONFIG.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(data),
      },
    };
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          const text = json.content[0].text;
          const match = text.match(/\{[\s\S]*\}/);
          if (match) resolve(JSON.parse(match[0]));
          else reject(new Error("Claude nao retornou JSON valido"));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// Enviar alerta via TELEGRAM (substitui o envio por WhatsApp do original)
async function enviarTelegram(mensagem) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text: mensagem,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
    const options = {
      hostname: "api.telegram.org",
      path: `/bot${CONFIG.TELEGRAM_TOKEN}/sendMessage`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        if (res.statusCode === 200) resolve(JSON.parse(body));
        else reject(new Error(`Telegram ${res.statusCode}: ${body}`));
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// ============ WEBHOOK HANDLER ============
const server = http.createServer(async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    res.writeHead(200);
    res.end("OK");
    try {
      const evento = JSON.parse(body);
      if (evento.event !== "messages.upsert") return;
      if (evento.data.key.fromMe) return; // ignora o que o próprio número mandou
      if (!evento.data.key.remoteJid.endsWith("@g.us")) return; // só grupos

      const texto =
        evento.data.message?.conversation ||
        evento.data.message?.extendedTextMessage?.text;
      if (!texto) return; // sem texto (áudio/imagem) — MVP não transcreve ainda

      const autor = evento.data.pushName || "desconhecido";
      const grupo = evento.data.key.remoteJid;

      logInfo(`Msg de ${autor} no grupo ${grupo}: "${texto.substring(0, 80)}..."`);

      if (!contemPalavraRisco(texto)) return; // filtro 1: palavra-chave
      logInfo("Possivel risco detectado, chamando Claude...");

      const analise = await classificarComClaude(texto, autor, grupo); // filtro 2
      logInfo(`Claude: ${JSON.stringify(analise)}`);
      if (!analise.is_critico) return;

      const alerta =
        `🔴 *ALERTA CRÍTICO — CS Flow*\n\n` +
        `*Grupo:* ${grupo}\n` +
        `*Autor:* ${autor}\n` +
        `*Urgência:* ${analise.urgencia}\n` +
        `*Motivo:* ${analise.motivo}\n\n` +
        `*Citação:*\n"${analise.citacao}"\n\n` +
        `*Mensagem completa:*\n${texto}\n\n` +
        `🕐 ${new Date().toLocaleString("pt-BR")}`;

      await enviarTelegram(alerta);
      logInfo("Alerta enviado no Telegram.");
    } catch (err) {
      logError("Erro processando webhook", err);
    }
  });
});

server.listen(CONFIG.PORT, () => {
  logInfo(`Script alerta-critico (SÓ-LEITURA) ouvindo na porta ${CONFIG.PORT}`);
  logInfo("Saída: Telegram. WhatsApp é apenas escutado, nunca respondido.");
});
