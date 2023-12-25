'use client'

import Image from 'next/image';
import styles from './BottomSheet.module.scss'
import { useState } from 'react';

function BottomSheet({children, title} : {children? : React.ReactNode, title? : string}) {

    const [newTitle, setNewTitle] = useState<string | undefined>(title)

    const changeTitle = (value : string) => {
        setNewTitle(value)
    }

    return (
        <div className={styles.bottomSheet}>
            <div className={styles.headingContainer}>
                <div className={styles.gripHandle}></div>
                <div className={styles.titleWrapper}>
                    <h3>{newTitle}</h3>
                    <div className={styles.closeButton}>
                        <Image src={'/icons/closeSheet-icon.svg'} width={12} height={10} alt='' />
                    </div>
                </div>
            </div>
            
            <>
                {children}
            </>
        </div>
    );
}

export default BottomSheet;