'use client'

import { useState } from 'react';
import styles from './Overlay.module.scss'

function Overlay({children} : {children : React.ReactNode}) {

    const [isClosed, setIsClosed] = useState<boolean>(false);

    const handleClick = () => {
        setIsClosed(true)
    }

    return (
        <div className={styles.overlay} onClick={handleClick}>
            {children}
        </div>
    );
}

export default Overlay;