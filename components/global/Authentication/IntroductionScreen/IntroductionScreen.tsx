'use client'

import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import styles from './IntroductionScreen.module.scss'
import Image from 'next/image';
import getCurrentRootURL from '@/lib/getCurrentRootURL';

function IntroductionScreen({authNavigation} : {authNavigation : any}) {

    const supabase = supabaseBrowserClient();

    const handleGoogleClick = async () => {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${getCurrentRootURL()}/redirect`,
            }
        })

        console.log(data, error)
    }

    return (
        <div className={styles.introductionScreen}>
            <div className={styles.introductionBanner}>
                <Image className={styles.bannerImage} src={'/banner.webp'} width={200} height={200} alt='' priority={true} />
                <div className={styles.titleWrapper}>
                    <h2>Grow together with</h2>
                    <div className={styles.secondRow}>
                        <h2>this</h2>
                        <div className={styles.underlinedText}>
                            <h2>community!</h2>
                            <Image src={'/underline.svg'} width={20} height={20} alt=''/>
                        </div>
                    </div>
                </div>
                <p>Your place to learn and share bite-sized personal lessons, experiences and advices with souls from all over the world.</p>

                <Image className={styles.bannerDecorationLeft} src={'/banner-decoration-fade-left.svg'} width={200} height={200} alt='' />
                <Image className={styles.bannerDecorationRight} src={'/banner-decoration-fade-right.svg'} width={200} height={200} alt='' />
            </div>
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