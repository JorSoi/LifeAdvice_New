'use client'

import { useEffect, useState } from "react";
import { OverlayContext } from "@/lib/contexts";
import Overlay from "../Overlay/Overlay";
import BottomSheet from "../BottomSheet/BottomSheet";
import AuthLogicWrapper from "../Authentication/AuthLogicWrapper/AuthLogicWrapper";
import AvatarList from "@/components/pages/Profile/AvatarList/AvatarList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";


// This component wraps around the entire application. Calling openOverlay(name) from the context anywhere within the application will open the requested Overlay without the need for extensive prop-drilling.
function OverlayContextProvider({children} : { children: React.ReactNode }) {

    const [overlayName, setOverlayName] = useState<string>('');
    const [user, setUser] = useState<any>();

    const supabase = supabaseBrowserClient();

    const openOverlay = (name : string): void  => {
        setOverlayName(name)
    }

    const closeOverlay = () => {
        setOverlayName('');
    }

    useEffect(() => {
        const getUser = async () => {
            const {data: {user}, error} = await supabase.auth.getUser();
            if(!error) {
                setUser(user)
            } else {
                console.log(error)
            }
        }
        getUser();
    }, [])

    return (
        <OverlayContext.Provider value={{openOverlay: openOverlay}}>
            {children}
            <Overlay isOpen={overlayName == 'authentication'} closeOverlayFunction={closeOverlay}>
                <BottomSheet>
                    <AuthLogicWrapper />
                </BottomSheet>
            </Overlay>
            <Overlay isOpen={overlayName == 'avatars'} closeOverlayFunction={closeOverlay}>
                <BottomSheet title={'Choose your Avatar'}>
                    <AvatarList user={user}/>
                </BottomSheet>
            </Overlay>
        </OverlayContext.Provider>
    );
}

export default OverlayContextProvider;