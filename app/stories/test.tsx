'use client'

import { OverlayContext } from "@/lib/contexts";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { OverlayContextType } from "@/types/home.types";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function Test() {

    const supabase = supabaseBrowserClient();
    const router = useRouter();

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;
    
    
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

    useEffect(() => {
        // openOverlay('general-settings')
    }, [])


    return (
        <>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
   
    );
}

export default Test;