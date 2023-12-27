'use client'


import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import AvatarList from "@/components/pages/Profile/AvatarList/AvatarList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useRouter } from "next/navigation";

async function Test() {

    const supabase = supabaseBrowserClient();
    const router = useRouter();
    
    const handleSignIn = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: 'jorim.soika@gmx.de',
            password: 'Supert0ll'
        })

        if(!error) {
            // alert('signed in as' + data.user.email)
            router.refresh();
        } else {
            alert('couldnt sign in:' + error.message)
        }
    }

    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();

        if(!error) {
            // alert('signed out successfully')
            router.refresh();
        } else {
            alert('couldnt sign out:' + error.message)
        }
    }


    return (
        <>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
   
    );
}

export default Test;