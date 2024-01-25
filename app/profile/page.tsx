
import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Profile.module.scss'
import ProfileCard from "@/components/pages/Profile/ProfileCard/ProfileCard";
import LessonList from "@/components/pages/Profile/LessonList/LessonList";
import supabaseServerClient from "@/lib/supabaseServerClient";
import { redirect } from "next/navigation";
import SavedLessonsContextProvider from "@/components/global/SavedLessonsContextProvider/SavedLessonsContextProvider";
import PageContainer from "@/components/global/PageContainer/PageContainer";


async function Profile() {

    const supabase = supabaseServerClient();

    //Unauthed users will immediately be redirected to homepage
    const {data:{user}} = await supabase.auth.getUser();
    if(!user) redirect('/')

    return (
        <PageContainer scrollEnabled={true}>

            <div className={styles.profile}>
                <SavedLessonsContextProvider user={user}>
                    <ProfileCard />
                    <LessonList user={user}/>
                </SavedLessonsContextProvider>
            </div>
            <MenuBar page={'profile'} />

        </PageContainer>
    );
}

export default Profile;