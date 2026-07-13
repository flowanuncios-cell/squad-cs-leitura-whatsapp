# Setup Evolution API self-hosted — Squad CS MVP

> Manual operacional **para o Raphael** rodar sozinho, com Claude orientando.
> Stack: **Hostinger VPS R$ 39/mês + Evolution API self-hosted + Script alerta crítico Node.js**.
> Tempo total: **4-6 horas no primeiro dia** + 30 min/mês de manutenção.
> Custo total: ~**R$ 60/mês** (VPS R$ 39 + Claude API R$ 20).

---

## ⚠️ Antes de começar — leia esta seção inteira

Este manual vai te transformar em **sysadmin part-time**. Não é catastrófico, mas você precisa aceitar:

### O que você vai fazer no dia a dia

- **Pagar a VPS Hostinger** mensalmente (boleto/cartão automático)
- **Re-escanear QR Code** do WhatsApp Business do Gabriel se cair (~5 min, pode ser de madrugada)
- **Atualizar Evolution** a cada ~2 meses (eu te aviso, ~30 min)
- **Conferir mensalmente** se o backup está rodando

### Como me chamar quando der pau

Quando algo quebrar (não vai ser frequente, mas vai acontecer):

1. **Tira print do erro** (terminal ou painel Evolution)
2. **Me chama nesta conversa** dizendo: "Squad CS deu erro X" + cola o print
3. Eu retomo do contexto e te oriento o conserto

⚠️ Não tenho on-call 24/7 — quando me chamar de madrugada, posso demorar a responder. Use isso pra emergências reais, não pra dúvidas que esperam até amanhã de manhã.

---

## Visão geral em 1 página

```
INTERNET (clientes)
    │
    │ mensagem WhatsApp no grupo
    ▼
┌─────────────────────────────────────┐
│ WhatsApp Business do Gabriel        │  (celular do Gabriel - já existe)
│ (conectado via QR Code à VPS)       │
└─────────────────────────────────────┘
    │
    │ Evolution API "escuta" os grupos
    ▼
┌─────────────────────────────────────┐
│ VPS HOSTINGER R$ 39/mês             │  (Ubuntu rodando 24/7)
│  ├─ Evolution API (Docker)          │
│  ├─ PostgreSQL (Docker)             │
│  └─ Script alerta-critico.js (Node) │
└─────────────────────────────────────┘
    │
    │ Quando detecta sinal crítico
    ▼
┌─────────────────────────────────────┐
│ Claude API analisa: é grave?        │
└─────────────────────────────────────┘
    │
    │ SIM
    ▼
┌─────────────────────────────────────┐
│ WhatsApp do RAPHAEL (você)          │  recebe alerta em < 60s
│ + mais tarde: WhatsApp do Gabriel   │
└─────────────────────────────────────┘
```

---

# DIA 1 — Setup completo (4-6h)

## Etapa 1 — Contratar VPS Hostinger (30 min)

### 1.1 Criar conta
- Acessa: https://www.hostinger.com.br/vps-hosting
- Clica em **Comprar Agora** no plano **KVM 2** (8 GB RAM, 2 vCPU)
- Preço: **R$ 38,99/mês no plano 24 meses** (R$ 935 à vista) OU **~R$ 100/mês no plano mensal** (mais flexível, mais caro)
- **Recomendação:** plano de **12 meses** (R$ 54/mês) — bom meio-termo entre economia e compromisso
- Login com `flowanuncios@gmail.com`

### 1.2 Configurar VPS
Na hora de "configurar seu servidor", escolhe:

| Opção | Valor |
|-------|-------|
| **Localização** | São Paulo (BR) |
| **Sistema operacional** | Ubuntu 24.04 (LTS) — **sem painel** (sem cPanel/Plesk) |
| **Hostname** | `squad-cs-flow` |
| **Senha root** | Crie uma forte (16+ caracteres) — **GUARDE NUM GERENCIADOR DE SENHA** (Bitwarden, 1Password) |

Aguarda 2-5 min — VPS provisiona.

### 1.3 Anotar dados essenciais
No painel hPanel → seu VPS → "Visão geral":

```
IP público da VPS:    XX.XX.XX.XX        ← anota
Usuário root:         root
Senha root:           ********           ← anota
```

**⚠️ Critico:** sem esses 3 dados, eu não consigo te orientar.

---

## Etapa 2 — Conectar via SSH (15 min)

SSH = "terminal remoto". Você abre um terminal no seu PC que comanda a VPS lá no servidor.

### 2.1 Abrir PowerShell no seu PC
- Tecla Windows → digita `PowerShell` → abre

### 2.2 Conectar na VPS
Cola este comando (substitui o IP):

```powershell
ssh root@XX.XX.XX.XX
```

- Primeira vez vai perguntar "Are you sure you want to continue connecting?" → digita `yes`
- Pede a senha root → cola a senha que você criou
- Quando ver algo tipo `root@squad-cs-flow:~#` → **você está dentro da VPS** ✅

### 2.3 Testar comandos básicos
Cola e roda:

```bash
hostname
uptime
free -h
df -h
```

Se aparecer informação (nome, tempo ligado, memória, disco) → tudo OK.

### 2.4 Atualizar o sistema
Antes de instalar qualquer coisa:

```bash
apt update && apt upgrade -y
```

Demora ~5 min. Aceita reiniciar serviços se perguntar (`y`).

---

## Etapa 3 — Instalar Docker (15 min)

Docker = "caixinha" que isola programas. Evolution roda dentro dele.

### 3.1 Instalar Docker
Cola tudo de uma vez:

```bash
curl -fsSL https://get.docker.com | sh
```

Aguarda. Quando voltar o prompt, testa:

```bash
docker --version
docker compose version
```

Tem que aparecer algo tipo `Docker version 27.x` e `Docker Compose version v2.x`.

### 3.2 Habilitar Docker pra iniciar com a VPS
```bash
systemctl enable docker
systemctl start docker
```

---

## Etapa 4 — Subir Evolution API (30 min)

### 4.1 Criar pasta do projeto
```bash
mkdir -p /opt/squad-cs
cd /opt/squad-cs
```

### 4.2 Criar arquivo de configuração Docker

Cola este comando inteiro (atenção: começa com `cat >` e termina com `EOF`):

```bash
cat > docker-compose.yml << 'EOF'
version: '3.9'

services:
  evolution:
    image: atendai/evolution-api:v2.2.3
    container_name: evolution_api
    restart: always
    ports:
      - "8080:8080"
    environment:
      # Auth
      - AUTHENTICATION_API_KEY=TROCAR_POR_CHAVE_FORTE_AQUI
      - AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true

      # Server
      - SERVER_URL=http://EVOLUTION_IP_AQUI:8080
      - SERVER_PORT=8080

      # Database (Postgres)
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://evo:evopass@postgres:5432/evolution
      - DATABASE_CONNECTION_CLIENT_NAME=evolution

      # Cache
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379/0
      - CACHE_REDIS_PREFIX_KEY=evolution

      # Webhook global (vamos usar instance-level depois)
      - WEBHOOK_GLOBAL_ENABLED=false

      # Logs
      - LOG_LEVEL=ERROR,WARN,INFO
      - LOG_COLOR=true

      # Storage
      - S3_ENABLED=false

      # Misc
      - DEL_INSTANCE=false
      - QRCODE_LIMIT=30
      - LANGUAGE=pt-BR

    volumes:
      - evolution_instances:/evolution/instances
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    container_name: evolution_postgres
    restart: always
    environment:
      - POSTGRES_USER=evo
      - POSTGRES_PASSWORD=evopass
      - POSTGRES_DB=evolution
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: evolution_redis
    restart: always
    volumes:
      - redis_data:/data

volumes:
  evolution_instances:
  postgres_data:
  redis_data:
EOF
```

### 4.3 Substituir 2 valores no arquivo

**Valor 1: chave API forte** — gere uma:

```bash
openssl rand -hex 32
```

Vai aparecer algo tipo `7f3a9b2e4c8d1f5...` (64 caracteres). **Copia.** Agora abre o arquivo pra editar:

```bash
nano docker-compose.yml
```

Procura `TROCAR_POR_CHAVE_FORTE_AQUI` (Ctrl+W → cola → Enter), substitui pela chave que você gerou.

**Valor 2: IP da sua VPS** — substitui `EVOLUTION_IP_AQUI` pelo IP público da sua VPS (mesmo que você usou no SSH).

Salva: `Ctrl+O` → Enter → `Ctrl+X`

### 4.4 Subir o stack

```bash
docker compose up -d
```

Demora 2-5 min na primeira vez (baixa as imagens). Quando voltar o prompt:

```bash
docker compose ps
```

Tem que aparecer 3 containers com status `Up` ou `running`:
- `evolution_api`
- `evolution_postgres`
- `evolution_redis`

### 4.5 Testar
```bash
curl http://localhost:8080
```

Tem que aparecer um JSON tipo:
```json
{"status":200,"message":"Welcome to the Evolution API..."}
```

Se aparecer, **Evolution está rodando** ✅

---

## Etapa 5 — Abrir o painel Evolution no seu navegador (15 min)

### 5.1 Liberar a porta 8080 no firewall da VPS
```bash
ufw allow 8080/tcp
ufw allow 22/tcp
ufw --force enable
```

### 5.2 Abrir o painel
No seu navegador (Chrome), acessa:

```
http://XX.XX.XX.XX:8080/manager
```
(substitui XX.XX.XX.XX pelo IP da VPS)

Vai pedir a `API Key` → cola a chave que você gerou na Etapa 4.3.

✅ Você está no painel Evolution.

⚠️ **URL feia e sem HTTPS porque não temos domínio.** Aceitável pra uso interno. Em algum momento futuro, recomendo comprar domínio (Registro.br, R$ 40/ano) — fica `https://whatsapp.flowon.com.br/manager`. Por enquanto segue assim.

---

## Etapa 6 — Conectar WhatsApp Business do Gabriel (15 min)

### 6.1 Criar a instância
No painel Evolution (Manager):
1. Clica em **"+ Instance"** no canto superior direito
2. Preenche:
   - **Instance Name:** `gabriel`
   - **Token:** (deixa gerar automático)
3. Clica **Save**

### 6.2 Conectar via QR Code
1. Clica na instância `gabriel` recém-criada
2. Aparece um **QR Code**
3. **No celular do Gabriel:**
   - Abre WhatsApp Business
   - 3 pontinhos → **Aparelhos conectados** → **Conectar um aparelho**
   - Aponta a câmera pro QR Code
4. Em ~5 segundos, o status da instância vira **`open`** (verde)

✅ WhatsApp do Gabriel agora está sob orquestração do Evolution.

### 6.3 Teste de sanidade
1. Peça pro Gabriel mandar uma mensagem qualquer pra um grupo de teste (ou pra você mesmo)
2. No painel Evolution → aba **"Messages"** ou **"Events"** → a mensagem aparece quase em tempo real

Se aparecer → **TUDO FUNCIONANDO** 🎉

---

## Etapa 7 — Conta Anthropic (Claude API) (15 min)

### 7.1 Criar conta
- https://console.anthropic.com
- Sign up com `flowanuncios@gmail.com`
- Confirma email

### 7.2 Adicionar crédito
- Menu lateral → **Plans & Billing** → **Add credit**
- Adiciona **$ 5 USD** (cerca de R$ 28) — vai durar muito tempo pro nosso uso

### 7.3 Criar API Key
- Menu lateral → **API Keys** → **Create Key**
- Nome: `squad-cs-alerta`
- **COPIA A KEY** (formato `sk-ant-api03-...`) — só aparece 1x
- Guarda no seu gerenciador de senhas

---

## Etapa 8 — Subir o script de alerta crítico (45 min)

### 8.1 Voltar pra VPS via SSH (se desconectou)
```powershell
ssh root@XX.XX.XX.XX
```

### 8.2 Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version
```

Tem que aparecer `v20.x.x`.

### 8.3 Criar pasta do script
```bash
mkdir -p /opt/squad-cs/alerta-critico
cd /opt/squad-cs/alerta-critico
```

### 8.4 Criar o script

Cola tudo:

```bash
cat > alerta-critico.js << 'EOF'
/**
 * Script de Alerta Crítico - Squad CS Flow On (MVP)
 *
 * Recebe webhook do Evolution API (mensagens dos grupos do Gabriel),
 * filtra por palavras-chave de risco, valida com Claude API,
 * e envia alerta no WhatsApp do Raphael.
 *
 * Roda 24/7 na mesma VPS do Evolution.
 */

const http = require('http');
const https = require('https');

// ============ CONFIG ============
const CONFIG = {
  // Servidor local
  PORT: 3000,

  // Evolution API (mesma VPS)
  EVO_URL: 'http://localhost:8080',
  EVO_API_KEY: process.env.EVO_API_KEY,
  EVO_INSTANCE: 'gabriel',

  // Anthropic Claude API
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

  // Destinatário do alerta (seu WhatsApp Raphael)
  // Formato: 55 + DDD + numero (sem +, sem espaco)
  ALERTA_DESTINO: process.env.ALERTA_DESTINO, // ex: 5521999998888

  // Palavras de risco (primeira camada - filtro barato antes do Claude)
  PALAVRAS_RISCO: [
    'cancelar', 'encerrar contrato', 'rescindir',
    'pessimo', 'péssimo', 'horrivel', 'horrível',
    'vocês cobram', 'voces cobram', 'não entregam', 'nao entregam',
    'desistir', 'decepcionado', 'decepcionada',
    'perdendo tempo', 'inadmissível', 'inadmissivel',
    'cobrar judicial', 'processar', 'reclame aqui',
    'denunciar', 'absurdo', 'inacreditável',
    'nunca mais', 'nao recomendo', 'não recomendo'
  ]
};

// ============ HELPERS ============

function logInfo(msg) {
  console.log(`[${new Date().toISOString()}] INFO: ${msg}`);
}

function logError(msg, err) {
  console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, err);
}

// Filtro rápido por palavra-chave
function contemPalavraRisco(texto) {
  const lower = texto.toLowerCase();
  return CONFIG.PALAVRAS_RISCO.some(palavra => lower.includes(palavra));
}

// Classificação Claude
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
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONFIG.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          const text = json.content[0].text;
          // Extrai o JSON da resposta (Claude as vezes envolve em markdown)
          const match = text.match(/\{[\s\S]*\}/);
          if (match) {
            resolve(JSON.parse(match[0]));
          } else {
            reject(new Error('Claude nao retornou JSON valido'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Enviar mensagem via Evolution
async function enviarWhatsApp(numero, mensagem) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      number: numero,
      text: mensagem
    });

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/message/sendText/${CONFIG.EVO_INSTANCE}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': CONFIG.EVO_API_KEY,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Evolution retornou ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ============ WEBHOOK HANDLER ============

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method not allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    res.writeHead(200);
    res.end('OK');

    try {
      const evento = JSON.parse(body);

      // Filtra: so processa mensagens recebidas (nao enviadas pelo Gabriel)
      if (evento.event !== 'messages.upsert') return;
      if (evento.data.key.fromMe) return; // mensagem que o Gabriel mandou
      if (!evento.data.key.remoteJid.endsWith('@g.us')) return; // so grupos

      const texto = evento.data.message?.conversation
                 || evento.data.message?.extendedTextMessage?.text;
      if (!texto) return; // mensagem sem texto (audio, imagem, etc)

      const autor = evento.data.pushName || 'desconhecido';
      const grupo = evento.data.key.remoteJid;

      logInfo(`Msg de ${autor} no grupo ${grupo}: "${texto.substring(0, 80)}..."`);

      // Filtro 1: palavra-chave
      if (!contemPalavraRisco(texto)) {
        return;
      }

      logInfo(`Possivel risco detectado, chamando Claude...`);

      // Filtro 2: classificacao Claude
      const analise = await classificarComClaude(texto, autor, grupo);

      logInfo(`Claude: ${JSON.stringify(analise)}`);

      if (!analise.is_critico) return;

      // ALERTA!
      const alerta = `*ALERTA CRITICO*\n\n` +
        `*Grupo:* ${grupo}\n` +
        `*Autor:* ${autor}\n` +
        `*Urgencia:* ${analise.urgencia}\n` +
        `*Motivo:* ${analise.motivo}\n\n` +
        `*Citacao:*\n"${analise.citacao}"\n\n` +
        `*Mensagem completa:*\n${texto}\n\n` +
        `Hora: ${new Date().toLocaleString('pt-BR')}`;

      await enviarWhatsApp(CONFIG.ALERTA_DESTINO, alerta);
      logInfo(`Alerta enviado para ${CONFIG.ALERTA_DESTINO}`);

    } catch (err) {
      logError('Erro processando webhook', err);
    }
  });
});

server.listen(CONFIG.PORT, () => {
  logInfo(`Script alerta-critico ouvindo na porta ${CONFIG.PORT}`);
  logInfo(`Instance: ${CONFIG.EVO_INSTANCE}`);
  logInfo(`Alerta destino: ${CONFIG.ALERTA_DESTINO}`);
});
EOF
```

### 8.5 Criar arquivo de variáveis de ambiente

```bash
cat > .env << 'EOF'
EVO_API_KEY=COLE_AQUI_A_CHAVE_DO_DOCKER_COMPOSE
ANTHROPIC_API_KEY=COLE_AQUI_A_KEY_CLAUDE_sk-ant-...
ALERTA_DESTINO=55SEU_DDD_E_NUMERO
EOF
```

Edita:
```bash
nano .env
```

Substitui:
- `EVO_API_KEY` → a mesma chave que você gerou na Etapa 4.3
- `ANTHROPIC_API_KEY` → a key sk-ant-api03... da Etapa 7.3
- `ALERTA_DESTINO` → **seu WhatsApp pessoal** (Raphael), formato `5521999998888` (55 + DDD + numero, sem espaços/traços/parênteses)

Salva: Ctrl+O → Enter → Ctrl+X

### 8.6 Rodar o script como serviço permanente

Vou usar `systemd` pra ele subir junto com a VPS e reiniciar sozinho se cair.

```bash
cat > /etc/systemd/system/squad-cs-alerta.service << 'EOF'
[Unit]
Description=Squad CS - Script de Alerta Critico
After=docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=/opt/squad-cs/alerta-critico
EnvironmentFile=/opt/squad-cs/alerta-critico/.env
ExecStart=/usr/bin/node /opt/squad-cs/alerta-critico/alerta-critico.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/squad-cs-alerta.log
StandardError=append:/var/log/squad-cs-alerta.log

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable squad-cs-alerta
systemctl start squad-cs-alerta
```

Confere se está rodando:
```bash
systemctl status squad-cs-alerta
```

Tem que aparecer `active (running)` em verde.

### 8.7 Configurar webhook no Evolution

Volta no painel Evolution (http://IP:8080/manager) → instância `gabriel` → aba **Webhook**:

- **URL:** `http://localhost:3000`  (o script está rodando ali mesmo na VPS)
- **Events:** marca apenas `messages.upsert`
- **Webhook by Events:** habilitado
- Salva

---

## Etapa 9 — TESTE DE PONTA A PONTA (15 min)

### 9.1 Verificar log do script
```bash
tail -f /var/log/squad-cs-alerta.log
```

Vai mostrar mensagens em tempo real. Deixa esse terminal aberto.

### 9.2 Disparar um teste real
- Pede pro Gabriel mandar num grupo de teste a mensagem:
  > "vocês cobram mas não entregam, assim não dá"

- No terminal do log você deve ver em sequência:
  ```
  INFO: Msg de Cliente Teste no grupo XXX@g.us: "vocês cobram mas não entregam..."
  INFO: Possivel risco detectado, chamando Claude...
  INFO: Claude: {"is_critico":true,"urgencia":"P1",...}
  INFO: Alerta enviado para 55XXX
  ```

- **No seu WhatsApp** (Raphael) chega em ~10-30 segundos uma mensagem formatada com o alerta.

### 9.3 Se algo der errado

| Sintoma | Causa | Solução |
|---------|-------|---------|
| Nada acontece no log | Webhook não configurado | Volta etapa 8.7 |
| `ECONNREFUSED 8080` | Evolution caiu | `cd /opt/squad-cs && docker compose ps` |
| `401 Unauthorized` Anthropic | API key errada | Confere `.env` |
| `404 Instance not found` | Instance name errado | Confere se é `gabriel` em ambos lugares |
| Alerta não chega no seu WhatsApp | Número formatado errado | Tem que ser `5521999998888`, sem +, sem espaço |

Quando travar de verdade → **me chama nesta conversa**, cola o erro do log.

---

# CHECKLIST FINAL DO DIA 1

- [ ] Hostinger VPS contratada e ativa
- [ ] SSH funcionando do seu PowerShell
- [ ] Docker instalado
- [ ] Evolution rodando (3 containers Up)
- [ ] Painel Evolution acessível pelo navegador
- [ ] Instância `gabriel` criada e com WhatsApp Business conectado (status `open`)
- [ ] Conta Anthropic criada com créditos
- [ ] Script `alerta-critico.js` rodando como serviço (`systemctl status` verde)
- [ ] Webhook configurado no Evolution apontando pra `http://localhost:3000`
- [ ] Teste ponta-a-ponta funcionou (alerta chegou no seu WhatsApp)

**Se marcou tudo:** parabéns, você tem um Squad CS MVP rodando 🎉

---

# DIA A DIA — Como você opera daqui pra frente

## Comandos úteis (cola quando precisar)

```bash
# Ver se tudo está rodando
ssh root@IP_VPS
docker compose -f /opt/squad-cs/docker-compose.yml ps
systemctl status squad-cs-alerta

# Ver logs do script de alerta
tail -100 /var/log/squad-cs-alerta.log

# Ver logs do Evolution
docker logs evolution_api --tail 100

# Reiniciar tudo
docker compose -f /opt/squad-cs/docker-compose.yml restart
systemctl restart squad-cs-alerta

# Re-escanear QR Code (quando WhatsApp do Gabriel cair)
# 1. Abre http://IP_VPS:8080/manager
# 2. Clica na instancia `gabriel`
# 3. Aparece o QR Code novo
# 4. Gabriel escaneia de novo no celular
```

## Ajustar a sensibilidade do alerta

Se vier **muito falso positivo** (alerta toda hora pra coisa boba):
- Edita `alerta-critico.js` linha `PALAVRAS_RISCO` → tira palavras genericas demais
- `nano /opt/squad-cs/alerta-critico/alerta-critico.js` → Ctrl+W busca → ajusta → salva
- `systemctl restart squad-cs-alerta`

Se vier **muito falso negativo** (passou alerta importante):
- Adiciona palavras novas na mesma lista
- Mesmo passo: edita + restart

## Custos mensais previstos

| Item | Custo |
|------|-------|
| Hostinger VPS KVM 2 | R$ 39-54 |
| Claude API (uso baixo) | ~R$ 20 (5-20 alertas/dia) |
| **Total** | **R$ 60-75/mês** |

## Sobre backup

A Hostinger faz **snapshot semanal automático** do plano KVM 2 (incluído). Em caso de desastre total, restaura a VPS inteira em 30 min via painel.

Não precisa configurar nada agora.

## Atualização do Evolution (a cada ~2 meses)

Eu vou te avisar quando sair versão importante. O comando é simples:

```bash
cd /opt/squad-cs
docker compose pull
docker compose up -d
```

---

# Próximos passos depois do MVP rodando

Quando esse alerta crítico estiver maduro (1-2 semanas) e você confiar, podemos:

1. **Adicionar Workflow 2:** transcricao de reunião → cards Trello (mesma VPS, script novo)
2. **Adicionar WhatsApp do segundo CS** (Luana, ou quem você decidir) — multi-instância
3. **Migrar pro pacote completo `pacote-implementacao-v1.0`** quando o programador entrar (a VPS atual continua, só agrega Next.js)

---

# Se você abandonar o projeto

Se em 30 dias você decidir que não vale a pena:

1. No painel Hostinger → cancela VPS (cobra mensal proporcional)
2. No console Anthropic → desabilita a API key
3. Gabriel desconecta o aparelho no WhatsApp Business → 3 pontinhos → Aparelhos conectados → remove
4. Pronto. Tudo desligado, R$ 0/mês.

---

*Manual gerado em 2026-05-19. Atualizar conforme você executar e descobrir o que precisa mais detalhe.*
