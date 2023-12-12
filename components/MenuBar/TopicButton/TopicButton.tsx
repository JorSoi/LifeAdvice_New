'use client'

import styles from './TopicButton.module.scss'
import { useRouter } from 'next/navigation';

function TopicButton ({isActive} : {isActive : boolean}) {

    const router = useRouter();

    const handleClick = () => {
        router.push('/topics')
    }

    return (
        <div className={`${styles.topic} ${isActive ? styles.active : null}`} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M7.3 7.3V4.36C7.3 3.18389 7.3 2.59583 7.52889 2.14662C7.73022 1.75148 8.05148 1.43022 8.44662 1.22889C8.89583 1 9.48389 1 10.66 1H18.64C19.8161 1 20.4042 1 20.8534 1.22889C21.2485 1.43022 21.5698 1.75148 21.7711 2.14662C22 2.59583 22 3.18389 22 4.36V12.34C22 13.5161 22 14.1042 21.7711 14.5534C21.5698 14.9485 21.2485 15.2698 20.8534 15.4711C20.4042 15.7 19.8161 15.7 18.64 15.7H15.7M4.36 22H12.34C13.5161 22 14.1042 22 14.5534 21.7711C14.9485 21.5698 15.2698 21.2485 15.4711 20.8534C15.7 20.4042 15.7 19.8161 15.7 18.64V10.66C15.7 9.48389 15.7 8.89583 15.4711 8.44662C15.2698 8.05148 14.9485 7.73022 14.5534 7.52889C14.1042 7.3 13.5161 7.3 12.34 7.3H4.36C3.18389 7.3 2.59583 7.3 2.14662 7.52889C1.75148 7.73022 1.43022 8.05148 1.22889 8.44662C1 8.89583 1 9.48389 1 10.66V18.64C1 19.8161 1 20.4042 1.22889 20.8534C1.43022 21.2485 1.75148 21.5698 2.14662 21.7711C2.59583 22 3.18389 22 4.36 22Z" stroke={isActive ? '#F4801C' : '#BEC0CC'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Topics</p>
    </div>
    );
}

export default TopicButton;