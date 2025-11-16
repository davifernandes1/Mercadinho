🚀 Guia de Instalação e Execução

1. Clonar e Configurar o Ambiente

# Clone o repositório na branch de desenvolvimento
git clone -b develop [https://github.com/davifernandes1/Mercadinho.git](https://github.com/davifernandes1/Mercadinho.git)
cd Mercadinho 


2. Configurar e Iniciar o Backend (API)

O Backend roda na porta 3001.

a. Configuração de Variáveis (Atenção!)

Crie o arquivo .env DENTRO da pasta backend/ e adicione sua URI do MongoDB Atlas.

Arquivo: backend/.env

# SUBSTITUA PELAS SUAS CREDENCIAIS
MONGO_URI=mongodb+srv://[USUARIO]:[SENHA]@[CLUSTER].mongodb.net/?appName=Bancodedados


b. Instalar e Iniciar

# Navega para a pasta do Backend
cd backend
npm install
npm run dev


🟢 STATUS: O servidor iniciará em http://localhost:3001. Ele fará o seeding (população inicial) do banco de dados com produtos mockados (se a coleção estiver vazia).

3. Iniciar o Frontend (Kiosk)

O Frontend roda na porta 8080.

# Volta para a raiz do projeto (Mercadinho/)
cd .. 

# Entra na pasta do Frontend (ajuste se necessário)
cd frontend/mercadinho-kiosk 

npm install
npm run dev


🟢 STATUS: A aplicação React estará disponível em: http://localhost:8080
