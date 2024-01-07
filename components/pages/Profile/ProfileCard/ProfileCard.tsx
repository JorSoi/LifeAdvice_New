import supabaseServerClient from '@/lib/supabaseServerClient';
import styles from './ProfileCard.module.scss'
import ProfileImage from '../ProfileImage/ProfileImage';
import HistoryButtonWrapper from '../HistoryButtonWrapper/HistoryButtonWrapper';
import getSavedLessonCount from '@/lib/getSavedLessonCount';
import { SavedLessonCount } from '@/types/home.types';
import { formatToMonthAndYear } from '@/lib/formatToMonthAndYear';



async function ProfileCard() {

    const supabase = supabaseServerClient();
    let profileData : any;

    //Fetch data, to enable user_authentication on the profile button.
    const {data: {user}, error} = await supabase.auth.getUser();
    if (!error) {
        const {data} = await supabase.from('profiles').select(`*, avatars(*)`).eq('id', `${user?.id}`).single();
        if(data) {
            profileData = data
        }   
    }
    

    const {bookmarkedCount, likedCount, createdCount} : SavedLessonCount = await getSavedLessonCount(user!.id);


    return (
        <div className={styles.profileCard}>
            <div className={styles.backgroundWrapper}>
                <svg className={styles.profileBackground} viewBox="0 0 370 143" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none'>
                    <g clipPath="url(#clip0_3280_29367)">
                        <path d="M0 12C0 5.37258 5.37258 0 12 0H358C364.627 0 370 5.37258 370 12V112C370 112 261.196 142.5 185 142.5C108.804 142.5 0 112 0 112V12Z" fill={profileData?.avatars?.background_colors?.bubbles}/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M176.02 0H0V112C0 112 9.38346 114.63 24.5689 118.346C24.1953 116.324 24 114.24 24 112.109C24 93.2713 39.2713 78 58.1094 78C76.9475 78 92.2188 93.2713 92.2188 112.109C92.2188 119.358 89.9574 126.079 86.1016 131.605C118.181 137.532 154.246 142.5 185 142.5C226.293 142.5 277.163 133.542 315.103 125.336C311.849 119.352 310 112.494 310 105.203C310 81.895 328.895 63 352.203 63C358.562 63 364.592 64.4063 370 66.9248V0H291.964C283.976 24.3777 261.04 41.9844 233.992 41.9844C206.944 41.9844 184.008 24.3777 176.02 0ZM114.266 30.6328C114.266 40.3711 106.371 48.2656 96.6328 48.2656C86.8945 48.2656 79 40.3711 79 30.6328C79 20.8945 86.8945 13 96.6328 13C106.371 13 114.266 20.8945 114.266 30.6328Z" fill={profileData?.avatars?.background_colors?.banner}/>
                    </g>
                    <defs>
                        <clipPath id="clip0_3280_29367">
                            <rect width="370" height="142.5" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <ProfileImage avatar_url={profileData?.avatars?.avatar_url} />
            </div>
            <div className={styles.userInfo}>
                <h2>{profileData?.user_name}</h2>
                <p>Joined {formatToMonthAndYear(profileData?.created_at)}</p>
            </div>
            <HistoryButtonWrapper bookmarkedCount={bookmarkedCount} likedCount={likedCount} createdCount={createdCount}/>
        </div>
    );
}

export default ProfileCard;