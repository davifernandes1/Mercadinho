require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes'); // Importa o roteador central

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Conexão com o Banco de Dados ---
// Evitar que o banco se conecte automaticamente durante os testes
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Conectado com Sucesso! 🚀'))
    .catch(err => console.error('Falha na conexão com MongoDB:', err));
}

// Rotas da API
app.use('/api', apiRoutes);

// Middleware de Tratamento de Erro (Genérico)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado no servidor!', error: err.message });
});

module.exports = app;