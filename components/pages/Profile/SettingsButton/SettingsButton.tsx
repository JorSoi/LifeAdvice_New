'use client'

import Image from 'next/image';
import styles from './SettingsButton.module.scss'
import { useContext } from 'react';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';

function SettingsButton() {

    const {openOverlay} = useContext(OverlayContext) as OverlayContextType

    return (
        <div className={styles.settingsButton} onClick={() => openOverlay('general-settings')}>
            <Image src={'/icons/settings-icon.svg'} width={22} height={22} alt='' />
        </div>
    );
}

export default SettingsButton;

