import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Profile.module.scss'
import ProfileCard from "@/components/pages/Profile/ProfileCard/ProfileCard";
import LessonItem from "@/components/pages/Home/LessonItem/LessonItem";

function Profile() {
    return (
        <div className={styles.profile}>
            <div className={styles.profileContainer}>
                <ProfileCard />
                
            </div>
            <MenuBar page={'profile'} />
        </div>
    );
}

export default Profile;