CREATE TABLE
  IF NOT EXISTS documents (
    filepath TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL
  );