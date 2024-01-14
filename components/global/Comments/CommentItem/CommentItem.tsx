'use client'

import Image from 'next/image';
import styles from './CommentItem.module.scss'
import CommentLikeButton from '../CommentLikeButton/CommentLikeButton';
import CommentReplyButton from '../CommentReplyButton/CommentReplyButton';
import getElapsedTime from '@/lib/getElapsedTime';
import { CommentData, InitiateReplyFunction } from '@/types/home.types';

function CommentItem({comment, initiateReply} : {comment: CommentData, initiateReply : InitiateReplyFunction}) {


    const handleReplyClick = () => {
        initiateReply(comment.profiles.user_name)
    }

    return (
        <div className={styles.commentItem}>
            <Image src={comment.profiles.avatars.avatar_url} width={35} height={35} alt='User Avatar' priority={true} />
            <div className={styles.contentContainer}>
                <h5 className={styles.userName}>{comment.profiles.user_name}</h5>
                <p className={styles.comment}>{comment.content}</p>
                <div className={styles.metadataWrapper}>
                    <p className={styles.creationDate}>{getElapsedTime(comment.created_at)}</p>
                    <div className={styles.interactionContainer}>
                        <CommentLikeButton comment_id={comment.id} />
                        <CommentReplyButton onClick={handleReplyClick} />
                    </div>
                </div>
            </div>
            <div className={styles.optionButton}>
                <Image src={'/icons/commentOptions-icon.svg'} width={18} height={5} alt='' />
            </div>
        </div>
    );
}

export default CommentItem;