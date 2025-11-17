import Settings from '../models/Settings.js';
const SETTINGS_ID = "60d5f9f6e3b3c3b3c3b3c3b3"; // ID Fixo (use um ObjectId válido)

// GET
export const getSettings = async (req, res) => {
  try {
    // Tenta encontrar, ou cria se não existir
    let settings = await Settings.findById(SETTINGS_ID);
    if (!settings) {
      settings = new Settings({ _id: SETTINGS_ID, adminPin: '1234' });
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar configurações' });
  }
};

// UPDATE
export const updateSettings = async (req, res) => {
  try {
    // No futuro, aqui você deve criptografar o req.body.adminPin se ele for alterado
    const settings = await Settings.findByIdAndUpdate(SETTINGS_ID, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao salvar configurações' });
  }
};