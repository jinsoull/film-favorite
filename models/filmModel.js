// Model: semua query ke tabel films ada di sini
// Tanda ? = prepared statement (mencegah SQL Injection)
const db = require('../config/db');

const Film = {
  // READ semua (bisa dengan pencarian)
  async getAll(keyword = '') {
    if (keyword) {
      const like = `%${keyword}%`;
      const [rows] = await db.query(
        'SELECT * FROM films WHERE judul LIKE ? OR sutradara LIKE ? OR genre LIKE ? ORDER BY id DESC',
        [like, like, like]
      );
      return rows;
    }
    const [rows] = await db.query('SELECT * FROM films ORDER BY id DESC');
    return rows;
  },

  // READ satu film berdasarkan id
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM films WHERE id = ?', [id]);
    return rows[0];
  },

  // CREATE
  async create(data) {
    const [result] = await db.query('INSERT INTO films SET ?', [data]);
    return result.insertId;
  },

  // UPDATE
  async update(id, data) {
    const [result] = await db.query('UPDATE films SET ? WHERE id = ?', [data, id]);
    return result.affectedRows;
  },

  // DELETE
  async remove(id) {
    const [result] = await db.query('DELETE FROM films WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = Film;