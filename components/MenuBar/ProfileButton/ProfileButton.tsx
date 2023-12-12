'use client'

import Image from 'next/image';
import styles from './ProfileButton.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';

function ProfileButton ({isActive} : {isActive : boolean}) {

    return (
        <div className={`${styles.profile} ${isActive ? styles.active : null}`}>
            <Image src={'/space-avatar.svg'} width={25} height={25} alt='User Avatar' />
        <p>Profile</p>
    </div>
    );
}

export default ProfileButton;