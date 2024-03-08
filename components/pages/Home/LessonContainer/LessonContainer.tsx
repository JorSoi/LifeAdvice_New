'use client'

import styles from "./LessonContainer.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Lesson } from "@/types/home.types";
import LessonItem from "../LessonItem/LessonItem";


function LessonContainer({category_id} : {category_id? : number}) {

    const [lessonList, setLessonList] = useState<Lesson[]>([])
    const [user, setUser] = useState<{} | null>(null);
    const [hasSeenSpotlightedLesson, setHasSeenSpotlightedLesson] = useState(false);
    const spotlight_lesson_id : number  | undefined = typeof window !== 'undefined' && window.location.hash ? Number(window.location.hash.split('=')[1]) : undefined;
    const supabase = supabaseBrowserClient();

    const getLessons = async (category_id? : number) => {
        if(!category_id) {
            //Fetch random lessons
            const {data, error} = await supabase.rpc('get_random_lessons')
            if(!error) {
                setLessonList((prev) : any => [...data, ...prev]);
            } else {
                console.log(error)
            }
        } else {
            //Only fetch lessons from specified category
            const {data, error} = await supabase.rpc('get_random_lessons_by_category', {category_id})
            if(!error) {
                data.length !== 0 ? setLessonList((prev) : any => [...data, ...prev]) : null;
            } else {
                console.log(error)
            }
        }

        if(spotlight_lesson_id && !hasSeenSpotlightedLesson) {
            //Fetch specific lesson to be on top of the rest if its mentioned in the url params
            const {data, error} = await supabase.from('lessons').select(`*, categories(*), profiles(user_name)`).eq('id', spotlight_lesson_id).single();
            if(!error) {
                setLessonList((prev) : any => [...prev, data]);
                setHasSeenSpotlightedLesson(true)
            } else {
                console.log(error)
            }
        }
    }


    //Called after lesson has been swiped
    const removeLessonFromList = (idToRemove : number) : void => {
        const updatedList = lessonList.filter((lesson, index, array) : boolean => {
            return index !== array.findLastIndex(el => el.id == idToRemove)
        })
        setLessonList(updatedList); // Update the state with the new array
    }

    //Always append new lessons to lessonList, if its length is lower than 3
    useEffect(() => {
        if(lessonList.length < 3) {
            getLessons(category_id);
        }
        
        console.log(lessonList)

    }, [lessonList])

    useEffect(() => {
        const getUser = async () => {
          const {data: {user}, error} = await supabase.auth.getUser();
          if(!error) {
              setUser(user)
          } else {
              console.log(error)
          }
      }
      getUser();
      }, [])

    return (
        <div className={styles.lessonContainer}>
            {
                    //Last items of lessonList will always be seen first, since we want to take advantage of the default z-index behavior (lowest item in the list has higher z-index prio).
                    lessonList.map((lesson, i) => {
                        let isDraggable : boolean;

                        //Only the top-item of the stack is swipeable. Swiping is shortly disabled, when new lessons are fetched to prevent swiping the wrong lesson before lessonList is again populated with the new lesson items.
                        if(i == lessonList.length-1 && lessonList.length >= 3) {
                            isDraggable = true;
                        } else {
                            isDraggable = false;
                        }
                        
                        return <LessonItem key={i} lesson={lesson} index={i} removeLessonFromList={removeLessonFromList} user={user} isDraggable={isDraggable} />
                    }) 
                }
            
            {lessonList.length > 0 && <div className={styles.bgCard}></div>} 

        </div>
    );
}

export default LessonContainer;