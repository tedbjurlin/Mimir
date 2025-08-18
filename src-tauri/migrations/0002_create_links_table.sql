CREATE TABLE
  IF NOT EXISTS links (
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    PRIMARY KEY (source_id, target_id),
    FOREIGN KEY (source_id) REFERENCES documents (filepath) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES documents (filepath) ON UPDATE CASCADE ON DELETE CASCADE
  );