import app from './app.js'; 
import mongoose from 'mongoose';


const MONGO_URI = 'mongodb+srv://daviDB:davibanco@bancodedados.afew96r.mongodb.net/?appName=Bancodedados'; 
const PORT = process.env.PORT || 3001;


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