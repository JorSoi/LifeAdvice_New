'use client'

import { useState } from "react";
import { SavedLessonsContext } from "@/lib/contexts";



// This ContextProvider wraps aroud the ProfileCard and Lesson list within the profile page. Its sole job is to collect what History has been clicked in the profile card and pass this information back to the LessonList to display the wanted Lessons. 
function SavedLessonsContextProvider({children, user} : { children: React.ReactNode, user: any }) {

    const [selected, setSelected] = useState< 'bookmarked' | 'liked' | 'created'>('bookmarked')

    return (
        <SavedLessonsContext.Provider value={{setSelected: setSelected, selected : selected}}>
            {children}
        </SavedLessonsContext.Provider>
    );
}

export default SavedLessonsContextProvider;