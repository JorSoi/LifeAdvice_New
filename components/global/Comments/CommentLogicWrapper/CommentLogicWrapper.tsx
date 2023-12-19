'use client'

import { CommentData, InitiateReplyFunction, Lesson } from "@/types/home.types";
import TextArea from "../TextArea/TextArea";
import CommentList from "../CommentList/CommentList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useState, useEffect, useRef, RefObject, MutableRefObject } from "react";


//This Wrapper-Component is used to prevent comment-logic (for submitted post) within the LessonItem-Component. We also need this wrapper to accomodate for the childrens' high interdependency.
function CommentLogicWrapper({lessonId} : {lessonId: number}) {

    const [commentList, setCommentList] = useState<any>([]);
    const [recipient, setRecipient] = useState<{name : string}>({name: ''});

    const supabase = supabaseBrowserClient();
    

    //Scrolls to top and populates textarea with the recipients username
    const initiateReply : InitiateReplyFunction = async (creator_id, comment_id, user_name) => {
        setRecipient({name : user_name})
    }

    const addToCommentList = (newComment : CommentData) => {
        setCommentList((prev : CommentData[]) => [newComment, ...prev])
    }

    console.log(commentList)

    useEffect(() => {

        const getComments = async () => {
            const {data, error} = await supabase.from('comments').select(`id, comment, upvotes, created_at, profiles(id, user_name, avatars(avatar_url))`).eq('lesson_id', lessonId);
            console.log(data, error)

            if(!error) {
                console.log(data)
                setCommentList(data)
            }
        }
        getComments();

    }, [])

    
    return (
        <>
            <TextArea minLength={1} maxLength={800} lessonId={lessonId} recipient={recipient.name} addToCommentList={addToCommentList} />
            <CommentList commentList={commentList} initiateReply={initiateReply}/>
        </>
    );
}

export default CommentLogicWrapper;