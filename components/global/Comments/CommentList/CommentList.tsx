'use client'

import styles from './CommentList.module.scss'
import CommentItem from '../CommentItem/CommentItem';
import { CommentData, InitiateReplyFunction } from '@/types/home.types';
import Image from 'next/image';

function CommentList({commentList, initiateReply} : {commentList : CommentData[], initiateReply : InitiateReplyFunction }) {

    return (
            <div className={styles.commentList}>
                {
                    
                    commentList?.map((comment : CommentData) => {
                        

                        return (
                            <CommentItem key={comment.id} comment={comment} initiateReply={initiateReply} />
                        )
                    })
                }

                {commentList.length == 0 && <Image className={styles.placeholderImg} src={'/comment-placeholder.svg'} width={100} height={100} alt='' priority={true}/>} 
            </div>
    );
}

export default CommentList;