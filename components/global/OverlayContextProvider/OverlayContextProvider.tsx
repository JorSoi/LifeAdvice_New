'use client'

import { useEffect, useState } from "react";
import { OverlayContext } from "@/lib/contexts";
import Overlay from "../Overlay/Overlay";
import BottomSheet from "../BottomSheet/BottomSheet";
import AuthLogicWrapper from "../Authentication/AuthLogicWrapper/AuthLogicWrapper";
import AvatarList from "@/components/pages/Profile/AvatarList/AvatarList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import CommentLogicWrapper from "../Comments/CommentLogicWrapper/CommentLogicWrapper";
import SocialShareList from "@/components/pages/Home/SocialShareList/SocialShareList";
import GeneralSettings from "@/components/pages/Profile/ProfileSettings/GeneralSettings/GeneralSettings";


// This component wraps around the entire application. Calling openOverlay(name) from the context anywhere within the application will open the requested Overlay without the need for extensive prop-drilling.
function OverlayContextProvider({children} : { children: React.ReactNode }) {

    const [overlayName, setOverlayName] = useState<string>('');
    const [user, setUser] = useState<any>();
    const [lessonId, setLessonId] = useState<number>(-1);

    const supabase = supabaseBrowserClient();

    const openOverlay = (name : string, lessonId : number = 0) : void  => {
        setLessonId(lessonId);
        setOverlayName(name)
    }

    const closeOverlay = () => {
        setOverlayName('');
        setLessonId(-1); //using -1 to ensure that all comments unmount when closing the overlay.
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
        <OverlayContext.Provider value={{openOverlay: openOverlay, closeOverlay: closeOverlay}}>
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

            <Overlay isOpen={overlayName == 'comments'} closeOverlayFunction={closeOverlay}>
                <BottomSheet title='Comments'>
                    <CommentLogicWrapper lessonId={lessonId}/>
                </BottomSheet>
            </Overlay>

            <Overlay isOpen={overlayName == 'socials'} closeOverlayFunction={closeOverlay}>
                <BottomSheet title="Share this lesson">
                    <SocialShareList lessonId={lessonId}/>
                </BottomSheet>
            </Overlay>

            <Overlay isOpen={overlayName == 'general-settings'} closeOverlayFunction={closeOverlay}>
                <BottomSheet title="General Settings">
                    <GeneralSettings user={user} />
                </BottomSheet>
            </Overlay>
        </OverlayContext.Provider>
    );
}

export default OverlayContextProvider;