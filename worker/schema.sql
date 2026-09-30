CREATE TABLE IF NOT EXISTS content (
  collection TEXT NOT NULL,
  id TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  data TEXT NOT NULL,
  PRIMARY KEY (collection, id)
);

CREATE INDEX IF NOT EXISTS idx_content_collection ON content(collection, sort_order);
