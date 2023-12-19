'use client'

import Authenticator from "@/components/global/Authenticator/Authenticator";
import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import Overlay from "@/components/global/Overlay/Overlay";
import SocialShareList from "@/components/pages/Home/SocialShareList/SocialShareList";

function Stories() {

    const handleClosure = () => {
        console.log('first')
    }

    return (
        <div>
            <MenuBar page={'stories'} />
            <Overlay isOpen={true} closeOverlayFunction={handleClosure}>
                <BottomSheet title={'Please Sign In'}>
                    <Authenticator />
                </BottomSheet>
            </Overlay>
        </div>
    );
}

export default Stories;