import MenuBar from "@/components/global/MenuBar/MenuBar";
import styles from './Topics.module.scss'
import TopicList from "@/components/pages/Topics/TopicList/TopicList";

function Topics() {
    return (
        <div className={styles.topics}>
            <TopicList />
            <MenuBar page={'topics'} />
        </div>
    );
}

export default Topics;