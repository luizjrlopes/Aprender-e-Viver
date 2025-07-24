# 📑 Agents Documentation – App "Aprender é Viver"

Este documento reúne toda a estrutura e informações para o desenvolvimento completo do app **Aprender é Viver**, centralizador de PEXs, utilizando o **Next.js App Router**.

---

## 1. Estrutura de Diretórios Final

```
aprender-e-viver/
├── .github/                      ← GitHub Actions CI/CD
│   └── workflows/
│       └── deploy.yml            ← pipeline de lint, build e deploy
├── .env.local                    ← variáveis de ambiente (não versionar)
├── .gitignore
├── next.config.js                ← configuração Next.js
├── tailwind.config.js            ← configuração do Tailwind
├── postcss.config.js
├── package.json
├── README.md
│
├── public/                       ← arquivos estáticos
│   ├── favicon.ico
│   └── assets/
│       ├── logo.png
│       └── styles/
│           └── base.css
│
├── data/                         ← dados de exemplo
│   ├── semesters.json
│   └── schools.json
│
├── templates/                    ← HTML para geração de PDF
│   └── report.html
│
├── app/                          ← Next.js App Router
│   ├── layout.tsx                ← wrapper de layout (Header/Footer)
│   ├── page.tsx                  ← home “Menu de Semestres”
│   ├── semestre/                 ← rota de semestres
│   │   └── [id]/
│   │       └── page.tsx          ← Página de cada Semestre (lista de módulos)
│   └── api/                      ← rotas de API
│       ├── ideas/                ← rota POST /api/ideas
│       │   └── route.ts
│       ├── modules/              ← CRUD de módulos
│       │   ├── route.ts          ← GET, POST em /api/modules
│       │   └── [id]/
│       │       └── route.ts      ← PUT, DELETE em /api/modules/[id]
│       └── report/               ← geração de PDF
│           └── [id]/
│               └── route.ts      ← GET /api/report/[id]
│
├── src/                          ← código fonte compartilhado
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ModuleCard.tsx        ← cartão de módulo PEX
│   │   ├── ModuleForm.tsx        ← formulário CRUD de módulos
│   │   └── Ui/                   ← componentes UI (buttons, spinners, modal, toast)
│   │
│   ├── lib/
│   │   ├── api.ts                ← cliente OpenAI + wrapper
│   │   ├── db.ts                 ← inicialização Firestore/MongoDB
│   │   └── auth.ts               ← helpers Firebase Auth
│   │
│   ├── models/
│   │   └── Module.ts             ← interface `ModuloAppPEX`
│   │
│   ├── styles/
│   │   └── globals.css           ← Tailwind e overrides globais
│   │
│   ├── utils/
│   │   └── promptBuilder.ts      ← monta prompt com placeholders
│   │
│   └── hooks/
│       └── useModules.ts         ← hooks SWR/React Query para módulos
│
├── scripts/
│   └── generate-report.ts        ← CLI para gerar PDF localmente
│
├── tests/
│   ├── components/
│   │   └── ModuleCard.test.tsx
│   ├── app/
│   │   └── page.test.tsx         ← testes da rota home
│   └── lib/
│       └── api.test.ts           ← testes de integração com OpenAI
│
└── docs/
    ├── DCI_App_Aprender_e_Viver.md
    ├── Checklist_PEX_Completo.md
    └── Modelo_PEX_Estrutura_Completa.pdf
```

---

## 2. Principais Funcionalidades

1. **Cadastro e Gerenciamento de PEXs**

   - Registrar semestres, disciplinas, escolas, turmas e conteúdos.

2. **Formulários Online**

   - Geração e coleta de formulários via rotas API em `app/api` para diretores e professores.

3. **Cruzamento Inteligente**

   - Rota `app/api/ideas/route.ts` usando OpenAI para gerar sugestões de apps.

4. **CRUD de Módulos**

   - Rotas REST em `app/api/modules` para criar, ler, atualizar e excluir módulos.

5. **Geração de Relatórios**

   - Rota `app/api/report/[id]/route.ts` que compila template HTML e gera PDF via Puppeteer.

6. **UI/UX Profissional**

   - Estilo com Tailwind, componentes semânticos e testes com Jest/RTL.

7. **Autenticação**

   - Proteção de rotas com Firebase Auth (Google Sign-In).

8. **Deploy & CI/CD**

   - Vercel + GitHub Actions para pipeline completo.

---

## 3. Tecnologias Utilizadas

- **Framework:** Next.js 13+ com App Router
- **Frontend:** React, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **IA:** OpenAI GPT-3/4 via `openai` SDK
- **Banco de Dados:** Firebase Firestore (ou MongoDB)
- **Geração de PDF:** Puppeteer + Handlebars
- **Autenticação:** Firebase Auth
- **Testes:** Jest, React Testing Library
- **Deploy:** Vercel

---

## 4. Pipeline de Desenvolvimento

1. **Fase 1:** Setup do boilerplate e variáveis de ambiente.
2. **Fase 2:** Listagem de semestres e módulos via dados estáticos.
3. **Fase 3:** Integração da rota `/api/ideas` com OpenAI.
4. **Fase 4:** Implementação do CRUD de módulos no banco.
5. **Fase 5:** Automação de relatórios PDF com Puppeteer.
6. **Fase 6:** Polimento de UI/UX e testes.
7. **Fase 7:** Autenticação e segurança.
8. **Fase 8:** Deploy e CI/CD.

---

## 5. Observações

- **.env.local** não deve ser versionado.
- Templates HTML ficam em `templates/report.html` para fácil manutenção.
- Documentação está em `docs/`.
- Scripts de linha de comando ficam em `scripts/`.
- Testes específicos de App Router (tests/app) garantem cobertura das rotas.

---

_Este arquivo serve como guia completo para qualquer desenvolvedor ou avaliador entender e contribuir com o app._
