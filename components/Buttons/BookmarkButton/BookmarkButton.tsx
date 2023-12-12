'use client'

import Image from 'next/image';
import styles from './BookmarkButton.module.scss'
import { useState } from 'react';

function BookmarkButton () {

    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={isActive ? `${styles.bookmarkButton} ${styles.active}` : styles.bookmarkButton} onClick={handleClick}>
            <Image src={`/icons/bookmark-icon${isActive ? '-active' : ''}.svg`} width={20} height={20} alt={'Like Button'} />
        </div>
    );
}

export default BookmarkButton;