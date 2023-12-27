'use client'

import { useState } from "react";
import { OverlayContext } from "@/lib/contexts";
import Overlay from "../Overlay/Overlay";
import BottomSheet from "../BottomSheet/BottomSheet";
import AuthLogicWrapper from "../Authentication/AuthLogicWrapper/AuthLogicWrapper";


// This component wraps around the entire application. Calling openOverlay(name) from the context anywhere within the application will open the requested Overlay without the need for extensive prop-drilling.
function OverlayContextProvider({children} : { children: React.ReactNode }) {

    const [overlayName, setOverlayName] = useState<string>('');


    const openOverlay = (name : string): void  => {
        setOverlayName(name)
    }



    const closeOverlay = () => {
        setOverlayName('');
    }

    return (
        <OverlayContext.Provider value={{openOverlay: openOverlay}}>
            {children}
            <Overlay isOpen={overlayName == 'authentication'} closeOverlayFunction={closeOverlay}>
                <BottomSheet>
                    <AuthLogicWrapper />
                </BottomSheet>
            </Overlay>
        </OverlayContext.Provider>
    );
}

export default OverlayContextProvider;