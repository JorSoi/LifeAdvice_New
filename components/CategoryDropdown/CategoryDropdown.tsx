import Image from "next/image";
import styles from "./CategoryDropdown.module.scss"

function CategoryDropdown() {
    return (
        <select className={styles.categoryDropdown} name="lesson-categories">
            <option value="">Select Category</option>
            <option value="friendship">Friendship</option>
            <option value="mindset">Mindset</option>
            <option value="love">Love</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="other">Other Lessons</option>
        </select>
    );
}

export default CategoryDropdown;