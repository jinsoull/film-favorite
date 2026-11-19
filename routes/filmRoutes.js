// Routes untuk HALAMAN WEB
const express = require('express');
const router = express.Router();
const film = require('../controllers/filmController');

router.get('/', film.index);              // daftar film
router.get('/tambah', film.createForm);   // form tambah (harus di atas /:id)
router.post('/', film.store);             // simpan film baru
router.get('/:id', film.detail);          // detail film
router.get('/:id/edit', film.editForm);   // form edit
router.post('/:id/edit', film.update);    // simpan perubahan
router.post('/:id/hapus', film.destroy);  // hapus film

module.exports = router;