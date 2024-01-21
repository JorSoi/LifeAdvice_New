import styles from "./CategoryIcon.module.scss"
import { CategoryNames } from "@/types/home.types";

//Mapping the emojis to static values is not ideal and must be taken care of in a different way.
const emojiMap = {
    "Love": '💌',
    "Friendship": '🫂',
    "Mental-health": '🧠',
    "Business": '💼',
    "Education": '🎓',
    "Travel": '✈️',
    "Fitness": '🏅',
    "Other": '💭',
}

function CategoryIcon({categoryName} : {categoryName: CategoryNames}) {
    return (
        <div className={`${styles.categoryIcon} ${styles[categoryName]}`}>
            {emojiMap[categoryName]}
        </div>
    );
}

export default CategoryIcon;