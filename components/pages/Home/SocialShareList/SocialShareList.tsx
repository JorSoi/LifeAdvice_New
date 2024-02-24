
import styles from './SocialShareList.module.scss'
import SocialItem from '../SocialItem/SocialItem';
import Image from 'next/image';
import getCurrentRootURL from '@/lib/getCurrentRootURL';

function SocialShareList( {lessonId} : { lessonId : number }) {


    const shareOptions = [
        {
            type: 'whatsapp',
            url: `whatsapp://send?text=Take a look at my referral codes using this link: ${getCurrentRootURL()}#lesson=${lessonId}`,
        },
        {
            type: 'facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u&quote=Take a look at my referral codes using this link: ${getCurrentRootURL()}#lesson=${lessonId}`,
        },
        {
            type: 'reddit',
            url: ``,
        },
        {
            type: 'twitter',
            url: `http://twitter.com/share?text=Check out this lesson which I have learned here: &url=${getCurrentRootURL()}#lesson=${lessonId}&hashtags=lessonsForLife,learn,personalGrowth`,
        },
        {
            type: 'discord',
            url: ``,
        },
        {
            type: 'messenger',
            url: `fb-messenger://share/?link=${getCurrentRootURL()}#lesson=${lessonId}`,
        },
        {
            type: 'telegram',
            url: `https://telegram.me/share/url?url=${getCurrentRootURL()}#lesson=${lessonId}&text=Check out this lesson from LifeAdvice`,
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
                <input className={styles.clipBar} type='text' onChange={() => {}} value={`${getCurrentRootURL()}#lesson=${lessonId}`} />
                <Image src={'/icons/copy-icon.svg'} width={20} height={20} alt=''/>
            </div>
        </>
    );
}

export default SocialShareList;