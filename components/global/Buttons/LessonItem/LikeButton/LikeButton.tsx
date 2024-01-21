'use client'


import styles from './LikeButton.module.scss'
import { useEffect, useState } from 'react';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';

function LikeButton({ lessonId, user } : {lessonId : number, user : any}) {

    const [isActive, setIsActive] = useState<boolean>(false);

    const supabase = supabaseBrowserClient();

    const handleClick = async () => {
        if(!user) return; // Don't allow interaction if unauthenticated
        if(isActive) {
            const {data, error} = await supabase.from('lesson_upvoted_by').delete().eq('lesson_id', lessonId).eq('profile_id', user.id)
            if(!error) {
                setIsActive(false)
            }
        } else {
            setIsActive(true)
            const {data, error} = await supabase.from('lesson_upvoted_by').insert({
                profile_id: user.id,
                lesson_id: lessonId,
            })
            if(error) {
                setIsActive(false)
            }
        }
    }

    useEffect(() => {
        const getLikeStatus = async () => {
            if(!user) return;
            const {data, error} = await supabase.from('lesson_upvoted_by').select('*').eq('lesson_id', lessonId).eq('profile_id', user.id).limit(1).maybeSingle();
            if(data) {
                setIsActive(true)
            } else {
                setIsActive(false);
            }
        }
        getLikeStatus();
    }, [])



    return (
        <div className={isActive ? `${styles.likeButton} ${styles.active}` : styles.likeButton} onClick={handleClick}>
            <svg width="22" height="19" viewBox="0 0 22 19" fill={isActive ? '#F4801C' : 'none'} xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9056 1C18.2517 1 20.5 4.16625 20.5 7.12C20.5 13.1019 11.1689 18 11 18C10.8311 18 1.5 13.1019 1.5 7.12C1.5 4.16625 3.74833 1 7.09444 1C9.01556 1 10.2717 1.96687 11 2.81687C11.7283 1.96687 12.9844 1 14.9056 1Z" stroke={isActive ? '#F4801C' : '#161C36'} strokeWidth="1.98" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </div>
    );
}

export default LikeButton;

