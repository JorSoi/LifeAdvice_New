import Image from 'next/image';
import styles from './CommentButton.module.scss'

function CommentButton({commentCount} : {commentCount? : number}) {
    return (
        <div className={styles.commentButton}>
            <Image src={'/icons/comment-icon.svg'} width={20} height={20} alt={'Comment Button'} />
            {
                commentCount && 
                <div className={styles.commentCount}>
                    <p>{commentCount}</p>
                </div>
            }  
        </div>
    );
}

export default CommentButton;