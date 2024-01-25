'use client'

import Image from 'next/image';
import styles from './ShareButton.module.scss'
import { OverlayContext } from '@/lib/contexts';
import { useContext } from 'react';
import { OverlayContextType } from '@/types/home.types';

function ShareButton({lessonId} : {lessonId : number}) {

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = async () => {
        if (navigator.share) {
            try {
              await navigator.share({
                title: 'Share this lesson',
                url: 'https://life-advice-new.vercel.app/'
              });
            } catch (error: any) {
              console.error('Error sharing:', error.message);
            }
          } else {
            // Fallback for browsers that don't support navigator.share
            openOverlay('socials', lessonId)
          }
        
        
    }

    return (
        <div className={styles.shareButton} onClick={handleClick}>
            <Image src={'/icons/share-icon.svg'} width={17} height={17} alt={'Share Button'} />
        </div>
    );
}

export default ShareButton;