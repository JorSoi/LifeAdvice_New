'use client'

import { useContext, useEffect, useRef, useState } from 'react';
import styles from './CommentTextArea.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { AddToCommentList, CommentData, OverlayContextType } from '@/types/home.types';
import useTextLimit from '@/hooks/useTextLimit';
import { OverlayContext } from '@/lib/contexts';

function CommentTextArea({minLength, maxLength, lessonId, recipient, addToCommentList, user} : {minLength : number, maxLength : number, lessonId : number, recipient : string, user : any, addToCommentList : AddToCommentList }) {

    const [text, setText] = useState<string>('')
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = supabaseBrowserClient();
    const formRef = useRef<HTMLFormElement>(null);
    const status = useTextLimit(maxLength, text)
    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;


    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        if(!user) {
            //Dont allow interaction if unauthenticated
            openOverlay('authentication');
            return;
        } 
        setIsLoading(true);
        const { data, error } = await supabase.from('comments').insert([{ 
            lesson_id: lessonId, 
            profile_id: user.id,
            content: text,
        },]).select(`id, content, upvotes, created_at, profiles(id, user_name, avatars(avatar_url))`).single();
        if(!error) {
            setIsLoading(false)
            setText('')
            setIsExpanded(false)
            const newComment : any = data;
            addToCommentList(newComment)
        } else {
            console.log(error)
        }
    }


    useEffect(() => {
        // Checks if a recipient has been passed to this Component to open textarea and prefill it with the correct recipient
        if(recipient) {
            setText(`@${recipient} `)
            setIsExpanded(true)          
        }
        if (formRef.current) {
            formRef.current.scrollIntoView({behavior: 'smooth'})
            
        }
    }, [recipient])

    return (
        <form className={styles.textForm} onSubmit={handleSubmit} ref={formRef}>
            <textarea 
                className={`${styles.textArea} ${isExpanded ? styles.expanded : null}`} 
                placeholder='Share your thoughts' 
                value={text} 
                onChange={({target}) => setText(target.value)} 
                maxLength={maxLength}
                onFocus={
                    () => {
                        setIsExpanded(true)
                        if (formRef.current) {
                            formRef.current.scrollIntoView(false) 
                        }
                    }
                }
                onBlur={() => {text.length == 0 ? setIsExpanded(false) : null}}
            />

            {
                isExpanded && <button className={`${styles.postButton}`} type={'submit'} disabled={text.length < minLength || isLoading}>Post{isLoading ? 'ing...' : null}</button>
            }

            <p className={`${styles.lengthCounter} ${status == 'warn' ? styles.warn : status == 'stop' ? styles.stop : styles.hidden}`}>
                {text.length}/{maxLength}
            </p>
        </form>
    );
}

export default CommentTextArea;