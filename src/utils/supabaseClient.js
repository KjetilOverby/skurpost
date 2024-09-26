// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL ?? 'default_supabase_url';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY ?? 'default_supabase_anon_key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
