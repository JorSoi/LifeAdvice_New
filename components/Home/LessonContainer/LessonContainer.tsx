'use client'

import styles from "./LessonContainer.module.scss"
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { Database } from "@/types/database.types";
import { Lesson } from "@/types/home.types";
import LessonItem from "../LessonItem/LessonItem";



const bgColor : string[] = ["violet", "sand", "green", "purple", "yellow", "sand", "orange", "brown", "grey", "pink"]

function LessonContainer() {
    const [lessonList, setLessonList] = useState<Lesson[]>([])

    const supabase = supabaseBrowserClient();

    const getLessons = async () => {
        const {data, error} = await supabase.from('lessons').select('*').limit(10)
        if(!error) {
            setLessonList(data);
        } else {
            console.log(error)
        }
    }

    const appendLessons = async () => {
        const {data, error} = await supabase.from('lessons').select('*').limit(10)
        if(!error) {
            setLessonList((prev) => [...prev, ...data]);
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
        console.log(lessonList)
        if(lessonList.length <= 3)
        appendLessons();
    }, [])

    return (
        <div className={styles.lessonContainer}>
            {
                    lessonList.map((lesson, i : number) => {
                        
                        return <LessonItem key={lesson.id} data={lesson} zLayer={(lessonList.length-i)} index={i} bgColor={bgColor[i]} removeLessonFromList={removeLessonFromList}/>
                    })
                }
        </div>
    );
}

export default LessonContainer;