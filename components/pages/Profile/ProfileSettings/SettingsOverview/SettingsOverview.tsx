'use client'

import styles from './SettingsOverview.module.scss'
import Image from 'next/image';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType, settingsNavigation } from '@/types/home.types';

function SettingsOverview({settingsNavigation} : {settingsNavigation : settingsNavigation}) {

    const supabase = supabaseBrowserClient();
    const router = useRouter();

    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType


    const handleSignOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(!error) {
            router.push('/');
            router.refresh();
            closeOverlay();
        } else {
            alert('couldnt sign out:' + error.message)
        }
    }

    return (
        <div className={styles.settingsOverview}>

            <div className={styles.settingsItem} onClick={() => settingsNavigation.navigateToFeedbackForm()}>
                <div className={styles.leftWrapper}>
                    <div className={styles.icon}>
                        <Image src={'/icons/profile-settings/feedback.svg'} width={22} height={22} alt='' priority={true} />
                    </div>
                    <div>
                        <h4 className={styles.itemTitle}>Send Feedback</h4>
                        <p className={styles.itemSubtitle}>Any ideas, wishes and more</p>
                    </div>
                </div>
                <Image className={styles.chevron} src={'/icons/chevron.svg'} width={18} height={18} alt='' priority={true} />
            </div>

            <div className={styles.settingsItem} onClick={() => settingsNavigation.navigateToNotifications()}>
                <div className={styles.leftWrapper}>
                    <div className={styles.icon}>
                        <Image src={'/icons/profile-settings/notifications.svg'} width={22} height={22} alt='' priority={true} />
                    </div>
                    <div>
                        <h4 className={styles.itemTitle}>Notifications</h4>
                        <p className={styles.itemSubtitle}>Adjust your notification settings</p>
                    </div>
                </div>
                <Image className={styles.chevron} src={'/icons/chevron.svg'} width={18} height={18} alt='' priority={true} />
            </div>

            <div className={styles.settingsItem} onClick={() => settingsNavigation.navigateToPasswordChange()}>
                <div className={styles.leftWrapper}>
                    <div className={styles.icon}>
                        <Image src={'/icons/profile-settings/password.svg'} width={24} height={24} alt='' priority={true} />
                    </div>
                    <div>
                        <h4 className={styles.itemTitle}>Reset Password</h4>
                        <p className={styles.itemSubtitle}>Change your credentials here</p>
                    </div>
                </div>
                <Image className={styles.chevron} src={'/icons/chevron.svg'} width={18} height={18} alt='' priority={true} />
            </div>

            <div className={styles.settingsItem} onClick={() => settingsNavigation.navigateToDangerZone()}>
                <div className={styles.leftWrapper}>
                    <div className={`${styles.icon} ${styles.dangerZone}`}>
                        <Image src={'/icons/profile-settings/danger-zone.svg'} width={22} height={22} alt='' priority={true} />
                    </div>
                    <div>
                        <p className={styles.itemTitle}>Danger Zone</p>
                        <p className={styles.itemSubtitle}>See most critical settings</p>
                    </div>
                </div>
                <Image className={styles.chevron} src={'/icons/chevron.svg'} width={18} height={18} alt='' priority={true} />
            </div>

            <button className={styles.signOut} onClick={handleSignOut}>
                Sign Out
                <Image src={'/icons/profile-settings/sign-out-icon.svg'} width={14} height={14} alt='' priority={true} />
            </button>
        </div>
    );
}

export default SettingsOverview;
