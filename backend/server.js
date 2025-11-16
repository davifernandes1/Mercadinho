import app from './app.js'; // Importa o app
import mongoose from 'mongoose';

// DEFINA SUAS VARIÁVEIS AQUI
const MONGO_URI = 'mongodb+srv://daviDB:davibanco@bancodedados.afew96r.mongodb.net/?appName=Bancodedados'; // Coloque sua string de conexão
const PORT = process.env.PORT || 3001;

// Conecta ao banco e sobe o servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso.');
    
    app.listen(PORT, () => {
      console.log(`Servidor backend rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });