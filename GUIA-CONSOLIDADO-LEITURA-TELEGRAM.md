# Guia Consolidado — WhatsApp em MODO LEITURA → Alerta no Telegram

> Versão enxuta e adaptada do `SETUP-EVOLUTION-SELFHOSTED.md`, para o caso do Renan:
> **só leitura** (Evolution nunca envia no WhatsApp) + **chip dedicado** + alerta no
> bot **@FlowCSAlertaBot**. Você executa; o Claude te guia comando a comando.
>
> Stack: VPS Hostinger + Evolution API (Docker) + `alerta-critico-leitura.js` (Node).
> Tempo: ~4-6h no dia 1. Custo: ~R$ 60/mês (VPS ~R$40 + Claude API ~R$20).

---

## Visão de 1 página

```
Grupos WhatsApp (chip dedicado está neles)
        │  mensagem
        ▼
  Evolution API (VPS, Docker)  ──webhook messages.upsert──> alerta-critico-leitura.js
        │ (só ESCUTA, nunca envia)                                  │
        │                                          filtro palavra-chave → Claude Haiku
        │                                                           │ (é crítico?)
        │                                                           ▼
        └──────────────────────────────────────────────>  Telegram @FlowCSAlertaBot
                                                              (alerta chega pra você)
```

**Leitura pura:** o script não tem nenhuma chamada de envio ao WhatsApp. O alerta sai só pelo Telegram.

---

## PASSO 0 — Criar o bot e pegar as 2 chaves do Telegram (10 min, faça já)

Isso você faz no próprio Telegram, antes da VPS.

### 0.1 Criar o bot (se ainda não existe)
1. No Telegram, abra conversa com **@BotFather**
2. `/newbot` → nome: `Flow CS Alerta` → username: `FlowCSAlertaBot` (ou o que estiver livre)
3. Ele te devolve um **token** tipo `8123456789:AAH...` → **guarde**. Esse é o `TELEGRAM_TOKEN`.

### 0.2 Pegar seu chat_id
1. Mande qualquer mensagem (ex: "oi") pro bot que você acabou de criar
2. No navegador, abra (troque `<TOKEN>`):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Procure `"chat":{"id":123456789` → esse número é o `TELEGRAM_CHAT_ID`.

➡️ **Me cole aqui os dois valores** (token + chat_id) que eu já testo o envio e deixo o `.env` pronto.

---

## PASSO 1 — Contratar VPS Hostinger (30 min)

- https://www.hostinger.com.br/vps-hosting → plano **KVM 2** (8 GB RAM, 2 vCPU)
- Recomendo o plano **12 meses (~R$54/mês)**. Login: `flowanuncios@gmail.com`
- Configuração: **Localização São Paulo (BR)** · **Ubuntu 24.04 LTS sem painel** · hostname `squad-cs-flow` · **senha root forte (guarde no gerenciador)**
- Anote: **IP público**, usuário `root`, senha. ➡️ Me passa o IP quando tiver.

---

## PASSO 2 — Conectar por SSH (15 min)

No seu terminal (Mac: app Terminal):
```bash
ssh root@SEU_IP
# digite yes na 1ª vez, depois a senha root
apt update && apt upgrade -y   # ~5 min
```

---

## PASSO 3 — Instalar Docker (10 min)
```bash
curl -fsSL https://get.docker.com | sh
docker --version && docker compose version
systemctl enable docker && systemctl start docker
```

---

## PASSO 4 — Subir Evolution API (30 min)
```bash
mkdir -p /opt/squad-cs && cd /opt/squad-cs
```

Gere a chave da API e **guarde**:
```bash
openssl rand -hex 32
```

Crie o `docker-compose.yml` (cole inteiro; depois troque `SUA_CHAVE_AQUI` e `SEU_IP`):
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
      - AUTHENTICATION_API_KEY=SUA_CHAVE_AQUI
      - AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true
      - SERVER_URL=http://SEU_IP:8080
      - SERVER_PORT=8080
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://evo:evopass@postgres:5432/evolution
      - DATABASE_CONNECTION_CLIENT_NAME=evolution
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379/0
      - CACHE_REDIS_PREFIX_KEY=evolution
      - WEBHOOK_GLOBAL_ENABLED=false
      - LOG_LEVEL=ERROR,WARN,INFO
      - S3_ENABLED=false
      - DEL_INSTANCE=false
      - QRCODE_LIMIT=30
      - LANGUAGE=pt-BR
    volumes:
      - evolution_instances:/evolution/instances
    depends_on: [postgres, redis]
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

Edite os 2 valores e suba:
```bash
nano docker-compose.yml   # troque SUA_CHAVE_AQUI e SEU_IP (Ctrl+O, Enter, Ctrl+X)
docker compose up -d       # 2-5 min
docker compose ps          # 3 containers "Up"
curl http://localhost:8080 # tem que vir JSON "Welcome to the Evolution API"
```

---

## PASSO 5 — Abrir o painel (10 min)
```bash
ufw allow 8080/tcp && ufw allow 22/tcp && ufw --force enable
```
No navegador: `http://SEU_IP:8080/manager` → cole a API Key (a que você gerou no passo 4).

---

## PASSO 6 — Conectar o CHIP DEDICADO (15 min)

1. Painel → **+ Instance** → nome `gabriel` (pode manter esse nome) → Save
2. Clica na instância → aparece **QR Code**
3. **No celular do chip dedicado:** WhatsApp → Aparelhos conectados → Conectar um aparelho → escaneia o QR
4. Status vira **`open`** (verde) ✅

⚠️ **O chip dedicado precisa estar NOS grupos dos clientes** que você quer monitorar — o Evolution só enxerga o que esse número enxerga. Adicione o número aos grupos antes de esperar alertas.

---

## PASSO 7 — Conta Anthropic / Claude (15 min)
- https://console.anthropic.com → sign up `flowanuncios@gmail.com`
- Plans & Billing → Add credit → **$5**
- API Keys → Create Key `squad-cs-alerta` → **copie** (`sk-ant-api03-...`, só aparece 1x)

---

## PASSO 8 — Subir o script SÓ-LEITURA (45 min)

Instale Node e crie a pasta:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs && node --version   # v20.x
mkdir -p /opt/squad-cs/alerta-leitura && cd /opt/squad-cs/alerta-leitura
```

Suba o arquivo `alerta-critico-leitura.js` (está na pasta do pacote, no seu Mac).
Do seu Mac, num terminal local:
```bash
scp ~/Downloads/gabriel-agentes-extraido/_gabriel-agentes-briefings/alerta-critico-leitura.js root@SEU_IP:/opt/squad-cs/alerta-leitura/
```

De volta na VPS, crie o `.env`:
```bash
cat > /opt/squad-cs/alerta-leitura/.env << 'EOF'
ANTHROPIC_API_KEY=COLE_A_KEY_sk-ant-...
TELEGRAM_TOKEN=COLE_O_TOKEN_DO_FlowCSAlertaBot
TELEGRAM_CHAT_ID=COLE_SEU_CHAT_ID
EOF
nano /opt/squad-cs/alerta-leitura/.env   # preencha os 3 valores
```

Rode como serviço permanente (systemd):
```bash
cat > /etc/systemd/system/squad-cs-leitura.service << 'EOF'
[Unit]
Description=Squad CS - Alerta Critico (so leitura, Telegram)
After=docker.service
Requires=docker.service
[Service]
Type=simple
WorkingDirectory=/opt/squad-cs/alerta-leitura
EnvironmentFile=/opt/squad-cs/alerta-leitura/.env
ExecStart=/usr/bin/node /opt/squad-cs/alerta-leitura/alerta-critico-leitura.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/squad-cs-leitura.log
StandardError=append:/var/log/squad-cs-leitura.log
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable squad-cs-leitura
systemctl start squad-cs-leitura
systemctl status squad-cs-leitura   # active (running) verde
```

Configure o webhook: painel Evolution → instância `gabriel` → aba **Webhook**:
- **URL:** `http://localhost:3000`
- **Events:** só `messages.upsert`
- **Webhook by Events:** habilitado → Salva

---

## PASSO 9 — Teste ponta a ponta (15 min)
```bash
tail -f /var/log/squad-cs-leitura.log   # deixe aberto
```
Peça pra alguém mandar num grupo de teste (onde o chip dedicado está):
> "vocês cobram mas não entregam, assim não dá"

No log deve aparecer: `Msg de... → Possivel risco → Claude {is_critico:true...} → Alerta enviado no Telegram.`
E o alerta chega no **@FlowCSAlertaBot**. ✅

---

## Comandos do dia a dia
```bash
ssh root@SEU_IP
docker compose -f /opt/squad-cs/docker-compose.yml ps   # Evolution ok?
systemctl status squad-cs-leitura                        # script ok?
tail -100 /var/log/squad-cs-leitura.log                  # últimos alertas
# QR caiu? painel :8080/manager → instância gabriel → escaneia de novo
```

## Ajustar sensibilidade
Edite `PALAVRAS_RISCO` no `alerta-critico-leitura.js` (tira/põe palavras) →
`systemctl restart squad-cs-leitura`.

## Limitação do MVP
Este script só analisa **texto**. Áudio ainda não é transcrito aqui (isso é do
Squad completo). Se quiser áudio já nesta fase, me avisa que eu adiciono a
transcrição via Groq Whisper (como no flow-wpp-reader).

---
*Guia consolidado gerado 13/07/2026 a partir do pacote do Gabriel + adaptação só-leitura/Telegram.*
