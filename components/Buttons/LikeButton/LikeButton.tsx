'use client'

import Image from 'next/image';
import styles from './LikeButton.module.scss'
import { useState } from 'react';

function LikeButton() {

    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={isActive ? `${styles.likeButton} ${styles.active}` : styles.likeButton} onClick={handleClick}>
            <Image src={`/icons/like-icon${isActive ? '-active' : ''}.svg`} width={20} height={20} alt={'Like Button'} />
        </div>
    );
}

export default LikeButton;