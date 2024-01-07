'use client'

import styles from './LessonList.module.scss'
import LessonItem from '../../Home/LessonItem/LessonItem';
import { useEffect, useState, useContext } from 'react';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { Lesson, SavedLessonsContextType } from '@/types/home.types';
import { SavedLessonsContext } from '@/lib/contexts';

function LessonList({user} : {user: any}) {

    const [lessonList, setLessonList] = useState<Lesson[]>([])
    const {selected} = useContext(SavedLessonsContext) as SavedLessonsContextType;

    const supabase = supabaseBrowserClient();


    //Listens to changes in the SavedLessonsContext to populate lessonsList with the correct lessons.
    useEffect(() => {
        if(!user) return;
        
        //Fetch lessons bookmarked by authed user
        const getBookmarkedLessonsByUser = async () : Promise<void> => {
            const {data, error} = await supabase.from('lesson_bookmarked_by').select(`*, lessons(*, categories(*))`).eq('profile_id', user.id).order('created_at', { ascending: false })
            if(!error) {
                setLessonList(() : any =>
                // Changing data output into lessonList format
                data.map((item) => item.lessons)
                );
            }
        }

        //Fetch lessons liked by authed user
        const getLikedLessonsByUser = async () : Promise<void> => {
            const {data, error} = await supabase.from('lesson_upvoted_by').select(`*, lessons(*, categories(*))`).eq('profile_id', user.id).order('created_at', { ascending: false })
            if(!error) {
                setLessonList(() : any =>
                // Changing data output into lessonList format
                data.map((item) => item.lessons)
                );
            }
        }

        //Fetch lessons created by authed user
        const getCreatedLessonsByUser = async () : Promise<void> => {
            const {data, error} = await supabase.from('lessons').select(`*, categories(*)`).eq('profile_id', user.id).order('created_at', { ascending: false })
            if(!error) {
                setLessonList(() : any => data );
            }
        }

        switch(selected) {
            case 'bookmarked':
                getBookmarkedLessonsByUser();
                break;
            case 'liked':
                getLikedLessonsByUser();
                break;
            case 'created':
                getCreatedLessonsByUser();
        }

        console.log(lessonList)
    }, [selected])

    return (
        <div className={styles.lessonList}>
            <h3 className={styles.listTitle}>{selected == 'bookmarked' ? 'Bookmarked' : selected == 'liked' ? 'Liked' : 'Created'} Lessons</h3>
            <div className={styles.listWrapper}>
                {
                    lessonList?.map((lesson, index) => {
                    return (
                        <div className={styles.lessonContainer}>
                            <LessonItem key={lesson.id} lesson={lesson} index={index} removeLessonFromList={() => {}} user={user} draggable={false}/>
                        </div>
                    )
                    })
                }
            </div>
        </div>
    );
}

export default LessonList;