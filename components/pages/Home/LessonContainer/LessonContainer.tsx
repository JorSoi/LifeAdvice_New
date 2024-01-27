'use client'

import styles from "./LessonContainer.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Lesson } from "@/types/home.types";
import LessonItem from "../LessonItem/LessonItem";


function LessonContainer({category_id} : {category_id? : number}) {

    const [lessonList, setLessonList] = useState<Lesson[]>([])
    const [user, setUser] = useState<{} | null>(null);
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
                setLessonList((prev) : any => [...data, ...prev]);
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

      useEffect(() => {
        console.log(lessonList)
      }, [lessonList])

    return (
        <div className={styles.lessonContainer}>
            {
                    lessonList.map((lesson, i) => {
                        
                        return <LessonItem key={i} lesson={lesson} index={i} removeLessonFromList={removeLessonFromList} user={user} draggable={true} />
                    }) 
                }
            
            {lessonList.length > 0 && <div className={styles.bgCard}></div>} 

        </div>
    );
}

export default LessonContainer;