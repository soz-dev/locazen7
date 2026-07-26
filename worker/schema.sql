CREATE TABLE IF NOT EXISTS rentals (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  type        TEXT NOT NULL DEFAULT '',
  price       REAL NOT NULL DEFAULT 0,
  beds        INTEGER NOT NULL DEFAULT 1,
  baths       INTEGER NOT NULL DEFAULT 1,
  guests      INTEGER NOT NULL DEFAULT 2,
  rating      REAL NOT NULL DEFAULT 4.8,
  image       TEXT NOT NULL DEFAULT '',
  imageY      INTEGER NOT NULL DEFAULT 50,
  images      TEXT NOT NULL DEFAULT '[]',
  amenities   TEXT NOT NULL DEFAULT '[]',
  airbnb_url  TEXT NOT NULL DEFAULT '',
  address     TEXT NOT NULL DEFAULT '',
  lat         REAL,
  lng         REAL,
  created_at  TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
