import supabaseServerClient from "./supabaseServerClient"

import { SavedLessonCount } from "@/types/home.types";


//Used to populate the Buttons of the HistoryButtonWrapper Component
const getSavedLessonCount = async (userId : string) : Promise<SavedLessonCount> => {

    const supabase = supabaseServerClient();

    //Gets number of bookmarked lessons
    const {count : bookmarkedCount} = await supabase.from('lesson_bookmarked_by').select('*', { count: 'exact', head: true }).eq('profile_id', userId);

    //Gets number of liked/upvoted lessons
    const {count : likedCount} = await supabase.from('lesson_upvoted_by').select('*', { count: 'exact', head: true }).eq('profile_id', userId);

    //Gets number of created lessons
    const {count: createdCount} = await supabase.from('lessons').select('*', { count: 'exact', head: true }).eq('profile_id', userId);

    return {bookmarkedCount, likedCount, createdCount}
} 

export default getSavedLessonCount