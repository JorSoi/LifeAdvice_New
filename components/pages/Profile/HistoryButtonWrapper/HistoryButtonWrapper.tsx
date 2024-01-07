'use client'

import { SavedLessonCount } from '@/types/home.types';
import styles from './HistoryButtonWrapper.module.scss'
import { SavedLessonsContext } from '@/lib/contexts';
import { useContext } from 'react';
import { SavedLessonsContextType } from '@/types/home.types';

function HistoryButtonWrapper ({bookmarkedCount, likedCount, createdCount} : SavedLessonCount) {

    //Sets the correct type saved lessons which is consumed by the LessonList
    const {setSelected, selected} = useContext(SavedLessonsContext) as SavedLessonsContextType;

    return (
        <div className={styles.historyButtonWrapper}>
            <button className={`${styles.historyButton} ${selected == 'bookmarked' ? styles.active : null}`} onClick={() => setSelected('bookmarked')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
                    <path d="M0 4.53333C0 2.94652 0 2.15311 0.303625 1.54703C0.5707 1.0139 0.996861 0.580456 1.52103 0.308815C2.11692 0 2.897 0 4.45714 0H8.54286C10.103 0 10.8831 0 11.479 0.308815C12.0031 0.580456 12.4293 1.0139 12.6964 1.54703C13 2.15311 13 2.94652 13 4.53333V14.7756C13 15.5052 13 15.8701 12.8468 16.0805C12.7132 16.2641 12.5079 16.3822 12.282 16.4055C12.0231 16.4322 11.7077 16.2489 11.0768 15.8822L6.5 13.2222L1.92319 15.8822C1.29235 16.2489 0.976927 16.4322 0.717981 16.4055C0.49213 16.3822 0.286807 16.2641 0.153193 16.0805C0 15.8701 0 15.5052 0 14.7756V4.53333Z" fill={selected == 'bookmarked' ? 'white' : '#F4801C'}/>
                </svg>
                {bookmarkedCount}        
            </button>

            <button className={`${styles.historyButton} ${selected == 'liked' ? styles.active : null}`} onClick={() => setSelected('liked')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                    <path d="M12.617 0C15.7663 0 17.8824 2.98 17.8824 5.76C17.8824 11.39 9.10013 16 8.94118 16C8.78222 16 0 11.39 0 5.76C0 2.98 2.11608 0 5.26536 0C7.07346 0 8.25569 0.91 8.94118 1.71C9.62667 0.91 10.8089 0 12.617 0Z" fill={selected == 'liked' ? 'white' : '#F4801C'}/>
                </svg>
                {likedCount}            
            </button>

            <button className={`${styles.historyButton} ${selected == 'created' ? styles.active : null}`} onClick={() => setSelected('created')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M10.3151 4.03654L4.81227 5.13711C4.50487 5.19859 4.35117 5.22933 4.22601 5.30408C4.11536 5.37016 4.02125 5.46063 3.95085 5.56859C3.87123 5.69071 3.83445 5.84307 3.76089 6.1478L1 17.5858M1 17.5858L12.438 14.8249C12.7427 14.7513 12.8951 14.7146 13.0172 14.6349C13.1252 14.5645 13.2156 14.4704 13.2817 14.3598C13.3565 14.2346 13.3872 14.0809 13.4487 13.7735L14.5492 8.27068M1 17.5858L7.42403 11.1618M16.9785 5.61895L12.9668 1.60731C12.6315 1.27195 12.4638 1.10427 12.2704 1.04145C12.1004 0.986184 11.9172 0.986184 11.7471 1.04145C11.5537 1.10427 11.386 1.27195 11.0507 1.60731L10.4264 2.23164C10.091 2.567 9.92332 2.73468 9.86049 2.92803C9.80523 3.09811 9.80523 3.28132 9.86049 3.4514C9.92332 3.64475 10.091 3.81243 10.4264 4.14779L14.438 8.15943C14.7734 8.49479 14.941 8.66247 15.1344 8.72529C15.3045 8.78056 15.4877 8.78056 15.6578 8.72529C15.8511 8.66247 16.0188 8.49479 16.3541 8.15943L16.9785 7.5351C17.3138 7.19974 17.4815 7.03206 17.5443 6.83871C17.5996 6.66863 17.5996 6.48542 17.5443 6.31534C17.4815 6.12199 17.3138 5.95431 16.9785 5.61895ZM8.62145 8.27068C9.55683 8.27068 10.3151 9.02896 10.3151 9.96434C10.3151 10.8997 9.55683 11.658 8.62145 11.658C7.68607 11.658 6.92779 10.8997 6.92779 9.96434C6.92779 9.02896 7.68607 8.27068 8.62145 8.27068Z" stroke={selected == 'created' ? 'white' : '#F4801C'} strokeWidth="1.69366" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {createdCount}     
            </button>
            
        </div>
    );
}

export default HistoryButtonWrapper;
