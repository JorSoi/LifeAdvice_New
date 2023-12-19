'use client'

import Image from 'next/image';
import styles from './CommentItem.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import CommentLikeButton from '../CommentLikeButton/CommentLikeButton';
import CommentReplyButton from '../CommentReplyButton/CommentReplyButton';

function CommentItem({comment_id, avatar_url, user_name, comment, created_at, creator_id, initiateReply} : any) {
    
const supabase = supabaseBrowserClient();

    const handleOptionClick = async () => {
        const reportConfirmed : boolean = confirm(`Report comment from ${user_name}`)
        // if (reportConfirmed) {
        //     let { data, error } = await supabase.rpc('incrementreportscount', { x: 1, row_id: comment_id})
        //     console.log(data, error)
        // } 
    }

    const handleReplyClick = () => {
        initiateReply(comment_id, creator_id, user_name)
    }

    return (
        <div className={styles.commentItem}>
            <Image src={avatar_url} width={35} height={35} alt='User Avatar' priority={true} />
            <div className={styles.contentContainer}>
                <h5 className={styles.userName}>{user_name}</h5>
                <p className={styles.comment}>{comment}</p>
                <div className={styles.metadataWrapper}>
                    <p className={styles.creationDate}>{created_at}</p>
                    <div className={styles.interactionContainer}>
                        <CommentLikeButton comment_id={comment_id} />
                        <CommentReplyButton onClick={handleReplyClick} />
                    </div>
                </div>
            </div>
            <div className={styles.optionButton} onClick={handleOptionClick}>
                <Image src={'/icons/commentOptions-icon.svg'} width={18} height={5} alt='' />
            </div>
        </div>
    );
}

export default CommentItem;