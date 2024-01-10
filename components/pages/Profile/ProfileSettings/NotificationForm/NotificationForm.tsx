import Image from 'next/image';
import styles from './NotificationForm.module.scss'
import { NotificationPreferences, OverlayContextType, settingsNavigation } from '@/types/home.types';
import BackButton from '@/components/global/Buttons/BackButton/BackButton';
import { useContext, useEffect, useState } from 'react';
import Toggle from '@/components/global/Buttons/Toggle/Toggle';
import { useFormik } from 'formik';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { OverlayContext } from '@/lib/contexts';

function NotificationForm({user, settingsNavigation} : {user : any, settingsNavigation : settingsNavigation}) {

    const [preferences, setPreferences] = useState<NotificationPreferences>(); //current notification preferences.
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const supabase = supabaseBrowserClient();
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'posts': {
                'likes': preferences?.posts.likes,
                'replies': preferences?.posts.replies,
                'bookmarked': preferences?.posts.bookmarked,
            },
            'other': {
                'weekly_lesson': preferences?.other.weekly_lesson,
                'monthly_story': preferences?.other.monthly_story,
            },
        },
        onSubmit: async () : Promise<void> => {
            setIsLoading(true)
            const {data, error} = await supabase.from('profiles').update({notification_preferences: formik.values}).eq('id', user.id)
            if(!error) {
                setIsLoading(false);
                closeOverlay();
                settingsNavigation.navigateToOverview() //necessary to not show this when reopening settings
            }
        }
    })

    //Retrieve preferences and store it to state which will be consumed by formik.initialValues
    useEffect(() => {
        const getNotificationPreferences = async () => {
            const {data : {notification_preferences}, error} : any = await supabase.from('profiles').select('notification_preferences').eq('id', user.id).single();
            if(!error) {
                setPreferences(notification_preferences)
            }
        }

        getNotificationPreferences();
    }, [])
    

    return (
        <form className={styles.notificationForm} onSubmit={formik.handleSubmit}>
            <div className={styles.notificationWrapper}>

                <div className={styles.notificationSection}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.icon}>
                            <Image src={'/icons/profile-settings/notification-text.svg'} width={20} height={20} alt='' />
                        </div>
                        <h3 className={styles.title}>Post Notification</h3>
                    </div>
                    
                    <div className={styles.itemList}>
                        <div className={styles.notificationItem}>
                            <p>Likes received</p>
                            <Toggle onEnable={() => formik.setFieldValue('posts.likes', true)} onDisable={() => formik.setFieldValue('posts.likes', false)} defaultState={formik.values.posts.likes} />
                        </div>
                        <div className={styles.notificationItem}>
                            <p>Comments received</p>
                            <Toggle onEnable={() => formik.setFieldValue('posts.replies', true)} onDisable={() => formik.setFieldValue('posts.replies', false)} defaultState={formik.values.posts.replies} />
                        </div>
                        <div className={styles.notificationItem}>
                            <p>Bookmarks set</p>
                            <Toggle onEnable={() => formik.setFieldValue('posts.bookmarked', true)} onDisable={() => formik.setFieldValue('posts.bookmarked', false)} defaultState={formik.values.posts.bookmarked} />
                        </div>
                    </div>
                </div>


                <div className={styles.notificationSection}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.icon}>
                            <Image src={'/icons/profile-settings/notification-box.svg'} width={20} height={20} alt='' />
                        </div>
                        <h3 className={styles.title}>Other Notifications</h3>
                    </div>

                    <div className={styles.itemList}>
                        <div className={styles.notificationItem}>
                            <p>Your lesson of the week</p>
                            <Toggle onEnable={() => formik.setFieldValue('other.weekly_lesson', true)} onDisable={() => formik.setFieldValue('other.weekly_lesson', false)} defaultState={preferences?.other.weekly_lesson} />
                        </div>
                        <div className={styles.notificationItem}>
                            <p>Your monthly story</p>
                            <Toggle onEnable={() => formik.setFieldValue('other.monthly_story', true)} onDisable={() => formik.setFieldValue('other.monthly_story', false)} defaultState={preferences?.other.monthly_story} />
                        </div>
                    </div>
                </div>


                <div className={styles.buttonWrapper}>
                    <BackButton onClick={settingsNavigation.navigateToOverview}/>
                    <button className={styles.submitButton} type='submit'>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                        {!isLoading ? 'Save Preferences' : ''}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NotificationForm;