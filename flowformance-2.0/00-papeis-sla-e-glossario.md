# 00 — Papéis, SLAs e Glossário

> ⚠️ **Ajustar antes de publicar para o time.** Os papéis abaixo são uma proposta
> de partida. Se na squad uma pessoa acumula dois papéis, mantenha os dois papéis
> no documento e coloque o mesmo nome nos dois — o que não pode é a etapa ficar
> sem dono.

---

## 1. Papéis

| Sigla | Papel | Responde por |
|---|---|---|
| **LS** | Líder de Squad | Valida os Gates, desbloqueia impedimentos, aloca pessoas |
| **CS** | Customer Success / Atendimento | Relação com o cliente, grupo, agenda, cobrança de acessos e material |
| **GT** | Gestor de Tráfego (Performance) | Estratégia de mídia, campanha, otimização, indicadores |
| **CR** | Criação (Design + Copy) | Manual de marca, criativos, copy |
| **TEC** | Tech / Tracking | Pixels, tags, GTM, GA4, eventos, Make, Stract, integrações |
| **ADM** | Financeiro / Administrativo | Contrato, saldo, meio de pagamento, notas |

**Regra:** toda etapa tem **um** responsável (quem executa e responde pelo prazo).
Apoios entram como "apoio", nunca como co-responsáveis.

---

## 2. Matriz RACI por fase

> R = Responsável · A = Aprova · C = Consultado · I = Informado

| Fase | LS | CS | GT | CR | TEC | ADM |
|---|---|---|---|---|---|---|
| 1. Entrada (D0–D1) | A | **R** | I | I | I | C |
| 2. Preparação (D1–D4) | A | C | **R** | **R** | I | — |
| 3. Integração Técnica (D4–D10) | A | C | C | I | **R** | C |
| 4. Ativação (até D10) | A | I | **R** | C | C | C |
| 5. Aprendizado (D10–D40) | A | C | **R** | C | C | C |
| 6. Operação Contínua (D40+) | A | **R** | **R** | C | C | C |

---

## 3. Contagem de prazos

- **D0** = dia do kickoff (assinatura / passagem do comercial para a operação).
- Os dias são **corridos**, não úteis. Se D10 cair em fim de semana, o prazo é a
  **sexta anterior** — nunca a segunda seguinte.
- O SLA é do **responsável da etapa**, mesmo quando a dependência é do cliente.
  Dependência do cliente não zera o SLA: ela vira **escalada** (ver item 5).

---

## 4. Tabela consolidada de SLAs

| # | Etapa | Resp. | SLA |
|---|---|---|---|
| 1.1 | Kickoff / passagem comercial → operação | CS | D0 + 4h úteis |
| 1.2 | Grupo de WhatsApp criado | CS | D0 |
| 1.3 | Responsável / squad definidos | LS | D0 |
| 1.4 | Contato inicial e boas-vindas | CS | D0 |
| 1.5 | Briefing agendado | CS | D1 (reunião até D3) |
| 1.6 | Planilha do cliente criada/validada | CS | D1 |
| 1.7 | Card Trello a partir do template | CS | D1 |
| 1.8 | Pasta/base do cliente organizada | CS | D1 |
| 2.1 | Reunião de briefing realizada | GT | D3 |
| 2.2 | Objetivo e meta numérica | GT | D4 |
| 2.3 | Oferta / PUV | GT | D4 |
| 2.4 | Público / ICP | GT | D4 |
| 2.5 | Análise de concorrência | CR | D4 |
| 2.6 | Canais e funil definidos | GT | D4 |
| 2.7 | Levantamento de criativos existentes | CR | D4 |
| 2.8 | Manual de Marca | CR | D4 |
| 3.1 | Solicitação formal de acessos | CS | D4 |
| 3.2 | Acessos Meta (BM, página, IG, conta de anúncio) | TEC | D6 |
| 3.3 | Google Ads / GMN | TEC | D6 |
| 3.4 | Site / LP disponível | TEC | D6 |
| 3.5 | Pixel, tags, GTM/GA4 | TEC | D8 |
| 3.6 | Eventos e tracking validados (teste real) | TEC | D8 |
| 3.7 | Saldo / meio de pagamento ativo | ADM | D8 |
| 4.1 | Estratégia de mídia documentada | GT | D8 |
| 4.2 | Estrutura de campanha e funil | GT | D8 |
| 4.3 | Orçamento e distribuição | GT | D8 |
| 4.4 | Públicos montados | GT | D9 |
| 4.5 | Criativos entregues | CR | D9 |
| 4.6 | Copy aprovada | CR | D9 |
| 4.7 | Revisão pré-publicação (4 olhos) | LS | D10 |
| 4.8 | Campanha publicada | GT | **D10** |
| 4.9 | Doc da 1ª Campanha | GT | D10 + 1 |
| 5.x | Rotina de aprendizado | GT | D10 → D40 |
| 6.x | Operação contínua | GT + CS | D40+ |

---

## 5. Escalada (o que fazer quando trava)

| Tempo parado | O que acontece |
|---|---|
| **0–24h** | Responsável cobra no grupo do cliente / internamente |
| **24–48h** | Item vai para 🟡 **Pendente/Bloqueado** no checklist, com o nome de quem está travando |
| **48h+** | **Escalada para o LS.** LS fala com o cliente formalmente (e-mail/áudio), e o impacto no D10 é comunicado por escrito |
| **Risco de furar D10** | Registrar no card + avisar o cliente **antes** de estourar, nunca depois |

**Nunca aceite como resposta:** "estou esperando o cliente". Esperar é um estado
registrado, com data e dono, não uma desculpa.

---

## 6. Glossário

| Termo | Significado |
|---|---|
| **D0** | Dia do kickoff |
| **Gate** | Porta de passagem entre fases. Só abre com evidência |
| **Evidência** | Link, print ou documento que prova a conclusão. "Fiz" não é evidência |
| **PUV** | Proposta Única de Valor |
| **ICP** | Perfil de cliente ideal |
| **OS** | Ordem de Serviço (pedido formal de criativo/página/ajuste) |
| **Doc da 1ª Campanha** | Documento que registra o que foi publicado e por quê |
| **Sistema de aquisição** | A sequência Anúncio → Clique → Página/WhatsApp → Lead → Qualidade → Venda |
| **Stract** | Ferramenta de consolidação de dados/relatórios |
| **Make** | Ferramenta de automação entre sistemas |
