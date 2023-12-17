'use client'

import Image from 'next/image';
import styles from './ShareButton.module.scss'

function ShareButton({openSocials} : {openSocials : () => void}) {
    return (
        <div className={styles.shareButton} onClick={() => openSocials()}>
            <Image src={'/icons/share-icon.svg'} width={17} height={17} alt={'Share Button'} />
        </div>
    );
}

export default ShareButton;