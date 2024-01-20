'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './CommentTextArea.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { CommentData } from '@/types/home.types';
import useTextLimit from '@/hooks/useTextLimit';

function CommentTextArea({minLength, maxLength, lessonId, recipient, addToCommentList} : {minLength : number, maxLength : number, lessonId : number, recipient : string, addToCommentList : (param : CommentData) => void }) {

    const [text, setText] = useState<string>('')
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = supabaseBrowserClient();
    const formRef = useRef<HTMLFormElement>(null);
    const status = useTextLimit(maxLength, text)


    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { data, error } = await supabase.from('comments').insert([{ 
            lesson_id: lessonId, 
            profile_id: '782049b9-91f5-410b-ad7c-e327a5ec898f', //must be dynamic
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
                            formRef.current.scrollIntoView({behavior: 'smooth'}) 
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