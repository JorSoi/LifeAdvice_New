'use client'

import AuthLogicWrapper from "@/components/global/Authentication/AuthLogicWrapper/AuthLogicWrapper";
import Authenticator from "@/components/global/Authentication/AuthLogicWrapper/AuthLogicWrapper";
import IntroductionScreen from "@/components/global/Authentication/IntroductionScreen/IntroductionScreen";
import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import Overlay from "@/components/global/Overlay/Overlay";

async function Stories() {
    

    function test () {
        alert('hi')
    }

    return (
        <Overlay isOpen={true} closeOverlayFunction={test}>
            <BottomSheet title="Sign in with email">
                <AuthLogicWrapper />
            </BottomSheet>
        </Overlay>
   
    );
}

export default Stories;