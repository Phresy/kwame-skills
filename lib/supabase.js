import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqiducxuebtxjlbtfiaa.supabase.co';
const supabaseAnonKey = 'sb_publishable_PyK_hHR2IkCdkGEMOpk69Q_29tLEDbV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);