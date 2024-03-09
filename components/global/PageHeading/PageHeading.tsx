'use client'

import styles from './PageHeading.module.scss'
import SettingsButton from '@/components/pages/Profile/SettingsButton/SettingsButton';
import { PagesNames } from '@/types/home.types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import BuyMeCoffeeButton from '../Buttons/BuyMeCoffeeButton/BuyMeCoffeeButton';

function PageHeading({visible} : {visible : boolean}) {

    const pathName = usePathname();
    const page = pathName.split('/').pop() as PagesNames

    return (
        <div className={`${styles.pageHeading} ${visible ? null : styles.hidden}`}>
            <div className={styles.left}></div>
            <div className={styles.center}>
                <Image className={styles.logo} src={'/logo-light.svg'} width={140} height={40} alt="LifeAdvice" priority={true} />
            </div>
            <div className={styles.right}>
                <BuyMeCoffeeButton />
                {page == 'profile' && <SettingsButton />}
            </div>
    </div>
    )
        
}

export default PageHeading;