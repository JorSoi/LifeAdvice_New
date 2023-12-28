import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Profile.module.scss'
import ProfileCard from "@/components/pages/Profile/ProfileCard/ProfileCard";
import LessonList from "@/components/pages/Profile/LessonList/LessonList";
import supabaseServerClient from "@/lib/supabaseServerClient";

async function Profile() {

    const supabase = supabaseServerClient();

    const {data:{user}, error} = await supabase.auth.getUser();

    return (
        <div className={styles.profile}>
            <div className={styles.profileContainer}>
                <ProfileCard />
                <LessonList user={user}/>
            </div>
            <MenuBar page={'profile'} />
        </div>
    );
}

export default Profile;