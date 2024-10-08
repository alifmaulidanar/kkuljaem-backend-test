CREATE DATABASE pokemon_db;

USE pokemon_db;

-- Tabel User
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Pokémon
CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pokemon_id INT NOT NULL,
    originalName VARCHAR(50),
    initialName VARCHAR(50),
    nickname VARCHAR(50),
    rename_count INT DEFAULT 0,
    is_released BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

SELECT * FROM user;

SELECT * FROM pokemon;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE user;

TRUNCATE TABLE pokemon;

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE pokemon;

DROP TABLE user;