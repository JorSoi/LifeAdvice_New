'use client'

import { useEffect, useState } from 'react';
import styles from './Overlay.module.scss'

function Overlay({children, isOpen, closeOverlayFunction} : {children : React.ReactNode, isOpen : boolean, closeOverlayFunction : () => void }) {
    
    //Calls a function which handles the isOpen state on the parent of the overlay, so that the parent can fully decide when to open or close the overlay.
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