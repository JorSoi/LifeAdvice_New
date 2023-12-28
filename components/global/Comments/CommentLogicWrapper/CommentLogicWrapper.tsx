'use client'

import { CommentData, InitiateReplyFunction } from "@/types/home.types";
import TextArea from "../TextArea/TextArea";
import CommentList from "../CommentList/CommentList";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useState, useEffect } from "react";


//This Wrapper-Component is used to prevent comment-logic (for submitted post) within the LessonItem-Component. We also need this wrapper to accomodate for the childrens' high interdependency.
function CommentLogicWrapper({lessonId} : {lessonId : number}) {

    const [commentList, setCommentList] = useState<any>([]);
    const [recipient, setRecipient] = useState<{name : string}>({name: ''});

    const supabase = supabaseBrowserClient();
    

    //Scrolls to top and populates textarea with the recipients username
    const initiateReply : InitiateReplyFunction = async (user_name : string) => {
        setRecipient({name : user_name})
    }

    const addToCommentList = (newComment : CommentData) => {
        setCommentList((prev : CommentData[]) => [newComment, ...prev])
    }

    useEffect(() => {

        const getComments = async () => {
            const {data, error} = await supabase.from('comments').select(`id, content, upvotes, created_at, profiles(id, user_name, avatars(avatar_url))`).eq('lesson_id', lessonId);

            if(!error) {
                setCommentList(data)
            } else {
                console.log(error)
            }
        }
        getComments();

    }, [lessonId])

    
    return (
        <>
            <TextArea minLength={1} maxLength={800} lessonId={lessonId} recipient={recipient.name} addToCommentList={addToCommentList} />
            <CommentList commentList={commentList} initiateReply={initiateReply}/>
        </>
    );
}

export default CommentLogicWrapper;