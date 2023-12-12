'use client'

import styles from "./LessonContainer.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Database } from "@/types/database.types";
import { Lesson } from "@/types/home.types";
import LessonItem from "../LessonItem/LessonItem";





function LessonContainer() {
    const [lessonList, setLessonList] = useState<Lesson[]>([])

    const supabase = supabaseBrowserClient();

    const getLessons = async () => {
        const {data, error} = await supabase.from('lessons').select(`*, categories(*)`).limit(10)
        if(!error) {
            setLessonList(data);
        } else {
            console.log(error)
        }
    }

    const loadMoreLessons = async () => { 
        const {data, error} = await supabase.from('lessons').select('*').limit(10)
        if(!error) {
            setLessonList((prev) => {
                console.log(prev)
                return [...prev, ...data]
            });
        } else {
            console.log(error)
        }
    }



    //Called after lesson has been swiped
    const removeLessonFromList = (idToRemove : number) : void => {
        const updatedList = lessonList.filter(lesson => lesson.id !== idToRemove);
        setLessonList(updatedList); // Update the state with the new array
    }


    useEffect(() => {
        if(lessonList.length == 0) {
            getLessons();
        } else if(lessonList.length <= 3 && lessonList.length != 0) {
            loadMoreLessons();
        }
        
    }, [lessonList])

    return (
        <div className={styles.lessonContainer}>
            {
                    lessonList.map((lesson, i) => {
                        
                        return <LessonItem key={Math.floor(Math.random()*1000000)} data={lesson} zLayer={(lessonList.length-i)} index={i} removeLessonFromList={removeLessonFromList}/>
                    }) 
                }
            
            {lessonList.length > 0 && <div className={styles.bgCard}></div>} 
        </div>
    );
}

export default LessonContainer;