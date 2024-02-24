import Link from 'next/link';
import styles from './TopicList.module.scss'
import CategoryIcon from '@/components/global/CategoryIcon/CategoryIcon';
import Image from 'next/image';

function TopicList() {

    //Cards are hardcoded with their respective category_id which is not best practice and needs to be refactored.
    return (
        <div className={styles.topicList}>
            <Link href={'topics/1'}>
                <div className={`${styles.card} ${styles.love}`}>
                    <h2>Love and Relationships</h2>
                    <Image src={'/topic-banners/love.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Love'} />

                </div>
            </Link>
            <Link href={'topics/2'}>
                <div className={`${styles.card} ${styles.friendship}`}>
                    <h2>Friendships and Socials</h2>
                    <Image src={'/topic-banners/friendship.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Friendship'} />

                </div>
            </Link>
            <Link href={'/topics/3'}>
                <div className={`${styles.card} ${styles.mental}`}>
                    <h2>Mental Health and Mindset</h2>
                    <Image src={'/topic-banners/mental-health.svg'} width={100} height={95} alt=''/>
                    <CategoryIcon categoryName={'Mental-health'} />

                </div>
            </Link>
            <Link href={'topics/4'}>
                <div className={`${styles.card} ${styles.business}`}>
                    <h2>Business and Work</h2>
                    <Image src={'/topic-banners/business.svg'} width={110} height={80} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Business'} />

                </div>
            </Link>
            <Link href={'topics/5'}>
                <div className={`${styles.card} ${styles.education}`}>
                    <h2>Education and Knowledge</h2>
                    <Image src={'/topic-banners/education.svg'} width={112} height={90} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Education'} />

                </div>
            </Link>
            <Link href={'topics/6'}>
                <div className={`${styles.card} ${styles.travel}`}>
                    <h2>Travel and Adventures</h2>
                    <Image src={'/topic-banners/travel.svg'} width={110} height={110} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Travel'} />
                </div>
            </Link>
            <Link href={'topics/7'}>
                <div className={`${styles.card} ${styles.fitness}`}>
                    <h2>Fitness and Health</h2>
                    <Image src={'/topic-banners/fitness.svg'} width={100} height={100} priority={true} alt=''/>
                    <CategoryIcon categoryName={'Fitness'} />

                </div>
            </Link>
            <Link href={'topics/8'}>
                <div className={`${styles.card} ${styles.other}`}>
                    <h2>Other Advices and Lessons</h2>
                    <Image src={'/topic-banners/other.svg'} width={105} height={105} alt=''/>
                    <CategoryIcon categoryName={'Other'} />

                </div>
            </Link>

        </div>
    );
}

export default TopicList;