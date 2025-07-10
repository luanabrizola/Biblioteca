# 🌐 Biblioteca Frontend

Este repositório contém o **frontend** da aplicação Biblioteca, desenvolvido com **React**, utilizando **Vite**, **Tailwind CSS** para estilização e **React Router** para navegação entre páginas.

---

## 🚀 Tecnologias Utilizadas

* **React** – Biblioteca JavaScript para criação de interfaces modernas e reativas
* **Vite** – Ferramenta de build extremamente rápida para projetos frontend
* **Tailwind CSS** – Framework CSS utilitário para estilização rápida e responsiva
* **React Router DOM** – Sistema de rotas e navegação SPA
* **Tabler Icons React** – Ícones leves e modernos integrados ao React

---

## 📁 Estrutura do Projeto

```
├── public/ 
├──src/
│
    ├── assets/                     
    │
    ├── Componentes/                
    │
    ├── pages/                      
    │   ├── Aluno/                  
    │   │   ├── Alunos.jsx         
    │   │   └── CadastrarAluno.jsx  
    │
    │   ├── Livro/                  
    │   │   ├── CadastrarLivro.jsx  
    │   │   └── Livros.jsx          
    │
    │   ├── Professor/              
    │   │   ├── CadastrasProfessor.jsx  
    │   │   ├── Professores.jsx                   
    │
    │   ├── Emprestimo/             
    │   │   ├── CadastrarEmprestimo.jsx         
    │   │   └── Emprestimo.jsx  
    │
    │   ├── Consulta.jsx
    │   ├── Inicio.jsx              
    │   ├── Layout.jsx             
    │   ├── Login.jsx              
    │   └── Page404.jsx           
    │
    ├── index.css                  
    ├── main.jsx 
├── index.html
├── eslint.config.js
├── tailwind.config.js   
├── package.json                   
└── vite.config.js      
```

## 📦 Dependências

### 🔧 Produção

| Pacote                  | Versão  | Descrição                                           |
| ----------------------- | ------- | --------------------------------------------------- |
| **react**               | ^19.0.0 | Biblioteca para construção da interface de usuário. |
| **react-dom**           | ^19.0.0 | Faz a integração do React com o DOM real.           |
| **react-router-dom**    | ^7.4.1  | Biblioteca para rotas SPA em aplicações React.      |
| **tailwindcss**         | ^4.1.4  | Framework CSS utilitário para estilização rápida.   |
| **@tailwindcss/vite**   | ^4.1.4  | Integração oficial do Tailwind com o Vite.          |
| **@tabler/icons-react** | ^3.31.0 | Coleção de ícones SVG prontos para usar no React.   |
| **@fontsource/poppins** | ^5.2.5  | Fonte Poppins para uso local e offline no projeto.  |
---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/luanabrizola/Biblioteca
cd Biblioteca
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:
👉 [http://localhost:5173](http://localhost:5173)

---




## 🌍 Integração com Backend

Este frontend foi projetado para se comunicar com o [**backend da Biblioteca**](https://github.com/defendii/Biblioteca-backend), que utiliza:

* Node.js + Express
* PostgreSQL (via NeonDB)
* Upload de imagens e envio de e-mails

Certifique-se de que o backend esteja rodando corretamente em `http://localhost:3333` (ou a URL configurada).

---

## 📬 Integrantes

* Ana Julia Defendi: [@defendii](https://github.com/defendii)
Responsável pela página de inicio e estilização das paginas em geral, como, por exemplo, a de cadastro dos usuarios e os cards e ajuda geral em outras páginas
---
* Ana Julia Menegasso: [@AnaMenegeasso](https://github.com/AnaMenegasso)
Responsável pelos emprestimos, pela página 404 e ajuda geral em outras páginas 
---
* Luana Rodrigues Brizola: [@luanabrizola](https://github.com/luanabrizola)
Responsável pelo menu, por configurar as rotas na main, o cadastro do livro e ajuda geral em outras páginas

Todas realizaram em conjunto o design da página.
  




