'use client'

import styles from './LessonList.module.scss'
import LessonItem from '../../Home/LessonItem/LessonItem';
import { useEffect, useState } from 'react';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { Lesson } from '@/types/home.types';

function LessonList({user} : {user: any}) {

    const [lessonList, setLessonList] = useState<Lesson[]>([])
    const [selected, setSelected] = useState< 'bookmarked' | 'liked' | 'created'>('bookmarked')

    const supabase = supabaseBrowserClient();



    useEffect(() => {
        const getBookmarkedLessons = async () => {
            const {data, error} = await supabase.from('lesson_bookmarked_by').select(`*, lessons(*, categories(*))`).eq('profile_id', user.id).order('created_at', { ascending: false })
            if(!error) {
                //Changing data output into lessonList format
                const lessonArray = data.map((item) => {
                    return item.lessons
                })
                setLessonList(lessonArray)
                console.log(lessonArray)
            }
        }
        getBookmarkedLessons();
    }, [])

    return (
        <div className={styles.lessonList}>
            <h3 className={styles.listTitle}>{selected == 'bookmarked' ? 'Bookmarked' : selected == 'liked' ? 'Liked' : 'Created'} Lessons</h3>
            <div className={styles.listWrapper}>
                {
                    lessonList?.map((lesson, index) => {
                    return (
                        <div className={styles.lessonContainer}>
                            <LessonItem lesson={lesson} index={index} removeLessonFromList={() => {}} user={user} draggable={false}/>
                        </div>
                    )
                    })
                }
            </div>
        </div>
    );
}

export default LessonList;