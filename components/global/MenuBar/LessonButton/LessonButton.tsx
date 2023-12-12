'use client'

import Image from 'next/image';
import styles from './LessonButton.module.scss'

function LessonButton() {
    return (
        <div className={styles.lessonButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2V18M2 10H18" stroke="white" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
    );
}

export default LessonButton;