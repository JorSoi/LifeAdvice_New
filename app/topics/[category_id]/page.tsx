import MenuBar from "@/components/global/MenuBar/MenuBar";
import LessonContainer from "@/components/pages/Home/LessonContainer/LessonContainer";
import styles from './FilteredLessons.module.scss'

function FilteredLessonPage({params} : {params : {category_id : string}}) {
    return (
        <div className={styles.filteredLessons}>
            <LessonContainer category_id={Number(params.category_id)}/>
            <MenuBar page={'default'} />
        </div>
    );
}

export default FilteredLessonPage;