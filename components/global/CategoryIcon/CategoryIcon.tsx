import styles from "./CategoryIcon.module.scss"
import { Category } from "@/types/home.types";

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

function CategoryIcon({category} : {category: Category}) {
    return (
        <div className={`${styles.categoryIcon} ${styles[category]}`}>
            {emojiMap[category]}
        </div>
    );
}

export default CategoryIcon;