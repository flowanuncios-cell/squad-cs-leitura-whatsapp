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
- **Aprendizado 30 dias** conta a partir da **1ª campanha no ar** (D10), não do
  kickoff. Ou seja: D10 → D40.
- Os dias são **corridos**, não úteis. Se D10 cair em fim de semana, o prazo é a
  **sexta anterior** — nunca a segunda seguinte.
- O SLA é do **responsável da etapa**, mesmo quando a dependência é do cliente.
  Dependência do cliente não zera o SLA: ela vira **escalada** (ver item 5).

---

## 4. Tabela consolidada de SLAs

> **Marco** = compromisso de data com o cliente. **Meta interna** = prazo que a squad
> se dá para chegar ao marco sem correria. O cliente só ouve falar de D1, D4, D10 e
> 30 dias.

| # | Etapa | Resp. | Prazo | Tipo |
|---|---|---|---|---|
| 1.1 | Kickoff — passagem comercial → operação | CS | D0 + 4h úteis | meta interna |
| 1.2 | Responsável e squad definidos | LS | D0 | meta interna |
| 1.3 | Entrada no grupo | CS | D0 | meta interna |
| 1.4 | Acesso — pedido da lista única | CS | D1 | meta interna |
| 1.5 | Contato e agenda (briefing + integração) | CS | D1 | meta interna |
| 1.6 | Planilha e Trello | CS | D1 | **marco D1** |
| 1.7 | Pasta e base do cliente | CS | D1 | meta interna |
| 2.1 | Reunião de briefing | GT | D3 | meta interna |
| 2.2 | Objetivo e meta numérica | GT | D4 | meta interna |
| 2.3 | Oferta e PUV | GT | D4 | meta interna |
| 2.4 | Público | GT | D4 | meta interna |
| 2.5 | Concorrência | CR | D4 | meta interna |
| 2.6 | Canais e destino do lead | GT | D4 | meta interna |
| 2.7 | Levantamento de criativos | CR | D4 | meta interna |
| 2.8 | Manual de Marca | CR | D4 | **marco D4** |
| 3.1 | Reunião de Integração | CS + TEC | D6 | meta interna |
| 3.2 | Meta — BM, página, IG, conta de anúncios | TEC | D8 | meta interna |
| 3.3 | Google Meu Negócio e Google Ads | TEC | D8 | meta interna |
| 3.4 | Site e traqueamentos | TEC | D8 | meta interna |
| 3.5 | Tracking validado em teste real | TEC | D9 | meta interna |
| 3.6 | Saldo | ADM | D8 | meta interna |
| — | **Acessos e Integração concluídos** | TEC | D10 | **marco D10** |
| 4.1 | Funil e estratégia de mídia | GT | D8 | meta interna |
| 4.2 | Estrutura e orçamento | GT | D9 | meta interna |
| 4.3 | Públicos | GT | D9 | meta interna |
| 4.4 | Criativo | CR | D9 | meta interna |
| 4.5 | Copy | CR | D9 | meta interna |
| 4.6 | Revisão pré-publicação — 4 olhos | LS | D10 | meta interna |
| 4.7 | 1ª Campanha publicada | GT | D10 | **marco D10** |
| 4.8 | Doc 1ª Campanha | GT | D10 + 1 | meta interna |
| 5.1 | Stract, Make e relatórios semanais | TEC → GT | D14, depois semanal | meta interna |
| 5.2 | Servidor × Chat UTI | TEC | contínuo | meta interna |
| 5.3 | Saldos e otimizações | GT | diário / 2× semana | meta interna |
| 5.4 | Ordem de serviço | GT | conforme demanda | meta interna |
| 5.5 | Acompanhamento dos grupos de WhatsApp | CS | diário | meta interna |
| 5.6 | Qualidade dos leads | CS | semanal | meta interna |
| 5.7 | Reunião de alinhamento | CS + GT | quinzenal | meta interna |
| — | **Aprendizado concluído** | GT | D10 + 30 | **marco 30 dias** |
| 6.1 | Relatórios mensais | GT | mensal | rotina |
| 6.2 | Reunião de performance | GT + LS | mensal | rotina |
| 6.3 | Atualização de bases | CS | mensal | rotina |
| 6.4 | Reunião interna | LS | semanal | rotina |
| 6.5 | Relatório trimestral e novo ciclo | LS + GT | trimestral | rotina |

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
