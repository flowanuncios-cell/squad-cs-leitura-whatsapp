# 04 — Checklist de Integração Técnica

> Três estados, sempre. Nada de "mais ou menos pronto".

| Estado | Símbolo | Significa |
|---|---|---|
| Não iniciado | ⬜ | Ninguém começou |
| Pendente / Bloqueado | 🟡 | Começou e parou. **Exige dono e data** |
| Validado | ✅ | Testado de verdade, com evidência anexada |

**Regra:** 🟡 por mais de 48h → escalada para o LS (ver
[`00`](00-papeis-sla-e-glossario.md#5-escalada-o-que-fazer-quando-trava)).
**Regra:** ✅ só com evidência. "O cliente falou que liberou" é 🟡, não ✅.

---

## Bloco A — Meta *(obrigatório)*

| Estado | Item | Evidência esperada | Dono | Data |
|---|---|---|---|---|
| ⬜ | Acesso de parceiro na Business Manager | Print do acesso ativo | TEC | |
| ⬜ | Página do Facebook | Print | TEC | |
| ⬜ | Conta do Instagram vinculada | Print | TEC | |
| ⬜ | Conta de anúncios com nível de acesso correto | Print | TEC | |
| ⬜ | Meio de pagamento ativo na conta | Print | ADM | |
| ⬜ | Pixel Meta instalado e recebendo | Print do Event Manager | TEC | |
| ⬜ | Evento de conversão principal configurado | Print do evento | TEC | |

## Bloco B — Google *(obrigatório quando há Google Ads)*

| Estado | Item | Evidência esperada | Dono | Data |
|---|---|---|---|---|
| ⬜ | Google Ads vinculada ao MCC | Print da vinculação aceita | TEC | |
| ⬜ | Faturamento configurado | Print | ADM | |
| ⬜ | Perfil da Empresa (GMN) com acesso | Print | TEC | |
| ⬜ | Histórico da conta verificado | Anotação no card | TEC | |

## Bloco C — Site / Destino *(obrigatório)*

| Estado | Item | Evidência esperada | Dono | Data |
|---|---|---|---|---|
| ⬜ | Acesso ao site/CMS ou ao dev do cliente | Confirmação | TEC | |
| ⬜ | Página de destino definida | Link | GT | |
| ⬜ | Velocidade e versão mobile conferidas | Print do teste | TEC | |
| ⬜ | Formulário/WhatsApp testado com envio real | Print do recebimento | TEC | |
| ⬜ | UTMs / parâmetros de origem padronizados | Exemplo de URL | TEC | |

## Bloco D — Mensuração *(obrigatório)*

| Estado | Item | Evidência esperada | Dono | Data |
|---|---|---|---|---|
| ⬜ | Tag do Google instalada | Print | TEC | |
| ⬜ | GTM publicado *(quando aplicável)* | Print do container publicado | TEC | |
| ⬜ | GA4 recebendo dados | Print do tempo real | TEC | |
| ⬜ | Eventos-chave mapeados | Lista no card | TEC | |
| ⬜ | Sem disparo duplicado | Print da verificação | TEC | |
| ⬜ | Conversão importada na plataforma de anúncio | Print | TEC | |

## Bloco E — Operação e dados *(recomendado)*

| Estado | Item | Evidência esperada | Dono | Data |
|---|---|---|---|---|
| ⬜ | CRM / planilha de leads recebendo | Print | TEC | |
| ⬜ | Automação Make configurada | Print do cenário ativo | TEC | |
| ⬜ | Stract conectado | Print do painel | TEC | |
| ⬜ | Relatório automático rodando | Link do relatório | TEC | |
| ⬜ | Responsável pelo atendimento do lead definido | Registrado no card | CS | |

---

## Obrigatório vs. recomendado

- **Obrigatório** (Blocos A–D): sem todos em ✅, **o Gate 3 não abre e a campanha
  não sobe**.
- **Recomendado** (Bloco E): pode ficar 🟡 na publicação, mas com **dono e data**
  registrados, e precisa fechar até o Gate 6 (D40).

---

## Registro de bloqueios

| Item | 🟡 desde | Quem está travando | Ação tomada | Escalado? | Resolvido em |
|---|---|---|---|---|---|
| | | | | | |

> Este registro é o que transforma "o cliente é lento" em um fato com data, que dá
> para mostrar ao cliente quando o D10 estiver em risco.
