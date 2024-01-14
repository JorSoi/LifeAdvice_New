'use client'

import { useEffect, useState } from "react";
import { OverlayContext } from "@/lib/contexts";
import AuthLogicWrapper from "../Authentication/AuthLogicWrapper/AuthLogicWrapper";
import AvatarList from "@/components/pages/Profile/AvatarList/AvatarList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import CommentLogicWrapper from "../Comments/CommentLogicWrapper/CommentLogicWrapper";
import SocialShareList from "@/components/pages/Home/SocialShareList/SocialShareList";
import GeneralSettings from "@/components/pages/Profile/ProfileSettings/GeneralSettings/GeneralSettings";
import BottomSheetContainer from "../BottomSheetNew/BottomSheetContainer";
import { OverlayNames } from "@/types/home.types";


// This component wraps around the entire application. Calling openOverlay(name) from the context anywhere within the application will open the requested Overlay without the need for extensive prop-drilling.
function OverlayContextProvider({children} : { children: React.ReactNode }) {

    const [overlayName, setOverlayName] = useState<OverlayNames>('');
    const [user, setUser] = useState<any>();
    const [lessonId, setLessonId] = useState<number>(-1);

    const supabase = supabaseBrowserClient();

    const openOverlay = (name : OverlayNames, lessonId : number = 0) : void  => {
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

            <BottomSheetContainer isOpen={overlayName == 'authentication'} title="Welcome to LifeAdvice">
                <AuthLogicWrapper />
            </BottomSheetContainer>

            <BottomSheetContainer isOpen={overlayName == 'comments'} title="Comments">
                <CommentLogicWrapper lessonId={lessonId} />
            </BottomSheetContainer>

            <BottomSheetContainer isOpen={overlayName == 'general-settings'} title="General settings">
                <GeneralSettings user={user} />
            </BottomSheetContainer>

            <BottomSheetContainer isOpen={overlayName == 'socials'} title="Share this lesson">
                <SocialShareList lessonId={lessonId} />
            </BottomSheetContainer>

            <BottomSheetContainer isOpen={overlayName == 'avatars'} title="Choose you avatar">
                <AvatarList user={user} />
            </BottomSheetContainer>

        </OverlayContext.Provider>
    );
}

export default OverlayContextProvider;