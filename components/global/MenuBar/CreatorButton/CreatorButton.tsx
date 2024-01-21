'use client'

import { useContext } from 'react';
import styles from './CreatorButton.module.scss'
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';

function CreatorButton({user} : {user : any}) {

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = () => {
        if (!user) {
            openOverlay('authentication')
        } else {
            openOverlay('lesson-creator')
        }
    }

    return (
        <div className={styles.creatorButton} onClick={handleClick}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2V18M2 10H18" stroke="white" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}

export default CreatorButton;