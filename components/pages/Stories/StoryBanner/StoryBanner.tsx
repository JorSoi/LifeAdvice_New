

import Image from 'next/image';
import styles from './StoryBanner.module.scss'

function StoryBanner() {
    return (
        <div className={styles.storyBanner}>
            <Image className={styles.bannerImage} src={'/banner-icons.png'} width={200} height={200} alt='' />
            <div className={styles.titleWrapper}>
                <h2>Stories are</h2>
                <div className={styles.underlinedText}>
                    <h2>coming soon!</h2>
                    <Image src={'/underline.svg'} width={20} height={20} alt=''/>
                </div>
            </div>
            <p>Stories give you much deeper dives into the life learnings from our community. They evolve around any chapter in life while narrated with the unique perspective from the author. </p>

            <Image className={styles.bannerDecorationLeft} src={'/banner-decoration-fade-left.svg'} width={200} height={200} alt='' />
            <Image className={styles.bannerDecorationRight} src={'/banner-decoration-fade-right.svg'} width={200} height={200} alt='' />
        </div>
    );
}

export default StoryBanner;