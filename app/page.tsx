import styles from './Home.module.scss'
import LessonContainer from '@/components/Home/LessonContainer/LessonContainer';
 

function home() {
    
    return (
        <main className={styles.home}>
            <LessonContainer />
        </main>
    );
}

export default home;