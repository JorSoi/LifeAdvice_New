'use client'

import Image from 'next/image';
import styles from './CommentButton.module.scss'
import Overlay from '../../../Overlay/Overlay';
import BottomSheet from '../../../BottomSheet/BottomSheet';
import CommentList from '../../../Comments/CommentList/CommentList';
import { useState } from 'react';

function CommentButton({commentCount, openComments} : {commentCount : number, openComments: () => void}) {

    return (
        <div>
            <div className={styles.commentButton} onClick={() => openComments()}>
                <Image src={'/icons/comment-icon.svg'} width={20} height={20} alt={'Comment Button'} />
                {
                    commentCount > 0 && 
                    <div className={styles.commentCount}>
                        <p>{commentCount}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default CommentButton;