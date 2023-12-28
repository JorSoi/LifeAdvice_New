'use client'

import Image from 'next/image';
import styles from './ShareButton.module.scss'
import { OverlayContext } from '@/lib/contexts';
import { useContext } from 'react';
import { OverlayContextType } from '@/types/home.types';

function ShareButton({lessonId} : {lessonId : number}) {

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = () => {
        openOverlay('socials', lessonId)
    }

    return (
        <div className={styles.shareButton} onClick={handleClick}>
            <Image src={'/icons/share-icon.svg'} width={17} height={17} alt={'Share Button'} />
        </div>
    );
}

export default ShareButton;