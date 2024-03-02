'use client'

import { useEffect, useRef, useState, useContext } from "react";
import styles from './PageContainer.module.scss'
import PageHeading from "../PageHeading/PageHeading"
import { OverlayContext } from "@/lib/contexts";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { OverlayContextType } from "@/types/home.types";



// This PageContainer is the root element for each page. Any of the page's content is put into the PageContainer's "contentContainer". Thus, the raw page-layout styling is condensed into this single file. It also enables controlling the pageHeader's visibility, which comes especially handy when both pageHeader and contentContainer overlap whenever pagescroll is enabled.
function PageContainer({scrollEnabled, children} : {scrollEnabled : boolean, children : React.ReactNode}) {

    const [isPageHeaderVisible, setIsPageHeaderVisible] = useState<boolean>(true);
    const pageContainerRef = useRef<HTMLDivElement>(null);
    const supabase = supabaseBrowserClient();

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleScroll = () => {
        if (!pageContainerRef.current) return;

        const distanceScrolled : number = pageContainerRef.current.scrollTop

        if(distanceScrolled > 35) {
            setIsPageHeaderVisible(false)
        }  else {
            setIsPageHeaderVisible(true)
        }
    }


    useEffect(() => {
        // Check if user is coming from oAuth and conduct hard refresh to bring all UI components (especially the MenuBar) to the correct state.
        if(Boolean(sessionStorage.getItem('OAuthRedirection'))){
            sessionStorage.removeItem('OAuthRedirection')
            window.location.reload();
        }

        //Check if user has no username yet (when registering with Google) and force user to set username
        const getUserName = async () => {
            const {data : {session}, error} = await supabase.auth.getSession()
            const user = session?.user
            if(!error && user) {
                const {data : profile, error} = await supabase.from('profiles').select().eq('id', user.id).maybeSingle();
                const userName = profile?.user_name;

                if(!userName) openOverlay('user-name-setup');
            } else if (error) {
                console.log(error)
            }
        }
        getUserName();
    }, [])

    return (
            <div ref={pageContainerRef} className={`${styles.pageContainer} ${scrollEnabled ? styles.scrollable : null}`} onScroll={scrollEnabled ? handleScroll : undefined}>

                <PageHeading visible={isPageHeaderVisible}/>

                <div className={`${styles.contentContainer} ${scrollEnabled ? null : styles.centered}`}>
                    {children}
                </div>
            </div>
    );
}

export default PageContainer;