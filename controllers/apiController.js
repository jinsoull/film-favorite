// Controller untuk REST API (response JSON, dites pakai Postman)
// Format response standar: { success, message, data }
const Film = require('../models/filmModel');
const { validasiFilm } = require('../helpers/validasi');

// GET /api/films
exports.getAll = async (req, res, next) => {
  try {
    const films = await Film.getAll(String(req.query.q || '').trim());
    res.json({ success: true, message: 'Data film ditemukan', data: films });
  } catch (err) {
    next(err);
  }
};

// GET /api/films/:id
exports.getById = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.id);
    if (!film) {
      return res.status(404).json({ success: false, message: 'Film tidak ditemukan' });
    }
    res.json({ success: true, message: 'Data film ditemukan', data: film });
  } catch (err) {
    next(err);
  }
};

// POST /api/films
exports.create = async (req, res, next) => {
  try {
    const { data, errors } = validasiFilm(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Data tidak valid', errors });
    }
    const id = await Film.create(data);
    const film = await Film.getById(id);
    res.status(201).json({ success: true, message: 'Film berhasil ditambahkan', data: film });
  } catch (err) {
    next(err);
  }
};

// PUT /api/films/:id
exports.update = async (req, res, next) => {
  try {
    const ada = await Film.getById(req.params.id);
    if (!ada) {
      return res.status(404).json({ success: false, message: 'Film tidak ditemukan' });
    }
    const { data, errors } = validasiFilm(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Data tidak valid', errors });
    }
    await Film.update(req.params.id, data);
    const film = await Film.getById(req.params.id);
    res.json({ success: true, message: 'Film berhasil diperbarui', data: film });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/films/:id
exports.remove = async (req, res, next) => {
  try {
    const terhapus = await Film.remove(req.params.id);
    if (!terhapus) {
      return res.status(404).json({ success: false, message: 'Film tidak ditemukan' });
    }
    res.json({ success: true, message: 'Film berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};