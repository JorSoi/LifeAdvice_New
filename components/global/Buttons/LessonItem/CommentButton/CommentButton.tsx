'use client'

import styles from './CommentButton.module.scss'
import Image from 'next/image';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';

function CommentButton({lessonId} : {lessonId : number}) {

    const [commentCount, setCommentCount] = useState<number | null>(0)
    const supabase = supabaseBrowserClient();
    const {openOverlay} = useContext(OverlayContext) as OverlayContextType;

    const handleClick = () => {
        openOverlay('comments', lessonId)
    }

    useEffect(() => {
        const getCommentCount = async () => {
            const {count, error} = await supabase.from('comments').select('*', {count: 'estimated', head: true}).eq('lesson_id', lessonId);
            if(!error) {
                setCommentCount(count)
            } else {
                console.log(error)
            }
        }
        getCommentCount();
    }, [])

    return (
        <div>
            <div className={styles.commentButton} onClick={handleClick}>
                <Image src={'/icons/comment-icon.svg'} width={20} height={20} alt={'Comment Button'} priority={true} />
                {
                    commentCount !== 0 && 
                    <div className={styles.commentCount}>
                        <p>{commentCount}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default CommentButton;