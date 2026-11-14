# 💱 Conversor de Moedas

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Demo](https://img.shields.io/badge/Demo-Online-success?logo=vercel)](https://conversor-de-moedas-blond.vercel.app/)

Aplicação web que converte valores entre moedas usando cotações em tempo real da [API Frankfurter](https://frankfurter.dev/). Construída com React e TypeScript, com a lógica separada da interface.

**🔗 Demo: https://conversor-de-moedas-blond.vercel.app/**

![Demonstração da aplicação](docs/demo.gif)

---

## ✨ Funcionalidades

- Conversão entre as moedas disponibilizadas pela API, listadas em ordem alfabética
- Exibição da taxa de câmbio e da data da cotação
- Troca rápida entre moeda de origem e destino
- Validação do formulário (valor positivo e moedas diferentes)
- Estados de carregamento e mensagens de erro para falhas da API
- Interface responsiva

---

## 🧰 Stack

| Camada | Tecnologia |
| --- | --- |
| Interface | React 19 (function components + hooks) |
| Linguagem | TypeScript 6 |
| Build e dev server | Vite 8 |
| Estilização | CSS puro, um arquivo por componente |
| Dados | Frankfurter API (REST, sem chave) via `fetch` |
| Qualidade | ESLint (`typescript-eslint`, `react-hooks`) |
| Deploy | Vercel |

---

## 🏗️ Arquitetura

O código é organizado em camadas com responsabilidades distintas. Os componentes só renderizam; o estado e as regras ficam em um custom hook; o acesso à API fica isolado em um serviço.

```
src/
├── components/   # UI apresentacional (Header, ConverterForm, ResultCard, FeedbackMessage, Footer)
├── hooks/        # useCurrencyConverter: estado, validações e orquestração
├── services/     # exchangeApi: chamadas HTTP à Frankfurter
├── types/        # Contratos TypeScript (Currency, ExchangeRateResponse)
├── utils/        # Formatação de moeda e data
└── styles/       # Estilos globais
```

**Fluxo de dados**

```
ConverterForm ──eventos──▶ useCurrencyConverter ──▶ exchangeApi ──▶ Frankfurter API
      ▲                            │
      └────── props (estado) ──────┴──▶ ResultCard / FeedbackMessage
```

**Decisões de projeto**

- **Lógica fora dos componentes:** `useCurrencyConverter` concentra estado, validação e chamadas. A `App` só conecta o hook aos componentes, o que facilita testar e evoluir cada parte.
- **Serviço isolado:** trocar de provedor de câmbio exige alterar apenas `exchangeApi.ts`.
- **Resposta sempre coerente com o formulário:** qualquer alteração em valor ou moeda limpa a cotação e o erro anteriores, para nunca exibir um resultado desatualizado.
- **Campo de valor como string:** o input guarda o texto digitado e só converte para número na validação, evitando o "0" fixo ao apagar o campo.
- **Tipagem das respostas da API** com TypeScript, para pegar erros de contrato em tempo de compilação.

---

## ▶️ Como executar

Requer Node.js.

```bash
git clone https://github.com/rafaelvassis/conversor-moedas.git
cd conversor-moedas
npm install
npm run dev
```

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos e build de produção |
| `npm run preview` | Pré-visualização do build |
| `npm run lint` | Análise estática com ESLint |

---

## 🔭 Próximos passos

- Histórico de conversões e moedas favoritas
- Gráfico de variação cambial
- Conversão automática durante a digitação
- Busca na seleção de moedas
- Tema claro/escuro
- Testes automatizados

---

<p align="center">
  <img src="docs/bear_transparent.png" width="100" alt="Bear Logo">
</p>

<p align="center">
  <strong>Desenvolvido por Rafael Vassis</strong>
</p>
