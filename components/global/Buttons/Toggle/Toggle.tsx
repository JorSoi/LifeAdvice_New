'use client'

import styles from './Toggle.module.scss'
import { useEffect, useState } from 'react';

function Toggle({ onEnable, onDisable, defaultState} : {onEnable : () => void, onDisable : () => void, defaultState : boolean | undefined}) {
    const [enabled, setEnabled] = useState<boolean>(false);

    const handleClick = () => {
        if(enabled) {
            onDisable(); //Runs function which has been passed to the "onDisable" prop.
            setEnabled(false)
        } else {
            onEnable(); //Runs function which has been passed to the "onEnable" prop.
            setEnabled(true)
        }
    }

    useEffect(() => {
        defaultState ? setEnabled(defaultState) : null;

    }, [defaultState])

    return (
        <label className={styles.toggleWrapper}>
            <input type={'checkbox'} checked={enabled} onClick={handleClick} readOnly/>
            <span className={`${styles.toggle} ${enabled ? styles.active : null}`}></span>
        </label>
    );
}

export default Toggle;