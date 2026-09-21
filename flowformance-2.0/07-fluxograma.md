# 07 — Fluxograma Visual (3 camadas)

> Diagramas em Mermaid — renderizam no GitHub, no Notion e em qualquer editor
> Markdown moderno. Servem de fonte para a versão desenhada (Canva/Figma) usada
> no treinamento.

---

## 1. Visão macro — fases, marcos e gates

```mermaid
flowchart LR
    subgraph F1["1 · ENTRADA<br/>D0–D1"]
        A1[Kickoff] --> A2[Grupo + squad] --> A3[Planilha + Trello + pasta]
    end
    subgraph F2["2 · PREPARAÇÃO<br/>D1–D4"]
        B1[Briefing] --> B2[Objetivo + PUV + público] --> B3[Funil + Manual de Marca]
    end
    subgraph F3["3 · INTEGRAÇÃO<br/>D4–D10"]
        C1[Acessos] --> C2[Pixel / GTM / GA4] --> C3[Eventos + saldo validados]
    end
    subgraph F4["4 · ATIVAÇÃO<br/>até D10"]
        D1[Estratégia + estrutura] --> D2[Criativos + copy] --> D3[Revisão → publicação → doc]
    end
    subgraph F5["5 · APRENDIZADO<br/>D10–D40"]
        E1[Acompanhar entrega] --> E2[Ler indicadores] --> E3[Otimizar + documentar]
    end
    subgraph F6["6 · OPERAÇÃO CONTÍNUA<br/>D40+"]
        G1[Relatórios] --> G2[Reuniões + OS] --> G3[Ciclo trimestral]
    end

    F1 --> GT1{{"GATE 1<br/>Cliente recebido<br/>MARCO D1"}} --> F2
    F2 --> GT2{{"GATE 2<br/>Estratégia definida<br/>MARCO D4"}} --> F3
    F3 --> GT3{{"GATE 3<br/>Integrações validadas"}} --> F4
    F4 --> GT4{{"GATE 4<br/>Pronto p/ campanha"}} --> GT5{{"GATE 5<br/>Campanha publicada<br/>MARCO D10"}} --> F5
    F5 --> GT6{{"GATE 6<br/>Aprendizado concluído<br/>FIM DO ONBOARDING"}} --> F6

    classDef gate fill:#fff3cd,stroke:#b8860b,stroke-width:2px,color:#000;
    class GT1,GT2,GT3,GT4,GT5,GT6 gate;
```

---

## 2. Camada do gestor — fase · ação · evidência

```mermaid
flowchart TB
    subgraph L1["O QUE O GESTOR FAZ"]
        direction TB
        P1[Entrada<br/>Organizar cliente]
        P2[Estratégia<br/>Entender negócio]
        P3[Integração<br/>Preparar infraestrutura]
        P4[Ativação<br/>Colocar mídia no ar]
        P5[Aprendizado<br/>Coletar e interpretar dados]
        P6[Performance<br/>Escalar ou corrigir]
        P7[Gestão<br/>Manter operação organizada]
        P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
    end
    subgraph L2["EVIDÊNCIA DE CONCLUSÃO"]
        direction TB
        V1[Grupo + Trello + planilha]
        V2[Briefing + funil + objetivo]
        V3[Acessos + tracking validados]
        V4[Campanha + Doc 1ª Campanha]
        V5[Otimizações documentadas]
        V6[Indicadores + OS + decisões]
        V7[Relatórios + reuniões + bases]
    end
    P1 -.-> V1
    P2 -.-> V2
    P3 -.-> V3
    P4 -.-> V4
    P5 -.-> V5
    P6 -.-> V6
    P7 -.-> V7
```

---

## 3. Camada do treinamento — os 8 verbos

```mermaid
flowchart LR
    R([RECEBER]) --> AC([ACESSAR]) --> EN([ENTENDER]) --> IN([INTEGRAR])
    IN --> CO([CONSTRUIR]) --> PU([PUBLICAR]) --> ME([MEDIR]) --> OT([OTIMIZAR])
    OT -.->|novo ciclo| CO

    R -.- r1[Grupo · agenda · Trello<br/>planilha · responsáveis]
    AC -.- a1[Meta · Google · Instagram<br/>site · GMN · ferramentas]
    EN -.- e1[Produto · objetivo · público<br/>verba · oferta · funil]
    IN -.- i1[Pixel · tags · eventos<br/>CRM · Make · tracking]
    CO -.- c1[Campanha · públicos<br/>criativos · copy · orçamento]
    PU -.- p1[Checklist · saldo · tracking<br/>campanha · documentação]
    ME -.- m1[Stract · relatórios · WhatsApp<br/>CRM · qualidade dos leads]
    OT -.- o1[Campanha · criativos · verba<br/>funil · OS · reuniões]
```

---

## 4. O sistema de aquisição (base do diagnóstico)

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

## 5. Fluxo de aprovação de um Gate

```mermaid
flowchart TD
    X1[Gestor executa a fase] --> X2[Anexa evidências no card]
    X2 --> X3[Checklist da fase 100%]
    X3 --> X4[Label 'Gate solicitado' + menciona o LS]
    X4 --> X5{LS confere<br/>as evidências}
    X5 -->|aprova| X6[Card avança de lista<br/>comentário GATE N aprovado]
    X5 -->|devolve| X7[Card permanece na fase<br/>com o que falta listado]
    X7 --> X1
    X6 --> X8[Próxima fase]

    X9[Item travado > 48h] --> X10[Lista BLOQUEADO<br/>dono + data + ação]
    X10 --> X11[Escalada ao LS<br/>cliente avisado por escrito]
```

---

## 6. Para a versão desenhada

Ao levar isto para Canva/Figma, manter **exatamente**:

- os nomes das 6 fases (iguais aos das listas do Trello);
- os 3 marcos em destaque (D1, D4, D10) e o D40 como fim do onboarding;
- os 6 Gates como portas, visualmente diferentes das etapas;
- a linha dos 8 verbos como faixa inferior do diagrama;
- as cores de status iguais às labels do Trello (🟢 🟡 🔴).

Se o desenho usar outro vocabulário, o sistema volta a depender de memória — que
é exatamente o que ele existe para eliminar.
