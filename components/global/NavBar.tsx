'use client'
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

function NavBar() {

    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const handleSignIn = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({email: 'jorim.soika@gmail.com', password:'test123'}) 
        if(!error) {
          console.log('signed in as' + data.user.email)
          router.refresh();
        } else {
          console.log(error)
        }
    }

    const handleSignOut = async () => {
         const {error} = await supabase.auth.signOut();
         if(!error) {
            console.log('signed out')
            router.refresh();
          } else {
            console.log(error)
          }
    }



    return (
        <div>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default NavBar;