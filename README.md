# -CheckGluten-MVP-Educacional-Pais-Filhos-

MVP educacional para famílias celíacas: checklists interativos, minigame Rotulômetro e receitas-base com substituições. Feito em React + Vite + TS + Tailwind.

[![CI](https://img.shields.io/github/actions/workflow/status/SEU_USUARIO/chef-alerg-mvp/ci.yml?label=CI)](../../actions)
[![Pages](https://img.shields.io/github/deployments/SEU_USUARIO/chef-alerg-mvp/github-pages?label=pages)](../../deployments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Objetivo:** dar **confiança diária** para famílias celíacas (pais + filhos).  
Este MVP foca em **educação prática e engajamento**:

- ✅ **Checklists Interativos**: Cozinha Segura, Festa Infantil e Escola (2–3 min cada)
- 🎮 **Minigame “Rotulômetro”**: identifique ingredientes de risco e aprenda o porquê
- 👩‍🍳 **Receitas-base** com **substituições** simples (autonomia na cozinha)

> Observação (Brasil): rótulos já informam “contém/não contém glúten”. Nosso foco é **educar e reduzir deslizes**, não substituir o rótulo.

---

## Demo
- **GitHub Pages:**https://github.com/EdyRamos/-CheckGluten-MVP-Educacional-Pais-Filhos  
  > Se a página 404, aguarde a primeira execução do workflow de deploy.

---

## Stack
- **React + Vite + TypeScript**
- **Tailwind CSS**
- **framer-motion**, **lucide-react** (icones/efeitos)

---

## Funcionalidades (MVP)
- **Checklists** com progresso local (client-side)
- **Minigame Rotulômetro** com feedback e explicação
- **Receitas** com lista de ingredientes, passos e **substituições**
- **Telemetria simulada** via `console.log` para: 
  - `checklist_complete`, `game_level_complete`, `save_recipe`

---

## Como rodar localmente

```bash
# com npm
npm i
npm run dev

# com yarn
yarn
yarn dev

# com pnpm
pnpm i
pnpm dev
