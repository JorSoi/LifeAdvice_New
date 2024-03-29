import ExploreButton from './ExploreButton/ExploreButton';
import styles from './MenuBar.module.scss'
import { PagesNames } from '@/types/home.types';
import TopicButton from './TopicButton/TopicButton';
import StoryButton from './StoryButton/StoryButton';
import ProfileButton from './ProfileButton/ProfileButton';
import CreatorButton from './CreatorButton/CreatorButton';
import supabaseServerClient from '@/lib/supabaseServerClient';

async function MenuBar({page} : {page : PagesNames}) {

    const supabase = supabaseServerClient();
    let profileData;

    //Fetch data, to enable user_authentication on the profile button.
    const {data: {user}, error} = await supabase.auth.getUser();
    if (!error) {
        const {data} = await supabase.from('profiles').select(`*, avatars(avatar_url)`).eq('id', `${user?.id}`).single();
            profileData = data
    }



    return (
        <div className={styles.menuWrapper}>
            <div className={styles.menuBar}>
                <ExploreButton isActive={page == 'explore'} />
                <TopicButton isActive={page == 'topics'} />
                <CreatorButton user={user} />
                <StoryButton isActive={page == 'stories'} />
                <ProfileButton isActive={page == 'profile'} profileData={profileData}/>
            </div>
        </div>

    );
}

export default MenuBar;