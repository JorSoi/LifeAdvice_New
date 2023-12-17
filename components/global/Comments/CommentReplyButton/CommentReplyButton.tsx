import styles from './CommentReplyButton.module.scss'
import { InitiateReplyFunction } from '@/types/home.types';

function CommentReplyButton({onClick} : {onClick : React.MouseEventHandler<HTMLParagraphElement>}) {

    

    return (
        <p className={styles.commentReplyButton} onClick={onClick}>
            Reply
        </p>
    );
}

export default CommentReplyButton;