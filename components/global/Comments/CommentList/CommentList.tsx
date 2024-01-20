'use client'

import styles from './CommentList.module.scss'
import CommentItem from '../CommentItem/CommentItem';
import { CommentData, InitiateReplyFunction, RemoveFromCommentList } from '@/types/home.types';
import Image from 'next/image';

function CommentList({commentList, initiateReply, removeFromCommentList, user} : {commentList : CommentData[], initiateReply : InitiateReplyFunction, removeFromCommentList : RemoveFromCommentList, user : any }) {

    return (
            <div className={styles.commentList}>
                {
                    
                    commentList?.map((comment : CommentData) => {
                        

                        return (
                            <CommentItem key={comment.id} comment={comment} initiateReply={initiateReply} user={user} removeFromCommentList={removeFromCommentList} />
                        )
                    })
                }

                {commentList.length == 0 && <Image className={styles.placeholderImg} src={'/comment-placeholder.svg'} width={100} height={100} alt='' priority={true}/>} 
            </div>
    );
}

export default CommentList;