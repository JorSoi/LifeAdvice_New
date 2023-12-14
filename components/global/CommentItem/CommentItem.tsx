import Image from 'next/image';
import styles from './CommentItem.module.scss'
import { CommentProps } from '@/types/home.types';

function CommentItem({avatar_url, username, comment, creation_date} : CommentProps) {
    return (
        <div className={styles.commentItem}>
            <Image src={avatar_url} width={35} height={35} alt='User Avatar' priority={true} />
            <div className={styles.contentContainer}>
                <h5 className={styles.userName}>{username}</h5>
                <p className={styles.comment}>{comment}</p>
                <div className={styles.metadataWrapper}>
                    <p className={styles.creationDate}>{creation_date}</p>
                    <div className={styles.interactionContainer}>
                        <p>Like</p>
                        <p>Reply</p>
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