import mongoose from 'mongoose';
const { Schema } = mongoose;

const SettingsSchema = new Schema({
  // Usaremos um ID fixo para sempre atualizar o mesmo documento
  marketName: { type: String, default: 'Mercadinho do Condomínio' },
  adminPin: { type: String, required: true }, // No futuro, armazene isso como hash
});

const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;