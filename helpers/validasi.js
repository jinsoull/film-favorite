// Validasi input film (dipakai oleh halaman web dan API)
const GENRES = [
  'Aksi', 'Animasi', 'Dokumenter', 'Drama', 'Fiksi Ilmiah', 'Horor',
  'Komedi', 'Petualangan', 'Romantis', 'Thriller', 'Lainnya',
];

function validasiFilm(body) {
  body = body || {};
  const tahunMaks = new Date().getFullYear() + 1;

  const data = {
    judul: String(body.judul || '').trim(),
    sutradara: String(body.sutradara || '').trim(),
    genre: String(body.genre || '').trim(),
    tahun: Number(body.tahun),
    rating: Number(body.rating),
  };

  const errors = [];
  if (!data.judul) errors.push('Judul wajib diisi.');
  if (!data.sutradara) errors.push('Sutradara wajib diisi.');
  if (!GENRES.includes(data.genre)) errors.push('Genre wajib dipilih dari daftar.');
  if (!Number.isInteger(data.tahun) || data.tahun < 1888 || data.tahun > tahunMaks) {
    errors.push(`Tahun rilis harus antara 1888 dan ${tahunMaks}.`);
  }
  if (body.rating === '' || body.rating === undefined || Number.isNaN(data.rating)
      || data.rating < 0 || data.rating > 10) {
    errors.push('Rating harus angka 0 sampai 10.');
  }

  return { data, errors };
}

module.exports = { validasiFilm, GENRES };