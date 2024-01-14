'use client'

import { useState } from 'react';
import SettingsOverview from '../SettingsOverview/SettingsOverview';
import styles from './GeneralSettings.module.scss'
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import { settingsNavigation } from '@/types/home.types';
import NotificationForm from '../NotificationForm/NotificationForm';
import ResetPasswordForm from '@/components/global/Authentication/RestPasswordForm/ResetPasswordForm';

function GeneralSettings({user} : { user : any }) {

    const [path, setPath] = useState<'settings-overview' | 'feedback-form' | 'notifications' | 'password-change'>('settings-overview')

    const navigateToOverview = () : void => {
        setPath('settings-overview')
    }

    const navigateToFeedbackForm = () : void => {
        setPath('feedback-form')
    }

    const navigateToNotifications = () : void => {
        setPath('notifications')
        console.log('hello navigate')
    }

    const navigateToPasswordChange = () : void => {
        setPath('password-change')
    }

    //Object is passed to components so that they can choose which navigation to invoke.
    const settingsNavigation : settingsNavigation = {
        navigateToOverview,
        navigateToFeedbackForm,
        navigateToNotifications,
        navigateToPasswordChange,
    }

    return (
        <div className={styles.generalSettings}>
            {path == 'settings-overview' && <SettingsOverview settingsNavigation={settingsNavigation}/>}
            {path == 'feedback-form' && <FeedbackForm user={user} settingsNavigation={settingsNavigation}/>}
            {path == 'notifications' && <NotificationForm user={user} settingsNavigation={settingsNavigation}/>}
            {path == 'password-change' && <ResetPasswordForm settingsNavigation={settingsNavigation} user={user.email}/>}
        </div>
    );
}

export default GeneralSettings;