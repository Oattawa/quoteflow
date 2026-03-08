-- Migration: Add proposal status tracking
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'viewed', 'accepted', 'declined')),
  ADD COLUMN IF NOT EXISTS viewed_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS client_message TEXT;

-- Index for dashboard queries filtering by status
CREATE INDEX IF NOT EXISTS proposals_status_idx ON proposals (user_id, status);
