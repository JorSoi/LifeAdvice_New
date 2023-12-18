'use client'

import styles from './CommentList.module.scss'
import CommentItem from '../CommentItem/CommentItem';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useEffect, useState } from 'react';
import { CommentData, InitiateReplyFunction } from '@/types/home.types';
import getElapsedTime from '@/lib/getElapsedTime';
import Image from 'next/image';

function CommentList({commentList, initiateReply} : {commentList : CommentData[], initiateReply : InitiateReplyFunction }) {

    return (
            <div className={styles.commentList}>
                {
                    commentList?.map((comment : CommentData) => {
                        return (
                            <CommentItem key={comment.id} creator_id={comment.profiles.id} avatar_url={comment.profiles.avatars.avatar_url} user_name={comment.profiles.user_name} comment={comment.comment} created_at={getElapsedTime(comment.created_at)} comment_id={comment.id} initiateReply={initiateReply} />
                        )
                    })
                }

                {commentList.length == 0 && <Image className={styles.placeholderImg} src={'/comment-placeholder.svg'} width={100} height={100} alt='' priority={true}/>} 
            </div>
    );
}

export default CommentList;