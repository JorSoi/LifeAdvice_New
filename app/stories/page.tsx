'use client'

import BottomSheet from "@/components/global/BottomSheet/BottomSheet";
import CommentLogicWrapper from "@/components/global/Comments/CommentLogicWrapper/CommentLogicWrapper";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import Overlay from "@/components/global/Overlay/Overlay";
import TextArea from "@/components/global/TextArea/TextArea";
import SocialShareList from "@/components/pages/Home/SocialShareList/SocialShareList";

function Stories() {

    const handleClosure = () => {
        console.log('first')
    }

    return (
        <div>
            <MenuBar page={'stories'} />
            <Overlay isOpen={true} closeOverlayFunction={handleClosure}>
                <BottomSheet title="Share this lesson">
                    <SocialShareList />
                </BottomSheet>
            </Overlay>
        </div>
    );
}

export default Stories;