import styles from "./CategoryIcon.module.scss"

type Category = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

const emojiMap = {
    'love': '💌',
    'friendship': '🫂',
    'business': '💼',
    'mental-health': '🧠',
    'education': '🎓',
    'travel': '✈️',
    'fitness': '🏅',
    'other': '💭',
}

function CategoryItem({category} : {category: Category}) {
    return (
        <div className={`${styles.categoryItem} ${styles[category]}`}>
            {emojiMap[category]}
        </div>
    );
}

export default CategoryItem;