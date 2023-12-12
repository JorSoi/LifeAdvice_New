import styles from "./CategoryIcon.module.scss"
import { Category } from "@/types/home.types";


function CategoryItem({category} : {category: Category}) {
    return (
        <div className={`${styles.categoryItem} ${styles[category.category_name]}`}>
            {category.category_emoji}
        </div>
    );
}

export default CategoryItem;