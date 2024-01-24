'use client'

import { useRef, useState } from "react";
import { LogoVisibilityContext } from "@/lib/contexts";
import LogoHeading from "../LogoHeading/LogoHeading";
import SettingsButton from "@/components/pages/Profile/SettingsButton/SettingsButton";
import styles from './LogoVisibilityContextProvider.module.scss'



// This ContextProvider wraps aroud the entire application to give each component the option to control the visibility state of the top-fixed title when scrolling. This helps prevent the fixed header and its buttons to weirdly overlap with the scrolled elements.
function LogoVisibilityContextProvider({children} : {children : React.ReactNode}) {

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const distanceScrolled : number = containerRef.current.scrollTop
        if(distanceScrolled > 45) {
            setIsVisible(false)
        }  else {
            setIsVisible(true)
        }
    }

    return (
            <div ref={containerRef} className={styles.wrapper} onScroll={handleScroll}>
                <div className={`${styles.logoHeading} ${isVisible ? null : styles.hidden}`}>
                    <LogoHeading />
                    <SettingsButton />
                </div>
                <div  className={styles.scrollContainer}>
                {children}
                </div>
            </div>
    );
}

export default LogoVisibilityContextProvider;