'use client'

import { useRef, useState } from "react";
import styles from './PageContainer.module.scss'
import PageHeading from "../PageHeading/PageHeading"
import getCurrentRootURL from "@/lib/getCurrentRootURL";



// This PageContainer is the root element for each page. Any of the page's content is put into the PageContainer's "contentContainer". Thus, the raw page-layout styling is condensed into this single file. It also enables controlling the pageHeader's visibility, which comes especially handy when both pageHeader and contentContainer overlap whenever pagescroll is enabled.
function PageContainer({scrollEnabled, children} : {scrollEnabled : boolean, children : React.ReactNode}) {

    const [isPageHeaderVisible, setIsPageHeaderVisible] = useState<boolean>(true);
    const pageContainerRef = useRef<HTMLDivElement>(null);
    console.log(getCurrentRootURL())

    const handleScroll = () => {
        if (!pageContainerRef.current) return;

        const distanceScrolled : number = pageContainerRef.current.scrollTop

        if(distanceScrolled > 35) {
            setIsPageHeaderVisible(false)
        }  else {
            setIsPageHeaderVisible(true)
        }
    }

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