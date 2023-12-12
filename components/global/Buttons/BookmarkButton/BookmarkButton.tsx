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
            <svg width="17" height="21" viewBox="0 0 17 21" fill={isActive ? '#F4801C' : 'none'} xmlns="http://www.w3.org/2000/svg">
                <path d="M1.74805 6.4475C1.74805 4.82629 1.74805 4.01569 2.06355 3.39647C2.34108 2.85179 2.78392 2.40895 3.3286 2.13143C3.94782 1.81592 4.75842 1.81592 6.37962 1.81592H10.6252C12.2464 1.81592 13.057 1.81592 13.6763 2.13143C14.2209 2.40895 14.6638 2.85179 14.9413 3.39647C15.2568 4.01569 15.2568 4.82629 15.2568 6.4475V19.1843L8.50243 15.3247L1.74805 19.1843V6.4475Z" stroke={isActive ? '#F4801C' : '#161C36'} stroke-width="1.98" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    );
}

export default BookmarkButton;