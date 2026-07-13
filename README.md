# Squad CS — WhatsApp em modo LEITURA → Alerta Telegram

> Pasta consolidada (13/07/2026). Tudo que precisa pra colocar no ar o monitor de
> WhatsApp dos grupos de clientes em **modo leitura** (nunca envia no WhatsApp),
> com alerta crítico no bot **@FlowCSAlertaBot**.
>
> **STATUS: aguardando OK do Renan pra contratar a VPS.** Código e Telegram prontos.

---

## O que é isso (resumo em 30s)

Um número dedicado de WhatsApp entra nos grupos dos clientes. Uma VPS roda o
**Evolution API** que ESCUTA esses grupos. Quando alguém escreve algo com cara de
risco (cancelamento, reclamação grave, cobrança agressiva), o **Claude Haiku**
confirma se é crítico e o alerta chega no seu **Telegram** em segundos.

```
Grupos WhatsApp → Evolution API (VPS, só escuta) → filtro + Claude → Telegram @FlowCSAlertaBot
```

Baseado no pacote do Gabriel (`SETUP-EVOLUTION-SELFHOSTED.md`), adaptado pra:
- **só leitura** (o script original enviava alerta no WhatsApp; o nosso manda no Telegram)
- **chip dedicado** (em vez do WhatsApp do Gabriel)

---

## Arquivos desta pasta

| Arquivo | O que é |
|---|---|
| **GUIA-CONSOLIDADO-LEITURA-TELEGRAM.md** | ⭐ O passo a passo. Do zero ao funcionando. Comece por aqui |
| **alerta-critico-leitura.js** | O script Node (só leitura, alerta no Telegram). Validado |
| **.env.alerta-leitura** | Config — Telegram JÁ preenchido/testado. Falta só a chave Anthropic |
| **REFERENCIA-setup-original-gabriel.md** | O setup original do Gabriel (referência, caso precise) |

---

## Chaves já prontas (Telegram testado ✅)

| Chave | Valor | Status |
|---|---|---|
| Bot | @FlowCSAlertaBot | criado ✅ |
| TELEGRAM_TOKEN | `<TELEGRAM_TOKEN — ver .env local>` | testado ✅ |
| TELEGRAM_CHAT_ID | `<TELEGRAM_CHAT_ID — ver .env local>` (Renan) | testado ✅ |
| ANTHROPIC_API_KEY | — | ❌ falta pegar |

---

## Comparação de VPS (julho/2026)

O setup precisa de Docker + Evolution + Postgres + Redis. Mínimo 2GB RAM; 4GB confortável.

| Provedor | Plano | Specs | Preço/mês | BR? | Nota |
|---|---|---|---|---|---|
| **Hostinger** ⭐ | KVM 2 | 2 vCPU · 8GB · 100GB | R$ 39-54 (24m) | ✅ SP | Recomendado. Painel PT, suporte BR, guia já feito pra ele |
| **Hostinger** | KVM 1 | 1 vCPU · 4GB · 50GB | R$ 28 (24m) | ✅ SP | Suficiente pro MVP. Mais barato |
| **Contabo** | VPS 10 | 4 vCPU · 8GB · 240GB | ~€4,50 (~R$28) | ⚠️ oscila | Mais barato, NÃO sobe na renovação. Suporte lento |
| **Hetzner** | CX32 | 4 vCPU · 8GB · 80GB | ~€6,80 (~R$55) | ❌ EU | Descartar: latência ruim pro BR |
| **DigitalOcean** | Basic | 2 vCPU · 4GB | ~US$24 (~R$145) | ✅ SP | Caro, cobra em dólar |
| **KingHost / Audaks** | nacional | varia | a partir R$ 35-40 | ✅ BR | Nacionais, boleto, suporte PT |

**Recomendação:** Hostinger KVM 1 (4GB, ~R$28) pro MVP, ou KVM 2 (8GB) se for
evoluir pro Squad completo depois. Datacenter SP = webhook rápido; suporte PT
ajuda porque o Renan opera a VPS.

⚠️ Hostinger só tem preço promo no plano de 24 meses (mensal ~R$100). Se quer
flexibilidade de cancelar, Contabo mensal sai melhor e não tem aumento na renovação.

---

## Checklist do que falta (aguardando OK)

- [ ] **Renan dá OK** pra contratar a VPS
- [ ] Contratar VPS (Hostinger KVM 1 ou 2) → me passar o IP
- [ ] Conta Anthropic + $5 crédito → colar `ANTHROPIC_API_KEY` no `.env.alerta-leitura`
- [ ] Chip dedicado + adicionar o número NOS grupos dos clientes
- [ ] Rodar o guia na VPS (comando a comando, ~4-6h) — Claude guiando
- [ ] Teste ponta a ponta (alerta chega no @FlowCSAlertaBot)

## Add-ons possíveis (depois)
- Transcrição de **áudio** (Groq Whisper) — MVP só lê texto por enquanto
- Digest diário consolidado (além do alerta em tempo real)
- Evoluir pro **Squad CS completo** (4 agentes + Supabase) — só specs hoje

---

## Fonte original
Pacote do Gabriel: `~/Downloads/gabriel-agentes-extraido/_gabriel-agentes-briefings/`
(extraído de `_gabriel-agentes-briefings.rar`). O pacote completo tem specs dos 4
agentes, transcrições de reuniões e gravações — não copiadas aqui (só o essencial
do MVP de leitura). Memória: `project_flow_squad_cs`.
