# FLOWFORMANCE 2.0 — Sistema Operacional do Cliente

> Camada operacional e treinável construída **sobre** o fluxo oficial da Flowformance.
> O fluxo oficial continua sendo a **arquitetura**. Isto aqui é o **sistema que o
> gestor usa todo dia**.

---

## Versão visual — fluxograma que avança etapa a etapa

**https://claude.ai/artifact/8xE8xNz6U7jBhyr5JN5STD**

Abre no modo **Etapa a etapa**: uma etapa por tela, com *o que fazer agora* de um
lado e *o que destrava a próxima* do outro. Tem também a **Visão completa** para
consulta, e filtro "meu papel" — o júnior vê só o que é dele.

> Página privada. Só abre para quem receber acesso pelo menu **Share**.

**Arquivo HTML standalone:** [`fluxograma-jornada.html`](fluxograma-jornada.html) —
mesma página, num arquivo único, sem dependência de servidor. Abre com duplo clique
no navegador, pode ser hospedado em qualquer lugar ou enviado ao time por e-mail.
Só precisa de internet para as fontes (sem internet, cai para a fonte do sistema e
continua funcionando).

---

## Por que isso existe

Com a entrada acelerada de clientes e um time mais jovem, o processo não pode
depender de "saber como a gente faz". Cada etapa tem os mesmos quatro elementos:

| Elemento | Pergunta que responde |
|---|---|
| **Responsável** | Quem faz? (nunca "o time") |
| **SLA** | Até quando? |
| **Checklist** | O que exatamente precisa ser feito? |
| **Evidência** | Como eu provo que está concluído? (link, print, doc) |

Sem os quatro, a etapa não existe no sistema.

---

## Os marcos oficiais

```
KICKOFF ──── D1 ──────── D4 ─────────── D10 ──────────── +30 dias ────────►
             │            │              │                  │
          Pós Kickoff  Manual de      Acessos e          Aprendizado
                       Marca          Integração         concluído
                       ENTRA FLOW     + 1ª Campanha      FIM DO ONBOARDING
```

| Fase | Marco | Gate |
|---|---|---|
| 1 · Entrada | **Pós Kickoff D1** | Gate 1 |
| 2 · Preparação | **Manual de Marca D4** · Entra Flowformance | Gate 2 |
| 3 · Integração | **Acessos e Integração D10** | Gate 3 |
| 4 · Ativação | **1ª Campanha D10** | Gates 4 e 5 |
| 5 · Aprendizado | **30 dias** (D10 + 30) | Gate 6 |
| 6 · Operação contínua | ciclo trimestral | — |

**Regra binária número 1:** campanha publicada **não** significa onboarding
concluído. O D10 fecha a *ativação*. O onboarding só termina quando **campanha +
tracking + documentação + rotina operacional** estiverem funcionando (Gate 6).

---

## Mapa dos documentos

| Arquivo | O que é | Quem usa |
|---|---|---|
| [`01-jornada-operacional.md`](01-jornada-operacional.md) | ⭐ As 6 fases, etapa por etapa, com os 4 elementos | Todos |
| [`02-gates.md`](02-gates.md) | Os 6 Gates e seus critérios de passagem | Líder de Squad |
| [`03-checklists-d1-d4-d10.md`](03-checklists-d1-d4-d10.md) | Checklists imprimíveis dos marcos | Gestor / CS |
| [`04-checklist-integracao.md`](04-checklist-integracao.md) | Checklist técnico de 3 estados + Reunião de Integração | Tech / CS |
| [`05-trello-padrao.md`](05-trello-padrao.md) | Board padrão, listas, labels, template de card | CS / Líder |
| [`06-manual-treinamento.md`](06-manual-treinamento.md) | Os 8 verbos + como otimizar o sistema de aquisição | Gestor novo |
| [`07-fluxograma.md`](07-fluxograma.md) | Fluxograma progressivo (Mermaid), etapa a etapa | Todos |
| [`08-mapa-do-fluxo-oficial.md`](08-mapa-do-fluxo-oficial.md) | Cada item do fluxo oficial e onde ele vive aqui | Líder de Squad |
| [`00-papeis-sla-e-glossario.md`](00-papeis-sla-e-glossario.md) | Papéis, RACI, tabela de SLAs, glossário | Todos |
| [`templates/`](templates/) | Briefing, Doc 1ª Campanha, OS, Relatório semanal | Todos |

---

## Como usar no dia a dia

1. **Entrou cliente?** Abre o card do template no Trello ([`05`](05-trello-padrao.md)) —
   já vem com os checklists de D1/D4/D10/30 dias.
2. **"O que eu faço agora?"** → não pergunta. Abre o fluxograma no modo *etapa a
   etapa* e olha em qual etapa o cliente está.
3. **Vai avançar?** Só passa se o Gate estiver cumprido **com evidência**, e quem
   move o card é quem aprova — não quem executou.
4. **Travou?** Item em 🟡 por mais de 48h vira escalada para o líder. Não fica
   parado esperando o cliente lembrar.

---

## Os três pontos de maior alavancagem

1. **Acesso é o passo 2, não o passo 10.** O pedido sai no D1, porque é o item que
   mais atrasa o D10.
2. **A Reunião de Integração resolve em uma hora o que o WhatsApp não resolve em
   seis dias.** Cliente com a tela compartilhada, acessos concedidos durante a call.
3. **Otimizar o sistema de aquisição, não o Gerenciador.**
   `Anúncio → Clique → Página/WhatsApp → Lead → Qualidade → Venda`

---

## Status

Versão 2.0 — alinhada ao fluxo oficial da Flowformance (ordem, marcos e
vocabulário). Os **nomes dos papéis** e as **metas internas** (D3, D6, D8, D9) são
proposta de partida: ajuste em [`00`](00-papeis-sla-e-glossario.md) antes de
publicar para o time. Os marcos (D1, D4, D10, 30 dias) vêm do fluxo oficial e não
devem ser alterados sem decisão da liderança.
