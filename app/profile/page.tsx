
import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Profile.module.scss'
import ProfileCard from "@/components/pages/Profile/ProfileCard/ProfileCard";
import LessonList from "@/components/pages/Profile/LessonList/LessonList";
import supabaseServerClient from "@/lib/supabaseServerClient";
import { redirect } from "next/navigation";
import SavedLessonsContextProvider from "@/components/global/SavedLessonsContextProvider/SavedLessonsContextProvider";
import LogoVisibilityContextProvider from "@/components/global/LogoScrollContextProvider/LogoVisibilityContextProvider";


async function Profile() {

    const supabase = supabaseServerClient();

    //Unauthed users will immediately be redirected to homepage
    const {data:{user}} = await supabase.auth.getUser();
    if(!user) redirect('/')

    return (
        <LogoVisibilityContextProvider>
            
            <div className={styles.profileContainer}>
                <SavedLessonsContextProvider user={user}>
                    <ProfileCard />
                    <LessonList user={user}/>
                </SavedLessonsContextProvider>
            </div>
            <MenuBar page={'profile'} />
        </LogoVisibilityContextProvider>
    );
}

export default Profile;