# School Registration — Guia Completo (Frontend Angular + Backend Node/Express)

> **Versão do Frontend (Angular)**: 1.2.1  
> **Versão do Backend (Node/Express)**: 1.0.0  
> **Stack**: Angular 19, Node.js 18+, Express 5, MySQL 8, Nodemailer, Bcrypt

---

## Sumário
- [Visão Geral](#visão-geral)
- [Arquitetura & Principais Módulos](#arquitetura--principais-módulos)
- [Requisitos](#requisitos)
- [Como baixar (git clone)](#como-baixar-git-clone)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Configuração (.env)](#configuração-env)
- [Execução / Desenvolvimento](#execução--desenvolvimento)
- [Rotas da API (Express)](#rotas-da-api-express)
- [Scripts úteis (NPM)](#scripts-úteis-npm)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Boas práticas & Segurança](#boas-práticas--segurança)
- [Solução de problemas (FAQ)](#solução-de-problemas-faq)
- [Roadmap (sugestões)](#roadmap-sugestões)
- [Autor / Criador & Licença](#autor--criador--licença)

---

## Visão Geral
Sistema simples de **registro escolar** com frontend em **Angular** e backend em **Node.js/Express**.  
Permite cadastrar **Usuários**, **Estudantes** e **Professores**, persistindo dados em **MySQL**. Ao criar um **Usuário**, o backend faz **hash** da senha com **bcrypt** e envia um **e‑mail** de boas‑vindas com a **senha temporária** usando **Nodemailer**.

**Endpoints principais**:
- `POST /users` — cria usuário (hash da senha + envio de e-mail)
- `POST /students` — cria estudante (vinculado a `userId`)
- `POST /teachers` — cria professor (vinculado a `userId`)

No frontend, os serviços usam `HttpClient` para chamar `http://localhost:3000/...`. Há utilitários (ex.: **validador de CPF**) e componentes para **login**, **cadastro de aluno** e **cadastro de professor**.

---

## Arquitetura & Principais Módulos

**Frontend (Angular 19)**
- `src/app/services/*`:
  - `users.service.ts`: `POST http://localhost:3000/users`
  - `student.service.ts`: `POST http://localhost:3000/students`
  - `teacher.service.ts`: `POST http://localhost:3000/teachers`
- `src/app/models/*`:
  - `users.ts`, `student.ts`, `teacher.ts`, `cpf-format.ts` (validador), `date-format.ts`
- `src/app/components/*`:
  - `login`, `student-register`, `teacher-register`, além de `header` e `footer`

**Backend (Node/Express + MySQL)**
- Dependências: `express`, `mysql2`, `cors`, `body-parser`, `bcrypt`, `nodemailer`
- Porta padrão: **3000**
- Cria tabelas automaticamente se não existirem:
  - `users (id, nome, sobrenome, email*, telefone, dataNascimento, genero, cpf*, password)`
  - `students (id, userId → users.id, serieAno, semestre)`
  - `teachers (id, userId → users.id, serieAno, disciplina)`

---

## Requisitos
- **Node.js** 18+ (recomendado LTS) e **npm** 9+  
- **Angular CLI** 19+ (`npm i -g @angular/cli`)  
- **MySQL** 8+ em execução local (ou remoto)  
- Uma conta SMTP (ex.: Gmail) para envio de e‑mails (ou um serviço transacional)

---

## Como baixar (git clone)

```bash
# via HTTPS
git clone https://seu-repositorio.git School-Registration
# ou via SSH
# git clone git@seu-repositorio:voce/School-Registration.git

cd School-Registration
```

---

## Instalação

### Backend

```bash
cd backend
npm i
```

### Frontend

Em outro terminal, na raiz do projeto:

```bash
cd School-Registration   # se você ainda não estiver na raiz
npm i
```

> Observação: O `package.json` do frontend traz os pacotes Angular 19.x. A primeira execução pode demorar um pouco para instalar as dependências.

---

## Configuração (.env)

Crie um arquivo `.env` **dentro de `backend/`** para parametrizar o banco e o SMTP. Exemplo:

```ini
# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=school_db

# SMTP (ex.: Gmail com App Password)
SMTP_SERVICE=gmail
SMTP_USER=seu.email@gmail.com
SMTP_PASS=sua_senha_de_aplicativo

# Porta do servidor Node
PORT=3000
```

**Importante**
- No código original, há credenciais de exemplo embutidas (incluindo e-mail). Para **produção**, mova tudo para `.env` e **NÃO** faça commit de segredos.
- Garanta que o banco MySQL exista (`DB_NAME`). Caso não exista, crie com `CREATE DATABASE school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

---

## Execução / Desenvolvimento

Abra **dois terminais**:

1) **Backend** (Express + MySQL)

```bash
cd backend
node server.js
# ou com nodemon, se preferir:
# npx nodemon server.js
```

Se tudo OK, você verá algo como:  
`Servidor rodando em http://localhost:3000`

2) **Frontend** (Angular)

```bash
# na raiz do projeto
ng s --o
# equivale a ng serve --open
```

O navegador abrirá em `http://localhost:4200/`.

---

## Rotas da API (Express)

### 1) Criar Usuário
`POST http://localhost:3000/users`

**Body (JSON)**:
```json
{
  "nome": "Maria",
  "sobrenome": "Silva",
  "email": "maria.silva@example.com",
  "telefone": "81999999999",
  "dataNascimento": "2000-05-10",
  "genero": "Feminino",
  "cpf": "123.456.789-09",
  "password": "SenhaTemporaria123",
  "destinatario": "maria.silva@example.com"
}
```

> O backend fará `bcrypt.hash(password)` e enviará um e‑mail para `destinatario` com a **senha temporária**.

### 2) Criar Estudante
`POST http://localhost:3000/students`

**Body (JSON)**:
```json
{
  "userId": 1,
  "serieAno": "1º Ano",
  "semestre": "2025.1"
}
```

### 3) Criar Professor
`POST http://localhost:3000/teachers`

**Body (JSON)**:
```json
{
  "userId": 1,
  "serieAno": "Fundamental II",
  "disciplina": "Matemática"
}
```

---

## Scripts úteis (NPM)

### Frontend (na raiz)
```bash
npm run start        # ng serve
npm run build        # ng build (produção: ng build --configuration production)
npm run test         # ng test
```

### Backend (em `backend/`)
```bash
node server.js       # inicia API
# Se usar nodemon:
npx nodemon server.js
```

---

## Estrutura de pastas

```
School-Registration/
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  └─ (crie aqui o .env)
├─ src/app/
│  ├─ components/
│  │  ├─ login/
│  │  ├─ student-register/
│  │  ├─ teacher-register/
│  │  ├─ header/
│  │  └─ footer/
│  ├─ models/
│  │  ├─ users.ts
│  │  ├─ student.ts
│  │  ├─ teacher.ts
│  │  ├─ cpf-format.ts
│  │  └─ date-format.ts
│  └─ services/
│     ├─ users/users.service.ts
│     ├─ student/student.service.ts
│     └─ teacher/teacher.service.ts
├─ angular.json
├─ package.json
├─ tsconfig*.json
└─ README.md
```

---

## Boas práticas & Segurança
- **Nunca** comite senhas ou **App Passwords**. Use `.env` e adicione-o ao `.gitignore`.
- **Rotacione** qualquer credencial que tenha sido exposta em repositório público.
- **Valide** dados no backend (tipos, formatos, SQL injection). O **CPF validator** no frontend ajuda, mas não substitui validação no servidor.
- Considere adicionar **rate limit**, **helmet**, **logs estruturados**, **CORS restritivo** e **camada de autenticação** (JWT/OAuth) para ambientes reais.

---

## Solução de problemas (FAQ)
**1) Erro de conexão MySQL**  
- Verifique host/porta/usuário/senha no `.env`.  
- Confirme que o banco (`DB_NAME`) existe e que o usuário tem permissão.

**2) E-mail não enviado**  
- Para Gmail, ative **App Passwords** e use `SMTP_SERVICE=gmail`.  
- Verifique bloqueios de provedor e se o menos seguro está desabilitado (para contas antigas).

**3) CORS no browser**  
- Ajuste o `cors()` no backend para permitir a origem correta do frontend.

**4) Porta em uso**  
- Altere `PORT` no `.env` do backend ou a porta do Angular (`ng s --port 4300`).

---

## Roadmap (sugestões)
- [ ] CRUD completo (listar/editar/excluir) para users/students/teachers
- [ ] Autenticação com JWT e guarda de rotas no Angular
- [ ] Camada de repositório + Migrations (ex.: Sequelize/Knex)
- [ ] Testes de integração (Supertest) e2e (Cypress/Playwright)
- [ ] Docker Compose (MySQL + API + Frontend)

---

## Autor / Criador & Licença
- **Autor/Criador**: *informe aqui o(a) responsável pelo projeto*  
- **Contato**: *e-mail/telefone/website*  
- **Licença**: MIT (ou outra de sua preferência)

---

> Dúvidas ou melhorias? Abra uma *issue* ou envie um PR! 🚀
