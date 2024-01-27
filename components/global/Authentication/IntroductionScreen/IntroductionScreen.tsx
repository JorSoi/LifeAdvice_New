'use client'

import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import styles from './IntroductionScreen.module.scss'
import Image from 'next/image';

function IntroductionScreen({authNavigation} : {authNavigation : any}) {

    const supabase = supabaseBrowserClient();

    const handleGoogleClick = async () => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        console.log(data, error)
    }

    return (
        <div className={styles.introductionScreen}>
            <Image src={'/registration-banner.webp'} className={styles.introductionBanner} width={200} height={200} alt='' priority={true} />
            <button className={styles.googleButton} onClick={handleGoogleClick}>
                <Image src={'/social-logos/google-logo.svg'} className={styles.googleLogo} width={20} height={20} alt='' priority={true} />
                Continue with Google
            </button>
            <button className={styles.emailButton} onClick={authNavigation.navigateToSignIn}>Log In with Email</button>
            <p className={styles.register} onClick={authNavigation.navigateToRegistration}>Don't have an account? <span>Register</span></p>
        </div>
    );
}

export default IntroductionScreen;