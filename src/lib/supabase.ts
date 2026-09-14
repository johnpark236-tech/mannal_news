import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbArticle {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  category: string;
  author: string;
  image_url: string | null;
  status: 'draft' | 'published';
  created_at: string;
  published_at: string | null;
}
