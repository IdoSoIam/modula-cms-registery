ALTER TABLE instances ADD COLUMN payment_provider TEXT NOT NULL DEFAULT 'none';
ALTER TABLE instances ADD COLUMN payment_settings_json TEXT;

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  instance_slug TEXT NOT NULL,
  order_id TEXT NOT NULL,
  order_number TEXT,
  provider TEXT NOT NULL,
  provider_account_id TEXT,
  provider_session_id TEXT UNIQUE,
  provider_payment_intent_id TEXT UNIQUE,
  provider_payment_status TEXT,
  payment_status TEXT NOT NULL,
  checkout_url TEXT,
  amount_total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'eur',
  commission_amount INTEGER NOT NULL DEFAULT 0,
  commission_percent REAL NOT NULL DEFAULT 0,
  customer_email TEXT,
  success_url TEXT,
  cancel_url TEXT,
  metadata_json TEXT,
  last_event_id TEXT,
  failure_reason TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS payments_instance_slug_order_id_key
  ON payments (instance_slug, order_id);

CREATE INDEX IF NOT EXISTS payments_instance_slug_created_at_idx
  ON payments (instance_slug, created_at DESC);
