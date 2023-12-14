'use client'

import Image from 'next/image';
import styles from './CommentButton.module.scss'
import Overlay from '../../Overlay/Overlay';
import BottomSheet from '../../BottomSheet/BottomSheet';
import CommentList from '../../CommentList/CommentList';
import { useState } from 'react';

function CommentButton({commentCount} : {commentCount? : number}) {

    const [isClicked, setIsClicked] = useState<boolean>(false)

    return (
        <div>
            <div className={styles.commentButton} onClick={() => setIsClicked(true)}>
                <Image src={'/icons/comment-icon.svg'} width={20} height={20} alt={'Comment Button'} />
                {
                    commentCount && 
                    <div className={styles.commentCount}>
                        <p>{commentCount}</p>
                    </div>
                }
            </div>
            
            {/* {
                isClicked &&

            } */}
        </div>
    );
}

export default CommentButton;