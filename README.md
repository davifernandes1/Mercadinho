<h1 align="center">🛒 Mercadinho Kiosk Self-Service</h1>

<p align="center">
  Um sistema de autoatendimento moderno e intuitivo, desenvolvido para agilizar compras em mini-markets e mercados de condomínio.<br>
  Projeto Full Stack com CRUD completo para gestão de estoque e fluxo otimizado para o cliente.
</p>

---

## ✨ Tecnologias Utilizadas

| Categoria        | Tecnologias Chave |
|------------------|-------------------|
| **Frontend**     | ⚛️ React, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend**      | 🟢 Node.js, Express, Mongoose |
| **Banco de Dados** | 🍃 MongoDB (Atlas) |
| **Utilitários**  | 🔄 TanStack Query (Gerenciamento de Cache) |

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado:

- Node.js (v18+ recomendado)  
- npm  
- MongoDB Atlas ou instância local (URI de conexão)

---

## 🚀 Guia de Instalação e Execução

### 1️⃣ Clonar e Configurar o Ambiente

# Clone o repositório na branch develop
git clone -b develop https://github.com/davifernandes1/Mercadinho.git
cd Mercadinho

2️⃣ Configurar e Iniciar o Backend (API)

O Backend roda na porta 3001

a. Criar variáveis de ambiente (⚠️ Essencial)

Crie o arquivo backend/.env:

# SUBSTITUA PELAS SUAS CREDENCIAIS
MONGO_URI=mongodb+srv://[USUARIO]:[SENHA]@[CLUSTER].mongodb.net/?appName=Bancodedados

b. Instalar dependências e iniciar
cd backend
npm install
npm run dev

✅ STATUS: Servidor iniciado em http://localhost:3001

Se o banco estiver vazio, o sistema fará o seeding automaticamente.

3️⃣ Iniciar o Frontend (Kiosk)

O Frontend roda na porta 8080

# Volta para a raiz do projeto
cd ..

# Entra na pasta do frontend (ajuste se necessário)
cd frontend/mercadinho-kiosk

npm install
npm run dev

✅ STATUS: Aplicação disponível em http://localhost:8080
