'use client'

import { useContext } from 'react';
import styles from './LogoHeading.module.scss'
import Image from "next/image";
import { LogoVisibilityContext } from '@/lib/contexts';
import { LogoVisibilityContextType } from '@/types/home.types';

function LogoHeading() {

    return (

            <Image className={styles.logo} src={'./logo-light.svg'} width={140} height={40} alt="LifeAdvice" priority={true} />

    )
        
        
}

export default LogoHeading;