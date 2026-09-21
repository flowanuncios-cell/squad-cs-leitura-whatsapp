# 05 — Trello Padrão

> O board tem que falar a **mesma língua** do fluxograma e do manual. Se o Trello
> usa nomes diferentes das fases, o time volta a depender de memória.

---

## 1. Estrutura do board `Flowformance — Jornada do Cliente`

Uma lista por fase. O cliente é **um card** que atravessa o board da esquerda
para a direita.

| # | Lista | Corresponde a | Sai da lista quando |
|---|---|---|---|
| 1 | `0 · Entrada — Pós Kickoff D1` | Fase 1 | Gate 1 aprovado |
| 2 | `1 · Preparação — Manual de Marca D4` | Fase 2 | Gate 2 aprovado |
| 3 | `2 · Acessos e Integração — D10` | Fase 3 | Gate 3 aprovado |
| 4 | `3 · 1ª Campanha — D10` | Fase 4 | Gate 5 aprovado |
| 5 | `4 · Aprendizado — 30 dias` | Fase 5 | Gate 6 aprovado |
| 6 | `5 · Operação Contínua — D40+` | Fase 6 | Fim do contrato |
| 7 | `⛔ Bloqueado` | Qualquer fase | Impedimento resolvido |
| 8 | `📕 Encerrados` | — | — |

**Lista `⛔ Bloqueado`:** o card **não** fica parado na fase fingindo que anda. Se
está travado há mais de 48h, vai para Bloqueado com o motivo no topo da descrição.
É esta lista que abre a reunião interna semanal.

---

## 2. Labels

| Label | Uso |
|---|---|
| 🟢 `No prazo` | Dentro do SLA da fase |
| 🟡 `Atenção` | Algo pendente, o marco ainda é alcançável |
| 🔴 `Risco de marco` | Vai furar D1, D4 ou D10 — cliente precisa ser avisado |
| 🔵 `Aguardando cliente` | Dependência externa, com dono e data na descrição |
| 🟣 `Gate solicitado` | Gestor pediu a passagem, LS ainda não validou |
| ⚫ `Onboarding concluído` | Gate 6 aprovado |

Uma label de status (verde/amarelo/vermelho) por card. As outras se acumulam.

---

## 3. Template de card

**Nome do card:** `[Cliente] — D0 dd/mm`

### Descrição (copiar e preencher)

```markdown
## Dados
- D0 (kickoff): dd/mm
- D4: dd/mm  |  D10: dd/mm  |  30 dias (D10+30): dd/mm
- Verba mensal:
- Objetivo e meta numérica:
- Métrica principal:

## Responsáveis
- Gestor de Tráfego:
- CS:
- Criação:
- Tech:

## Links
- Planilha do cliente:
- Pasta (Drive):
- Briefing:
- Manual de Marca:
- Doc da 1ª Campanha:
- Relatórios:

## Contatos do cliente
- Decisor:
- Quem atende o lead: ______  |  Tempo de resposta acordado: ______

## Status atual
- Gate atual:
- Bloqueio (se houver) / dono / desde quando:
```

### Checklists do card

O card do template já vem com **quatro** checklists, copiados de
[`03-checklists-d1-d4-d10.md`](03-checklists-d1-d4-d10.md):

1. `D1 — Pós Kickoff`
2. `D4 — Manual de Marca · Entra Flowformance`
3. `D10 — Acessos e Integração + 1ª Campanha`
4. `30 dias — Aprendizado concluído`

Clientes com integração pesada ganham também o checklist
`Integração (A–D)` de [`04`](04-checklist-integracao.md).

### Datas

- **Data de entrega do card** = sempre o **próximo marco** (D1 → D4 → D10 →
  30 dias). Nunca uma data solta.

---

## 4. Como o card anda

```
Gestor executa a fase
        │
        ▼
Anexa as evidências no card (links, prints)
        │
        ▼
Marca o checklist da fase 100%
        │
        ▼
Aplica a label 🟣 Gate solicitado + menciona o LS
        │
        ▼
LS confere as evidências
        │
   ┌────┴────┐
 aprova   devolve com o que falta
   │          │
   ▼          ▼
card vai   card fica na fase,
p/ a lista label 🟡 ou 🔴
seguinte
```

**O gestor não move o próprio card entre listas de fase.** Quem move é quem
aprova o Gate. É isso que impede o "considerei pronto".

---

## 5. Comentários padronizados no card

Para que o histórico do card seja legível seis meses depois, use estes três
formatos:

**Otimização**
```
[OTIMIZAÇÃO] dd/mm
Hipótese: ...
Ação: ...
Avaliar em: dd/mm
Resultado (preencher na data): ...
```

**Bloqueio**
```
[BLOQUEIO] dd/mm
Item: ...
Quem está travando: ...
Ação tomada: ...
Escalado ao LS em: dd/mm
```

**Aprovação de Gate**
```
[GATE N] aprovado por ___ em dd/mm
Evidências conferidas: ...
```

---

## 6. Automação sugerida (Butler)

| Gatilho | Ação |
|---|---|
| Card entra em uma lista de fase | Definir data de entrega no próximo marco |
| Checklist da fase 100% | Adicionar label 🟣 `Gate solicitado` e avisar o LS |
| Card parado 48h na mesma lista | Comentar cobrando status |
| Data de entrega vencida | Aplicar label 🔴 `Risco de marco` |
| Card movido para `⛔ Bloqueado` | Exigir comentário com dono e data |
| Toda segunda 09:00 | Postar no card a pergunta "qual o Gate atual?" |

> Nenhuma dessas automações substitui a reunião interna semanal — elas só evitam
> que o board minta.
