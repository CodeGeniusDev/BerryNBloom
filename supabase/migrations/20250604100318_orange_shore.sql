/*
  # Create cart items table

  1. New Tables
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (text)
      - `quantity` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for users to manage their own cart items
*/

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id text NOT NULL,
  quantity integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_quantity CHECK (quantity > 0)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies for cart items
CREATE POLICY "Users can view their own cart items"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);