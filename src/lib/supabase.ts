import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Prevent crashes if variables are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Forms will not be submitted to the database.');
}
