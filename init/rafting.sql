-- ==============================================================
-- DBMS name:      PostgreSQL 17.0
-- Created on:     04/05/2025
-- ==============================================================

DROP TABLE IF EXISTS galeri;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS hero;
DROP TABLE IF EXISTS item_paket;
DROP TABLE IF EXISTS testimoni;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS fasilitas_paket;

-- ==============================================================
-- Table: game
-- ==============================================================
CREATE TABLE game (
    id_game              SERIAL PRIMARY KEY,
    nama_game            VARCHAR(100) NOT NULL,
    deskripsi_game       TEXT,
    lokasi               VARCHAR(255),
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================
-- Table: item_paket
-- ==============================================================
CREATE TABLE item_paket (
    id_paket             SERIAL PRIMARY KEY,
    id_game              INTEGER NOT NULL,
    title_paket          VARCHAR(100) NOT NULL,
    harga_paket          NUMERIC(10, 2) NOT NULL,
    image_src            VARCHAR(255),
    deskripsi_paket      TEXT,
    package              VARCHAR(50),
    min_peserta          INTEGER,
    max_peserta          INTEGER,
    durasi               VARCHAR(50),
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_game) REFERENCES game(id_game) ON DELETE CASCADE
);

-- ==============================================================
-- Table: fasilitas_paket
-- ==============================================================
CREATE TABLE fasilitas_paket (
    id_fasilitas         SERIAL PRIMARY KEY,
    id_paket             INTEGER NOT NULL,
    nama_fasilitas       VARCHAR(255) NOT NULL,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paket) REFERENCES item_paket(id_paket) ON DELETE CASCADE
);

-- ==============================================================
-- Table: galeri
-- ==============================================================
CREATE TABLE galeri (
    id_galeri            SERIAL PRIMARY KEY,
    id_game              INTEGER,
    nama_photo           VARCHAR(100),
    image_src            VARCHAR(255) NOT NULL,
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_game) REFERENCES game(id_game) ON DELETE SET NULL
);

-- ==============================================================
-- Table: hero
-- ==============================================================
CREATE TABLE hero (
    id_hero              SERIAL PRIMARY KEY,
    title_hero           VARCHAR(100) NOT NULL,
    desc_hero            TEXT,
    image_hero           VARCHAR(255) NOT NULL,
    urutan               INTEGER DEFAULT 1,
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================
-- Table: testimoni
-- ==============================================================
CREATE TABLE testimoni (
    id_testimoni         SERIAL PRIMARY KEY,
    nama_testimoni       VARCHAR(100) NOT NULL,
    komentar_testimoni   TEXT NOT NULL,
    rating               INTEGER DEFAULT 5,
    is_active            BOOLEAN DEFAULT TRUE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================
-- Table: booking
-- ==============================================================
CREATE TABLE booking (
    id_booking           SERIAL PRIMARY KEY,
    id_paket             INTEGER NOT NULL,
    nama_pemesan         VARCHAR(100) NOT NULL,
    email                VARCHAR(100),
    no_telp              VARCHAR(20) NOT NULL,
    jumlah_peserta       INTEGER NOT NULL,
    tanggal_booking      DATE NOT NULL,
    jam_booking          TIME,
    catatan              TEXT,
    status               VARCHAR(100) DEFAULT 'pending',
    whatsapp_sent        BOOLEAN DEFAULT FALSE,
    total_harga          NUMERIC(12, 2),
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paket) REFERENCES item_paket(id_paket) ON DELETE RESTRICT
);