import LessonContainer from "@/components/pages/Home/LessonContainer/LessonContainer";
import MenuBar from "@/components/global/MenuBar/MenuBar";
import Image from "next/image";
import styles from './Explore.module.scss'



function Explore() {
    return (
        <div className={styles.explore}>
            <LessonContainer />
            <MenuBar page={'explore'}/>
        </div>
    );
}

export default Explore;