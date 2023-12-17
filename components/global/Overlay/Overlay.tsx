'use client'

import { useEffect, useState } from 'react';
import styles from './Overlay.module.scss'

function Overlay({children, isOpen, closeOverlayFunction} : {children : React.ReactNode, isOpen : boolean, closeOverlayFunction : () => void }) {
    
    //Calls the a function which is inserted by the parent component so that the parent component is in full control of when to open or close an overlay.
    const handleClick = () => {
        closeOverlayFunction()
    }

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.opened : styles.closed}`}>
            <div className={styles.clickableSpace} onClick={handleClick}></div>
            {children}
        </div>
    );
}

export default Overlay;