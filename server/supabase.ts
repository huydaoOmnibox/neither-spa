import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

// Ensure environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const databaseUrl = process.env.DATABASE_URL;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required. Please check your .env file.');
}

if (!supabaseServiceKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is required. Please check your .env file.');
}

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required. Please check your .env file.');
}

console.log('✅ Environment variables loaded successfully');
console.log('📡 Supabase URL:', supabaseUrl);
console.log('🗄️ Database URL configured');

// For client-side operations (if needed)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create PostgreSQL connection
const client = postgres(databaseUrl);

// Create Drizzle database instance with schema
export const db = drizzle(client, { schema });

export type Database = typeof db; 