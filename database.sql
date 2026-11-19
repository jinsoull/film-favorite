-- =============================================
--  Database untuk aplikasi FilmKu
--  Jalankan di phpMyAdmin (tab SQL)
-- =============================================
CREATE DATABASE IF NOT EXISTS film_db;
USE film_db;

CREATE TABLE IF NOT EXISTS films (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  sutradara VARCHAR(100) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  tahun INT NOT NULL,
  rating DECIMAL(3,1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data awal (contoh)
INSERT INTO films (judul, sutradara, genre, tahun, rating) VALUES
('Laskar Pelangi', 'Riri Riza', 'Drama', 2008, 8.7),
('Pengabdi Setan', 'Joko Anwar', 'Horor', 2017, 8.2),
('Interstellar', 'Christopher Nolan', 'Fiksi Ilmiah', 2014, 9.0),
('Spirited Away', 'Hayao Miyazaki', 'Animasi', 2001, 9.2),
('Parasite', 'Bong Joon-ho', 'Thriller', 2019, 8.9);