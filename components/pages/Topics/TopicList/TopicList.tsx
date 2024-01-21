import Link from 'next/link';
import styles from './TopicList.module.scss'
import CategoryIcon from '@/components/global/CategoryIcon/CategoryIcon';
import Image from 'next/image';

function TopicList() {
    return (
        <div className={styles.topicList}>
            <Link href={'/topics/love'}>
                <div className={`${styles.card} ${styles.love}`}>
                    <h2>Love and Relationships</h2>
                    <Image src={'/topic-banners/love.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Love'} />

                </div>
            </Link>
            <Link href={'/topics/friendship'}>
                <div className={`${styles.card} ${styles.friendship}`}>
                    <h2>Friendships and Socials</h2>
                    <Image src={'/topic-banners/friendship.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Friendship'} />

                </div>
            </Link>
            <Link href={'/topics/mental-health'}>
                <div className={`${styles.card} ${styles.mental}`}>
                    <h2>Mental Health and Mindset</h2>
                    <Image src={'/topic-banners/mental-health.svg'} width={100} height={100} alt=''/>
                    <CategoryIcon categoryName={'Mental-health'} />

                </div>
            </Link>
            <Link href={'/topics/business'}>
                <div className={`${styles.card} ${styles.business}`}>
                    <h2>Business and Work</h2>
                    <Image src={'/topic-banners/business.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Business'} />

                </div>
            </Link>
            <Link href={'/topics/education'}>
                <div className={`${styles.card} ${styles.education}`}>
                    <h2>Education and Knowledge</h2>
                    <Image src={'/topic-banners/education.svg'} width={110} height={110} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Education'} />

                </div>
            </Link>
            <Link href={'/topics/travel'}>
                <div className={`${styles.card} ${styles.travel}`}>
                    <h2>Travel and Adventures</h2>
                    <CategoryIcon categoryName={'Travel'} />
                    <Image src={'/topic-banners/travel.svg'} width={100} height={100} priority={true} alt=''/>
                </div>
            </Link>
            <Link href={'/topics/fitness'}>
                <div className={`${styles.card} ${styles.fitness}`}>
                    <h2>Fitness and Health</h2>
                    <Image src={'/topic-banners/fitness.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Fitness'} />

                </div>
            </Link>
            <Link href={'/topics/other'}>
                <div className={`${styles.card} ${styles.other}`}>
                    <h2>Other Advices and Lessons</h2>
                    <Image src={'/topic-banners/other.svg'} width={100} height={100} alt=''/>
                    <CategoryIcon categoryName={'Other'} />

                </div>
            </Link>

        </div>
    );
}

export default TopicList;