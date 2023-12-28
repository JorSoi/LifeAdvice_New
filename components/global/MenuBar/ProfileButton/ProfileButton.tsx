'use client'

import Image from 'next/image';
import styles from './ProfileButton.module.scss'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';

function ProfileButton ({isActive, profileData} : {isActive : boolean, profileData : any}) {

    const router = useRouter();

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = () => {
        if(profileData) {
            router.push('/profile')
        } else {
            openOverlay('authentication');
        }
    }
    
    return (
        <div className={`${styles.profile} ${isActive && profileData ? styles.active : null}`} onClick={handleClick}>
            {
                profileData ?
                <Image src={profileData.avatars.avatar_url} width={25} height={25} alt='User Avatar' priority={true} />
                :
                <Image src={'/icons/user-icon.svg'} width={23} height={23} alt='User Avatar' priority={true} />
            }
            
            <p>Profile</p>
        </div>
    );
}

export default ProfileButton;