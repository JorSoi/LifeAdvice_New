import Link from 'next/link';
import styles from './TopicList.module.scss'
import CategoryItem from '@/components/global/CategoryIcon/CategoryIcon';
import Image from 'next/image';

function TopicList() {
    return (
        <div className={styles.topicList}>
            <Link href={'/topic-filter?category=love'}>
                <div className={`${styles.card} ${styles.love}`}>
                    <h2>Love and Relationships</h2>
                    <Image src={'/topic-banners/love.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'love'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=friendship'}>
                <div className={`${styles.card} ${styles.friendship}`}>
                    <h2>Friendships and Socials</h2>
                    <Image src={'/topic-banners/friendship.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'friendship'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=mental-health'}>
                <div className={`${styles.card} ${styles.mental}`}>
                    <h2>Mental Health and Mindset</h2>
                    <Image src={'/topic-banners/mental-health.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'mental-health'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=business'}>
                <div className={`${styles.card} ${styles.business}`}>
                    <h2>Business and Work</h2>
                    <Image src={'/topic-banners/business.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'business'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=education'}>
                <div className={`${styles.card} ${styles.education}`}>
                    <h2>Education and Knowledge</h2>
                    <Image src={'/topic-banners/education.svg'} width={110} height={110} alt=''/>
                    <CategoryItem category={'education'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=travel'}>
                <div className={`${styles.card} ${styles.travel}`}>
                    <h2>Travel and Adventures</h2>
                    <CategoryItem category={'travel'} />
                    <Image src={'/topic-banners/travel.svg'} width={100} height={100} alt=''/>
                </div>
            </Link>
            <Link href={'/topic-filter?category=fitness'}>
                <div className={`${styles.card} ${styles.fitness}`}>
                    <h2>Fitness and Health</h2>
                    <Image src={'/topic-banners/fitness.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'fitness'} />

                </div>
            </Link>
            <Link href={'/topic-filter?category=other'}>
                <div className={`${styles.card} ${styles.other}`}>
                    <h2>Other Advices and Lessons</h2>
                    <Image src={'/topic-banners/other.svg'} width={100} height={100} alt=''/>
                    <CategoryItem category={'other'} />

                </div>
            </Link>

        </div>
    );
}

export default TopicList;