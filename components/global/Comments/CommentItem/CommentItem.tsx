'use client'

import Image from 'next/image';
import styles from './CommentItem.module.scss'
import CommentLikeButton from '../CommentLikeButton/CommentLikeButton';
import CommentReplyButton from '../CommentReplyButton/CommentReplyButton';
import getElapsedTime from '@/lib/getElapsedTime';
import { CommentData, InitiateReplyFunction, RemoveFromCommentList } from '@/types/home.types';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';

function CommentItem({comment, initiateReply, removeFromCommentList, user} : {comment: CommentData, initiateReply : InitiateReplyFunction, removeFromCommentList : RemoveFromCommentList, user : any}) {

    const supabase = supabaseBrowserClient();

    const handleReplyClick = () => {
        initiateReply(comment.profiles.user_name)
    }

    const handleOptionClick = async () => {
        if(comment.profiles.id == user.id) {
            let isConfirmed = confirm("Press OK if you'd like to delete your comment")
            if(isConfirmed) {
                const {data, error} = await supabase.from('comments').delete().eq('id', comment.id)
                if(!error) {
                    removeFromCommentList(comment.id)
                }
            }
        } else {
            let isConfirmed = confirm("Press OK if you'd like to report this comment")
            if(isConfirmed) {
                const {data, error} = await supabase.rpc('reportComment', {comment_id: comment.id}); 
            }
        }
    }

    return (
        <div className={styles.commentItem}>
            <Image src={comment.profiles.avatars.avatar_url} width={35} height={35} alt='User Avatar' priority={true} />
            <div className={styles.contentContainer}>
                <h5 className={styles.userName}>{comment.profiles.user_name} {comment.profiles.id == user.id ? '(You)' : null}</h5>
                <p className={styles.comment}>{comment.content}</p>
                <div className={styles.metadataWrapper}>
                    <p className={styles.creationDate}>{getElapsedTime(comment.created_at)}</p>
                    <div className={styles.interactionContainer}>
                        <CommentLikeButton comment_id={comment.id} user={user} />
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