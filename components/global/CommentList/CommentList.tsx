import styles from './CommentList.module.scss'
import CommentItem from '../CommentItem/CommentItem';

function CommentList({data} : any) {
    return (
        <div className={styles.scrollContainer}>
            <div className={styles.commentList}>
                <CommentItem avatar_url={'/space-avatar.svg'} username="jorsoi_13" comment="When I was a teenager, my older brother would always go by that principle. It pissed me off a little but but I the older I got the more I understood him." creation_date="1 year ago"/>
                <CommentItem avatar_url={'/space-avatar.svg'} username="Jacckkie" comment="Lol... same thing here" creation_date="1 year ago"/>
                <CommentItem avatar_url={'/space-avatar.svg'} username="the_mutiny" comment="Great lesson! Never thought about that 😇" creation_date="1 year ago"/>
                <CommentItem avatar_url={'/space-avatar.svg'} username="hello_lifeadvice2023" comment="@jorsoi_13 funny. My cousin has always talked about that as well.." creation_date="1 year ago"/>
                {/* <CommentItem avatar_url={'/space-avatar.svg'} username="its.magic!" comment="When I was a teenager, my older brother would always go by that principle. It pissed me off a little but but I the older I got the more I understood him." creation_date="1 year ago"/> */}
                {/* <CommentItem avatar_url={'/space-avatar.svg'} username="jorsoi_13" comment="Lol... same thing here" creation_date="1 year ago"/> */}
                {/* <CommentItem avatar_url={'/space-avatar.svg'} username="jorsoi_13" comment="Great lesson! Never thought about that 😇" creation_date="1 year ago"/> */}
                <CommentItem avatar_url={'/space-avatar.svg'} username="jorsoi_13" comment="@jorsoi_13 funny. My cousin has always talked about that as well.." creation_date="1 year ago"/>
            </div>
        </div>
    );
}

export default CommentList;