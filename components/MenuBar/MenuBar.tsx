import ExploreButton from './ExploreButton/ExploreButton';
import styles from './MenuBar.module.scss'
import { PageOptions } from '@/types/home.types';
import TopicButton from './TopicButton/TopicButton';
import StoryButton from './StoryButton/StoryButton';
import ProfileButton from './ProfileButton/ProfileButton';
import LessonButton from './LessonButton/LessonButton';

function MenuBar({page} : {page : PageOptions}) {
    return (
        <div className={styles.menuBar}>
            <ExploreButton isActive={page == 'explore'} />
            <TopicButton isActive={page == 'topics'} />
            <LessonButton />
            <StoryButton isActive={page == 'stories'} />
            <ProfileButton isActive={page == 'profile'} />
        </div>
    );
}

export default MenuBar;