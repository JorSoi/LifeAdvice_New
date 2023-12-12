'use client'

import Image from 'next/image';
import styles from './ProfileButton.module.scss'
import { useRouter } from 'next/navigation';

function ProfileButton ({isActive} : {isActive : boolean}) {

    const router = useRouter();

    const handleClick = () => {
        router.push('/profile')
    }

    return (
        <div className={`${styles.profile} ${isActive ? styles.active : null}`} onClick={handleClick}>
            <Image src={'/space-avatar.svg'} width={25} height={25} alt='User Avatar' priority={true} />
        <p>Profile</p>
    </div>
    );
}

export default ProfileButton;