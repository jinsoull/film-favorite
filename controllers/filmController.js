// Controller untuk HALAMAN WEB (render EJS)
const Film = require('../models/filmModel');
const { validasiFilm, GENRES } = require('../helpers/validasi');

const PESAN = {
  tambah: 'Film berhasil ditambahkan!',
  ubah: 'Film berhasil diperbarui!',
  hapus: 'Film berhasil dihapus!',
};

function halaman404(res) {
  return res.status(404).render('error', {
    title: 'Tidak ditemukan',
    code: 404,
    message: 'Film yang kamu cari tidak ada.',
  });
}

// GET /films  -> daftar film (+ pencarian ?q=)
exports.index = async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    const films = await Film.getAll(q);
    res.render('films/index', {
      title: 'Daftar Film Favorit',
      films,
      q,
      pesan: PESAN[req.query.pesan] || '',
    });
  } catch (err) {
    next(err);
  }
};

// GET /films/tambah -> form tambah
exports.createForm = (req, res) => {
  res.render('films/form', {
    title: 'Tambah Film',
    mode: 'tambah',
    film: {},
    errors: [],
    genres: GENRES,
  });
};

// POST /films -> simpan film baru
exports.store = async (req, res, next) => {
  try {
    const { data, errors } = validasiFilm(req.body);
    if (errors.length) {
      return res.status(400).render('films/form', {
        title: 'Tambah Film', mode: 'tambah', film: req.body, errors, genres: GENRES,
      });
    }
    await Film.create(data);
    res.redirect('/films?pesan=tambah');
  } catch (err) {
    next(err);
  }
};

// GET /films/:id -> detail film
exports.detail = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.id);
    if (!film) return halaman404(res);
    res.render('films/detail', { title: film.judul, film });
  } catch (err) {
    next(err);
  }
};

// GET /films/:id/edit -> form edit
exports.editForm = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.id);
    if (!film) return halaman404(res);
    res.render('films/form', {
      title: 'Edit Film', mode: 'edit', film, errors: [], genres: GENRES,
    });
  } catch (err) {
    next(err);
  }
};

// POST /films/:id/edit -> simpan perubahan
exports.update = async (req, res, next) => {
  try {
    const film = await Film.getById(req.params.id);
    if (!film) return halaman404(res);

    const { data, errors } = validasiFilm(req.body);
    if (errors.length) {
      return res.status(400).render('films/form', {
        title: 'Edit Film', mode: 'edit',
        film: { ...req.body, id: film.id }, errors, genres: GENRES,
      });
    }
    await Film.update(req.params.id, data);
    res.redirect('/films?pesan=ubah');
  } catch (err) {
    next(err);
  }
};

// POST /films/:id/hapus -> hapus film
exports.destroy = async (req, res, next) => {
  try {
    await Film.remove(req.params.id);
    res.redirect('/films?pesan=hapus');
  } catch (err) {
    next(err);
  }
};