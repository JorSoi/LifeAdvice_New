'use client'

import styles from './AuthLogicWrapper.module.scss'
import IntroductionScreen from '../IntroductionScreen/IntroductionScreen';
import SignInForm from '../SignInForm/SignInForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { useState } from 'react';
import ResetPasswordForm from '../RestPasswordForm/ResetPasswordForm';

function AuthLogicWrapper() {

    const [path, setPath] = useState<'intro' | 'signIn' | 'register' | 'passwordReset'>('intro')

    const navigateToRegistration = () => {
        setPath('register')
    }

    const navigateToIntro = () => {
        setPath('intro')
    }

    const navigateToSignIn = () => {
        setPath('signIn')
    }

    const navigateToPasswordReset = () => {
        setPath('passwordReset')
    }

    //Object is passed to components so that they can choose which navigation to invoke.
    const authNavigation = {
        navigateToIntro,
        navigateToRegistration,
        navigateToSignIn,
        navigateToPasswordReset
    }


    return (
        <div className={styles.authLogicWrapper}>
            {path == 'intro' && <IntroductionScreen authNavigation={authNavigation}/>}
            {path == 'signIn' && <SignInForm authNavigation={authNavigation} />}
            {path == 'register' && <RegistrationForm authNavigation={authNavigation} />}
            {path == 'passwordReset' && <ResetPasswordForm authNavigation={authNavigation} />}
        </div>
    );
}

export default AuthLogicWrapper;