# FLOWFORMANCE 2.0 — Sistema Operacional do Cliente

> Camada operacional e treinável construída **sobre** o fluxograma oficial.
> O fluxograma atual continua sendo a **arquitetura**. Isto aqui é o **sistema
> que o gestor usa todo dia**.

---

## Por que isso existe

Com a entrada acelerada de clientes e um time mais jovem, o processo não pode
depender de "saber como a gente faz". Cada etapa aqui tem os mesmos quatro
elementos, sempre:

| Elemento | Pergunta que responde |
|---|---|
| **Responsável** | Quem faz? (nunca "o time") |
| **SLA** | Até quando? (contado a partir do D0) |
| **Checklist** | O que exatamente precisa ser feito? |
| **Evidência** | Como eu provo que está concluído? (link, print, doc) |

Sem os quatro, a etapa não existe no sistema.

---

## As 6 fases e os 3 marcos

```
D0 ──── D1 ──────── D4 ─────────── D10 ──────────── D40 ────────►
 │       │           │              │                │
 ENTRADA │ PREPARAÇÃO│  INTEGRAÇÃO  │   ATIVAÇÃO     │ APRENDIZADO │ OPERAÇÃO
         ▼           ▼              ▼                ▼            CONTÍNUA
      MARCO D1    MARCO D4      MARCO D10        (fim do
      cliente     estratégia    1ª campanha      onboarding
      recebido    disponível    publicada        de verdade)
```

**Regra binária número 1:** campanha publicada **não** significa onboarding
concluído. O onboarding só termina quando **campanha + tracking + documentação +
rotina operacional** estiverem funcionando (Gate 6).

---

## Mapa dos documentos

| Arquivo | O que é | Quem usa |
|---|---|---|
| [`00-papeis-sla-e-glossario.md`](00-papeis-sla-e-glossario.md) | Papéis, matriz RACI, tabela de SLAs, glossário | Todos |
| [`01-jornada-operacional.md`](01-jornada-operacional.md) | ⭐ As 6 fases, etapa por etapa, com os 4 elementos | Todos |
| [`02-gates.md`](02-gates.md) | Os 6 Gates e seus critérios de passagem | Líder de Squad |
| [`03-checklists-d1-d4-d10.md`](03-checklists-d1-d4-d10.md) | Checklists imprimíveis dos 3 marcos | Gestor / CS |
| [`04-checklist-integracao.md`](04-checklist-integracao.md) | Checklist técnico de 3 estados | Tech / Gestor |
| [`05-trello-padrao.md`](05-trello-padrao.md) | Board padrão, listas, labels, template de card | CS / Líder |
| [`06-manual-treinamento.md`](06-manual-treinamento.md) | Os 8 verbos + como otimizar o sistema de aquisição | Gestor novo |
| [`07-fluxograma.md`](07-fluxograma.md) | Fluxograma visual (Mermaid) em 3 camadas | Todos |
| [`templates/`](templates/) | Briefing, Doc da 1ª Campanha, OS, Relatório semanal | Todos |

---

## Como usar no dia a dia

1. **Entrou cliente?** Abre o card do template no Trello ([`05`](05-trello-padrao.md)) —
   ele já vem com os checklists de D1/D4/D10.
2. **"O que eu faço agora?"** → não pergunta. Olha em qual **fase** o cliente está
   ([`01`](01-jornada-operacional.md)) e qual **Gate** está aberto ([`02`](02-gates.md)).
3. **Vai avançar de fase?** Só passa se o Gate estiver cumprido **com evidência**.
4. **Travou?** Item em 🟡 Pendente/Bloqueado por mais de 48h vira escalada para o
   Líder de Squad — não fica parado esperando o cliente lembrar.

---

## Regra de ouro do treinamento

> **Não otimizar apenas o Gerenciador. Otimizar o sistema de aquisição.**
>
> `Anúncio → Clique → Página/WhatsApp → Lead → Qualidade → Venda`

Ver [`06-manual-treinamento.md`](06-manual-treinamento.md).

---

## Status deste documento

Versão 1.0 — proposta inicial da camada operacional. Os **nomes dos papéis e os
SLAs** são uma proposta de partida: ajuste em [`00`](00-papeis-sla-e-glossario.md)
para a realidade da squad antes de publicar para o time.
