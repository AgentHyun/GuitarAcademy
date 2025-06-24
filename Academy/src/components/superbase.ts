// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vhfsymqnbjmdbjsyycdk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZnN5bXFuYmptZGJqc3l5Y2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTQyMTksImV4cCI6MjA2NjMzMDIxOX0.RhoakjOAU_TDV3ReoZOxOpxhF1H0bh-ytUC2-iPvNQ8'; // 생략 가능
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
