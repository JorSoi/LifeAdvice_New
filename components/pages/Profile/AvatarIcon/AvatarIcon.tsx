'use client'

import styles from './AvatarIcon.module.scss'
import Image from 'next/image';
import { Avatar } from '@/types/home.types';

function AvatarIcon({avatar, isActive, selectAvatar} : {avatar: Avatar, isActive : boolean, selectAvatar: (param : number) => void} ) {

    //clicking on an avatarItem will highlight it.
    const handleClick = () => {
        selectAvatar(avatar.id);
    }


    return (
        <div className={`${styles.avatarIcon} ${isActive ? styles.active : null}`} onClick={handleClick}>
            <Image src={avatar.avatar_url} width={60} height={60} alt='' priority={true} />
            <p>{avatar.avatar_name}</p>
        </div>
    );
}

export default AvatarIcon;