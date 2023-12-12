'use client'

import Image from 'next/image';
import styles from './ShareButton.module.scss'

function ShareButton() {
    return (
        <div className={styles.shareButton}>
            <Image src={'/icons/share-icon.svg'} width={17} height={17} alt={'Share Button'} />

        </div>
    );
}

export default ShareButton;