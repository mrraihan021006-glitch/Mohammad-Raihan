-- Cloudflare D1 Schema for raihan_portfolio_db (212050f4-a269-4c14-a6d2-9b3f21431902)
CREATE TABLE IF NOT EXISTS portfolio_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  state_json TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cloudinary_gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Design',
  folder TEXT DEFAULT 'raihan_portfolio',
  public_id TEXT NOT NULL,
  secure_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
