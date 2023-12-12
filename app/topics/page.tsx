import MenuBar from "@/components/MenuBar/MenuBar";
import styles from './Topics.module.scss'

function Topics() {
    return (
        <div className={styles.topics}>
            <MenuBar page={'topics'} />
        </div>
    );
}

export default Topics;