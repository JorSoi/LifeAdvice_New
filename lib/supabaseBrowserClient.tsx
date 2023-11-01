import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

const supabaseBrowserClient = () => {
    
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
    return supabase;
}

export default supabaseBrowserClient;