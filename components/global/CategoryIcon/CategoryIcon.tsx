import styles from "./CategoryIcon.module.scss"
import { CategoryNames } from "@/types/home.types";

const emojiMap = {
    "love": '💌',
    "friendship": '🫂',
    "mental-health": '🧠',
    "business": '💼',
    "education": '🎓',
    "travel": '✈️',
    "fitness": '🏅',
    "other": '💭',
}

function CategoryIcon({categoryName} : {categoryName: CategoryNames}) {
    return (
        <div className={`${styles.categoryIcon} ${styles[categoryName]}`}>
            {emojiMap[categoryName]}
        </div>
    );
}

export default CategoryIcon;