# 07 — Fluxograma Progressivo

> Diagramas em Mermaid — renderizam no GitHub, no Notion e em qualquer editor
> Markdown moderno. Servem de fonte para a versão desenhada (Canva/Figma).
>
> **Versão navegável, etapa a etapa:** https://claude.ai/artifact/8xE8xNz6U7jBhyr5JN5STD

---

## 1. Visão macro — o fluxo oficial com marcos e gates

```mermaid
flowchart LR
    K([KICKOFF]) --> F1

    subgraph F1["1 · ENTRADA"]
        direction TB
        A1[Entrada no grupo] --> A2[Acesso<br/>lista única] --> A3[Contato e agenda] --> A4[Planilha e Trello]
    end
    F1 --> M1{{"MARCO D1<br/>Pós Kickoff"}} --> F2

    subgraph F2["2 · PREPARAÇÃO"]
        direction TB
        B1[Briefing] --> B2[Objetivo e meta] --> B3[Oferta · público<br/>concorrência] --> B4[Manual de Marca]
    end
    F2 --> M2{{"MARCO D4<br/>Manual de Marca<br/>ENTRA FLOWFORMANCE"}} --> F3

    subgraph F3["3 · INTEGRAÇÃO"]
        direction TB
        C1[Reunião de Integração] --> C2[Meta · GMN · Google Ads]
        C2 --> C3[Site e traqueamentos] --> C4[Tracking em teste real] --> C5[Saldo]
    end
    F3 --> G3{{"GATE 3<br/>integrações validadas"}} --> F4

    subgraph F4["4 · ATIVAÇÃO"]
        direction TB
        D1[Funil] --> D2[Criativo e copy] --> D3[Revisão 4 olhos] --> D4[1ª Campanha] --> D5[Doc 1ª Campanha]
    end
    F4 --> M3{{"MARCO D10<br/>Acessos e Integração<br/>+ 1ª Campanha"}} --> F5

    subgraph F5["5 · APRENDIZADO · 30 dias"]
        direction TB
        E1[Stract · Make<br/>relatórios semanais] --> E2[Saldos e otimizações]
        E2 --> E3[OS · grupos<br/>qualidade dos leads] --> E4[Reunião de alinhamento]
    end
    F5 --> G6{{"GATE 6<br/>fim do onboarding"}} --> F6

    subgraph F6["6 · OPERAÇÃO CONTÍNUA"]
        direction TB
        H1[Relatórios mensais] --> H2[Reunião de performance]
        H2 --> H3[Atualização de bases] --> H4[Reunião interna] --> H5[Relatório trimestral<br/>novo ciclo]
    end
    H5 -.->|novo ciclo estratégico| F5

    classDef marco fill:#fff3cd,stroke:#b8860b,stroke-width:2px,color:#000;
    class M1,M2,M3,G3,G6 marco;
```

---

## 2. Fluxograma progressivo — uma etapa por vez

O formato acima é a arquitetura. O formato abaixo é o que o gestor júnior usa:
**onde estou · o que faço agora · o que destrava a próxima etapa.**

### Etapa 1 · ENTRADA — Pós Kickoff D1

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> T1[Entrar no grupo<br/><i>CS · D0</i>]
    T1 --> T2[Pedir os acessos<br/>lista única<br/><i>CS · D1</i>]
    T2 --> T3[Boas-vindas e agenda<br/>briefing + integração<br/><i>CS · D1</i>]
    T3 --> T4[Planilha, Trello e pasta<br/><i>CS · D1</i>]
    T4 --> P{Para avançar}
    P --> P1[Resumo comercial recebido]
    P --> P2[Grupo criado e populado]
    P --> P3[Lista de acessos enviada]
    P --> P4[Briefing agendado até D3]
    P --> P5[Planilha, card e pasta criados]
    P1 & P2 & P3 & P4 & P5 --> N([ETAPA 2<br/>Preparação])

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

### Etapa 2 · PREPARAÇÃO — Manual de Marca D4

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> T1[Reunião de briefing<br/><i>GT · até D3</i>]
    T1 --> T2[Objetivo e meta numérica<br/><i>GT · D4</i>]
    T2 --> T3[Oferta, público<br/>e concorrência<br/><i>GT e CR · D4</i>]
    T3 --> T4[Manual de Marca<br/><i>CR · D4</i>]
    T4 --> P{Para avançar}
    P --> P1[Meta com número e prazo]
    P --> P2[Quem atende o lead<br/>e em quanto tempo]
    P --> P3[Criativos existentes levantados<br/>OS aberta para o que falta]
    P --> P4[Manual de Marca na pasta]
    P1 & P2 & P3 & P4 --> N([ETAPA 3<br/>Integração])

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

### Etapa 3 · INTEGRAÇÃO — Acessos e Integração D10

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> T1[Reunião de Integração<br/>tela compartilhada<br/><i>CS + TEC · até D6</i>]
    T1 --> T2[Meta · GMN · Google Ads<br/><i>TEC · D8</i>]
    T2 --> T3[Site e traqueamentos<br/><i>TEC · D8</i>]
    T3 --> T4[Tracking em teste real<br/><i>TEC · D9</i>]
    T4 --> T5[Saldo ativo<br/><i>ADM · D8</i>]
    T5 --> P{Para avançar<br/>GATE 3}
    P --> P1[Blocos obrigatórios em ✅]
    P --> P2[Evento disparando<br/>em teste real]
    P --> P3[Formulário/WhatsApp<br/>testado de verdade]
    P --> P4[Saldo compatível com a verba]
    P1 & P2 & P3 & P4 --> N([ETAPA 4<br/>Ativação])

    B[Item travado > 48h] -.->|escalada| LS[Líder fala com o cliente<br/>por escrito]

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

### Etapa 4 · ATIVAÇÃO — 1ª Campanha D10

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> T1[Funil e estratégia<br/>hipótese escrita<br/><i>GT · D8</i>]
    T1 --> T2[Estrutura, orçamento<br/>e públicos<br/><i>GT · D9</i>]
    T2 --> T3[Criativo e copy<br/><i>CR · D9</i>]
    T3 --> T4[Revisão 4 olhos<br/><i>LS · D10</i>]
    T4 --> T5[1ª Campanha no ar<br/><i>GT · D10</i>]
    T5 --> T6[Doc 1ª Campanha<br/><i>GT · D10+1</i>]
    T6 --> P{Para avançar<br/>GATES 4 e 5}
    P --> P1[Link testado com clique real]
    P --> P2[Primeiro gasto e<br/>primeiro evento registrados]
    P --> P3[Doc da 1ª Campanha preenchido]
    P1 & P2 & P3 --> N([ETAPA 5<br/>Aprendizado])

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

### Etapa 5 · APRENDIZADO — 30 dias

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> T1[Stract, Make e<br/>relatórios semanais<br/><i>TEC → GT</i>]
    T1 --> T2[Saldos e otimizações<br/><i>GT · 2× semana</i>]
    T2 --> T3[OS, grupos de WhatsApp<br/>e qualidade dos leads<br/><i>GT e CS</i>]
    T3 --> T4[Reunião de alinhamento<br/><i>CS + GT · quinzenal</i>]
    T4 --> P{Para concluir<br/>o ONBOARDING · GATE 6}
    P --> P1[30 dias de dados]
    P --> P2[CPL/CPA de referência]
    P --> P3[3+ otimizações documentadas]
    P --> P4[Qualidade de lead validada]
    P --> P5[Rotina rodando sem improviso]
    P1 & P2 & P3 & P4 & P5 --> N([OPERAÇÃO<br/>CONTÍNUA])

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

### Etapa 6 · OPERAÇÃO CONTÍNUA — D40+

```mermaid
flowchart LR
    V(("VOCÊ<br/>ESTÁ AQUI")) --> S[Semana]
    S --> S1[Relatório semanal]
    S --> S2[Otimizações e OS]
    S --> S3[Reunião interna]
    V --> M[Mês]
    M --> M1[Relatório mensal]
    M --> M2[Reunião de performance]
    M --> M3[Atualização de bases]
    V --> Q[Trimestre]
    Q --> Q1[Relatório trimestral]
    Q --> Q2[Novo ciclo estratégico<br/>nova meta numérica]
    Q2 -.->|recomeça o ciclo| S

    classDef here fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px,color:#000;
    class V here;
```

---

## 3. Camada do gestor — fase · ação · evidência

```mermaid
flowchart TB
    subgraph L1["O QUE O GESTOR FAZ"]
        direction TB
        P1[Entrada · organizar cliente e pedir acesso]
        P2[Preparação · entender o negócio]
        P3[Integração · preparar infraestrutura]
        P4[Ativação · colocar mídia no ar]
        P5[Aprendizado · coletar e interpretar]
        P6[Operação · escalar, corrigir e manter]
        P1 --> P2 --> P3 --> P4 --> P5 --> P6
    end
    subgraph L2["EVIDÊNCIA DE CONCLUSÃO"]
        direction TB
        V1[Grupo + Trello + planilha<br/>+ lista de acessos enviada]
        V2[Briefing + meta numérica<br/>+ Manual de Marca]
        V3[Reunião de Integração<br/>+ tracking validado + saldo]
        V4[1ª Campanha + Doc 1ª Campanha]
        V5[Relatórios semanais<br/>+ otimizações documentadas]
        V6[Relatórios, reuniões<br/>e bases atualizadas]
    end
    P1 -.-> V1
    P2 -.-> V2
    P3 -.-> V3
    P4 -.-> V4
    P5 -.-> V5
    P6 -.-> V6
```

---

## 4. O sistema de aquisição — base do diagnóstico

```mermaid
flowchart LR
    AN[ANÚNCIO<br/><i>CPM · alcance</i>] --> CL[CLIQUE<br/><i>CTR · CPC</i>]
    CL --> PG[PÁGINA / WHATSAPP<br/><i>taxa de conversão</i>]
    PG --> LD[LEAD<br/><i>CPL · volume</i>]
    LD --> QL[QUALIDADE<br/><i>% qualificado</i>]
    QL --> VD[VENDA<br/><i>receita · ROAS</i>]

    VD -.->|"a análise<br/>começa aqui"| QL
    QL -.-> LD
    LD -.-> PG
    PG -.-> CL
    CL -.-> AN

    classDef etapa fill:#e8f0fe,stroke:#1a73e8,color:#000;
    class AN,CL,PG,LD,QL,VD etapa;
```

> Otimizar o Gerenciador é mexer só nas duas primeiras caixas. O resultado do
> cliente mora nas últimas quatro.

---

## 5. Fluxo de aprovação de um gate

```mermaid
flowchart TD
    X1[Gestor executa a etapa] --> X2[Anexa evidências no card]
    X2 --> X3[Checklist da etapa 100%]
    X3 --> X4[Label 'Gate solicitado'<br/>+ menciona o líder]
    X4 --> X5{Líder confere<br/>as evidências}
    X5 -->|aprova| X6[Card avança de lista]
    X5 -->|devolve| X7[Card permanece<br/>com o que falta listado]
    X7 --> X1
    X6 --> X8[Próxima etapa]

    Y1[Item travado > 48h] --> Y2[Lista BLOQUEADO<br/>dono + data + ação]
    Y2 --> Y3[Escalada ao líder<br/>cliente avisado por escrito]
```

---

## 6. Para a versão desenhada

Ao levar para Canva/Figma, manter **exatamente**:

- os nomes dos marcos oficiais: `Pós Kickoff D1`, `Manual de Marca D4`,
  `Entra Flowformance`, `Acessos e Integração D10`, `1ª Campanha D10`,
  `Aprendizado 30 dias`;
- a ordem do fluxo oficial (grupo → acesso → contato/agenda → planilha/Trello →
  Reunião de Integração → saldo → funil → criativo → 1ª campanha → doc…);
- os gates como portas, visualmente diferentes das etapas;
- o bloco "para avançar" em cada etapa — é ele que responde "posso seguir?";
- as cores de status iguais às labels do Trello (🟢 🟡 🔴).

Se o desenho usar outro vocabulário, o sistema volta a depender de memória — que é
exatamente o que ele existe para eliminar.
