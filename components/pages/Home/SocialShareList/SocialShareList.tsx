
import styles from './SocialShareList.module.scss'
import SocialItem from '../SocialItem/SocialItem';
import Image from 'next/image';

function SocialShareList() {


    const shareOptions = [
        {
            type: 'whatsapp',
            url: `whatsapp://send?text=Take a look at my referral codes using this link:`,
        },
        {
            type: 'facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u&quote=Take a look at my referral codes using this link:`,
        },
        {
            type: 'reddit',
            url: ``,
        },
        {
            type: 'twitter',
            url: `https://twitter.com/share?text=Take a look at the referral codes from !&url&hashtags=referralcodes`,
        },
        {
            type: 'discord',
            url: ``,
        },
        {
            type: 'messenger',
            url: ``,
        },
        {
            type: 'telegram',
            url: `https://telegram.me/share/url?url&text=Take a look at the referral codes from !`,
        }]

    return (
        <>
            <div className={styles.socialShareList}>
                {
                shareOptions.map((social) => {
                    return <SocialItem key={social.type} type={social.type} url={social.url} />
                })    
                }
            </div>
            <div className={styles.clipBarWrapper}>
                <input className={styles.clipBar} type='text' value={'https://lifeadvice.de?lessonId=9839'} />
                <Image src={'/icons/copy-icon.svg'} width={20} height={20} alt=''/>
            </div>
        </>
    );
}

export default SocialShareList;