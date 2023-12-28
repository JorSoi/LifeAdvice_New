'use client'

import styles from "./LessonContainer.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Lesson } from "@/types/home.types";
import LessonItem from "../LessonItem/LessonItem";


function LessonContainer() {

    const [lessonList, setLessonList] = useState<Lesson[]>([])
    const [user, setUser] = useState<{} | null>(null);
    const supabase = supabaseBrowserClient();

    const getLessons = async () => {
        const {data, error} = await supabase.from('lessons').select(`*, categories(*)`).limit(10)
        if(!error) {
            setLessonList((prev) => [...data, ...prev]);
        } else {
            console.log(error)
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
            getLessons();
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

    return (
        <div className={styles.lessonContainer}>
            {
                    lessonList.map((lesson, i) => {
                        
                        return <LessonItem lesson={lesson} index={i} removeLessonFromList={removeLessonFromList} user={user} draggable={true} />
                    }) 
                }
            
            {lessonList.length > 0 && <div className={styles.bgCard}></div>} 

        </div>
    );
}

export default LessonContainer;