'use client'

import { useState } from 'react';
import styles from './CommentLikeButton.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';

function CommentLikeButton({comment_id} : {comment_id : number}) {

    const [isLiked, setIsLiked] = useState<boolean>(false);

    const supabase = supabaseBrowserClient();

    const handleClick = async () => {

        if(isLiked) {
            //remove like
            setIsLiked(false)
            const {data, error} = await supabase.from('comment_upvoted_by').delete().eq('profile_id', 2).eq('comment_id', comment_id);
            if(!error) {
                //decrease upvotes count on comment
                await supabase.rpc( 'downvoteComment', {
                    comment_id
                  } 
                )
            } else {
                //return to previous state if upvoting fails
                setIsLiked(true)
            }
           
        }
        else {
            //add like
            setIsLiked(true)
            const {data, error} = await supabase.from('comment_upvoted_by').insert({
                comment_id,
                profile_id: 2 //must be dynamic based on authed user
            })
            if(!error) {
               //increase upvotes count on comment
               await supabase.rpc( 'upvoteComment', {
                comment_id
              } 
            )
            } else {
                //return to previous state if upvoting fails
                setIsLiked(true)
            }
           



  
        }
    }

    return (
        <div className={`${styles.commentLikeButton} ${isLiked ? styles.liked : null}`} onClick={handleClick}>
            {   isLiked &&
                <svg width="13" height="12" viewBox="0 0 22 19" fill='#F4801C' xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9056 1C18.2517 1 20.5 4.16625 20.5 7.12C20.5 13.1019 11.1689 18 11 18C10.8311 18 1.5 13.1019 1.5 7.12C1.5 4.16625 3.74833 1 7.09444 1C9.01556 1 10.2717 1.96687 11 2.81687C11.7283 1.96687 12.9844 1 14.9056 1Z" stroke='#F4801C' strokeWidth="1.98" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
            <p>{isLiked ? 'Liked' : 'Like'}</p>
        </div>
    );
}

export default CommentLikeButton;