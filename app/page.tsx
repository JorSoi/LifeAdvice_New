import LessonContainer from "@/components/Home/LessonContainer/LessonContainer";
import MenuBar from "@/components/MenuBar/MenuBar";
import Image from "next/image";
import styles from './Explore.module.scss'



function Explore() {
    return (
        <div className={styles.explore}>
            <Image className={styles.logo} src={'./logo-light.svg'} width={140} height={40} alt="LifeAdvice" />
            <LessonContainer />
            <MenuBar page={'explore'}/>
        </div>
    );
}

export default Explore;