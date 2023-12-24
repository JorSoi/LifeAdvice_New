import Image from 'next/image';
import styles from './Authenticator.module.scss'

function Authenticator() {
    return (
        <div className={styles.authenticator}>
            <Image src={'/registration-banner.webp'} className={styles.registrationBanner} width={360} height={345} alt='' />
            <button className={styles.googleButton}>
                <Image src={'/social-logos/google-logo.svg'} className={styles.googleLogo} width={20} height={20} alt='' />
                Continue with Google
            </button>
            <button className={styles.emailButton}>Sign In with Email</button>
        </div>
    );
}

export default Authenticator;