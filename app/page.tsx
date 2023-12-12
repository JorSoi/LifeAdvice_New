import CategoryItem from '@/components/CategoryIcon/CategoryItem';
import styles from './Home.module.scss'
import LessonContainer from '@/components/Home/LessonContainer/LessonContainer';
import Toggle from '@/components/Buttons/Toggle/Toggle';
import ShareButton from '@/components/Buttons/ShareButton/ShareButton';
 

function home() {
    
    return (
        <main className={styles.home}>
            {/* <LessonContainer /> */}
            <CategoryItem category={'mental-health'} />
            <CategoryItem category={'business'} />
            <CategoryItem category={'love'} />
            <CategoryItem category={'education'} />
            <CategoryItem category={'fitness'} />
            <CategoryItem category={'other'} />
            <CategoryItem category={'travel'} />
            <br></br>
            <Toggle />
            <br></br>
            <ShareButton />
        </main>
    );
}

export default home;