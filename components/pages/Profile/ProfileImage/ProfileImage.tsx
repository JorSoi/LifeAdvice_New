'use client'

import styles from './ProfileImage.module.scss'
import Image from 'next/image';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';
import { useContext } from 'react';

function Profileimage({avatar_url} : {avatar_url : any}) {

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = () => {
        openOverlay('avatars')
    }

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <Image className={styles.profileImage} src={avatar_url} width={100} height={100} alt='' />
            <button className={styles.editButton} onClick={handleClick}>
                <Image src={'/icons/edit-icon.svg'} width={17} height={17} alt='' />
            </button>
        </div>
    );
}

export default Profileimage;