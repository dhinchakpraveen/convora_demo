/*
  # Initial Schema Setup for Convora

  1. Tables
    - users
      - Basic user information and authentication
    - rooms
      - Video call rooms
    - recordings
      - Stored recordings from calls
    - clips
      - Short-form content generated from recordings
  
  2. Security
    - RLS enabled on all tables
    - Policies for user access control
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid REFERENCES users(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create rooms"
  ON rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view rooms they created"
  ON rooms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

-- Recordings table
CREATE TABLE IF NOT EXISTS recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  duration integer,
  transcript text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their recordings"
  ON recordings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

-- Clips table
CREATE TABLE IF NOT EXISTS clips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recording_id uuid REFERENCES recordings(id),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  duration integer,
  start_time integer,
  end_time integer,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their clips"
  ON clips
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);