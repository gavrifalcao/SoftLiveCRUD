# CRUD SoftLive

Aplicação web desenvolvida como parte de um teste técnico para vaga de Front-End. O objetivo foi construir uma interface de CRUD (Criar, Listar, Editar, Deletar) de produtos utilizando as tecnologias React 19, Vite e TypeScript, com boas práticas de organização, validação de formulários e deploy em produção.

---

## 🧩 Funcionalidades

- Listagem de produtos com nome, categoria, descrição e preço
- Modal para **adição de produto**, com validação de campos e autocomplete de categorias
- Modal para **edição de produto**, com preenchimento automático dos dados existentes
- Modal de **confirmação de exclusão**
- Produtos salvos em uma API mock (MockAPI.io)
- Interface responsiva e clara, com uso de Tailwind CSS e Headless UI

---

## 🔗 Link para acesso

➡️ Acesse o projeto publicado:  
**[https://soft-live-crud.vercel.app](https://soft-live-crud.vercel.app)**

---

## 📷 Captura de tela

![Screenshot da aplicação](./src/assets/img/crud-home.png)

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/crud-softlive.git
cd crud-softlive
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode a aplicação em modo desenvolvimento

```bash
npm run dev
```

Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Scripts disponíveis

| Script         | Descrição                                      |
|----------------|------------------------------------------------|
| `npm run dev`  | Inicia o servidor de desenvolvimento Vite      |
| `npm run build`| Faz o build de produção com TypeScript + Vite  |
| `npm run preview`| Visualiza o projeto após build (`dist/`)    |
| `npm run lint` | Executa o ESLint para análise de código        |

---

## 🛠️ Tecnologias utilizadas

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Axios
- MockAPI.io

---

## 📁 Estrutura geral do projeto

```
src/
├── assets/
│   └── img/           → Imagens dos produtos
├── components/        → Modais, cards e UI reutilizável
├── hooks/             → Hooks customizados (futuro)
├── pages/             → Páginas principais (futuro)
├── services/          → Comunicação com a API
├── types/             → Tipagens TypeScript (ex: Produto)
├── utils/             → Categorias e funções auxiliares
```

---

## 📃 Licença

Este projeto foi desenvolvido unicamente para fins de avaliação técnica e aprendizado. Nenhum uso comercial é autorizado sem consentimento prévio.

---