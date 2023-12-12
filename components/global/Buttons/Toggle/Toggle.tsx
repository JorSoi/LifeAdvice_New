'use client'

import styles from './Toggle.module.scss'
import { useState } from 'react';

function Toggle() {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={`${styles.toggle}  ${isActive ? styles.active : null}`} onClick={handleClick}>
            <div className={styles.slider}></div>
        </div>
    );
}

export default Toggle;