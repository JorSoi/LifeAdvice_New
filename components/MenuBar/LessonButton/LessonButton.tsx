import Image from 'next/image';
import styles from './LessonButton.module.scss'

function LessonButton() {
    return (
        <div className={styles.lessonButton}>
            <Image src={'/icons/plus-icon.svg'} width={22} height={22} alt='' />
        </div>
    );
}

export default LessonButton;