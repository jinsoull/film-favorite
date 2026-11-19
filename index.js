// =============================================
require('dotenv').config(); // baca file .env (harus paling atas)

const express = require('express');
const path = require('path');
const filmRoutes = require('./routes/filmRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Template engine (tampilan web) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware built-in ---
app.use(express.urlencoded({ extended: true })); // baca data dari form HTML
app.use(express.json());                          // baca data JSON (Postman)
app.use(express.static(path.join(__dirname, 'public'))); // file CSS

// --- Routes ---
app.get('/', (req, res) => res.redirect('/films'));
app.use('/films', filmRoutes);    // halaman web
app.use('/api/films', apiRoutes); // REST API (JSON)

// --- Halaman 404 ---
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
  }
  res.status(404).render('error', {
    title: 'Tidak ditemukan',
    code: 404,
    message: 'Halaman yang kamu cari tidak ada.',
  });
});

// --- Penanganan error (misal MySQL belum nyala) ---
app.use((err, req, res, next) => {
  console.error(err);
  let message = err.message;
  if (err.code === 'ECONNREFUSED') {
    message = 'Tidak bisa terhubung ke MySQL. Pastikan MySQL di XAMPP sudah di-Start.';
  } else if (err.code === 'ER_BAD_DB_ERROR') {
    message = 'Database film_db belum dibuat. Jalankan isi file database.sql di phpMyAdmin.';
  } else if (err.code === 'ER_NO_SUCH_TABLE') {
    message = 'Tabel films belum dibuat. Jalankan isi file database.sql di phpMyAdmin.';
  }

  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({ success: false, message });
  }
  res.status(500).render('error', { title: 'Terjadi kesalahan', code: 500, message });
});

app.listen(PORT, () => {
  console.log(`Server FilmKu berjalan di http://localhost:${PORT}`);
});