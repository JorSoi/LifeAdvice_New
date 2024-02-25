'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

//This route is directed to from the Google oAuth screen. It uses sessionStorage to inform the upcoming page, that it has to perform a hard refresh. This refreshing logic is handled in the PageContainer component.
function redirect() {

    const router = useRouter();

    //Note: Needs to be adjusted in the long run (e.g. middleware or supabase fixes), but for for now this will be used as a temporary oAuth Signup/Signin solution.
    useEffect(() => {
        sessionStorage.setItem("OAuthRedirection", "true")
        router.push('/')
    }, [])
   

    return null
}

export default redirect;