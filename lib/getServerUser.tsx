import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";
import { cookies } from "next/headers";

const supabaseBrowserClient = async () => {
    
  const cookieStore = cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {data: user, error} = await supabase.auth.getUser();
  if(!error) {
    return user;
  } else {
    return error;
  }
}

export default supabaseBrowserClient;