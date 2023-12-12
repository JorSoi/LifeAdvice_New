'use client'

import styles from './ExploreButton.module.scss'
import { useRouter } from 'next/navigation';

function ExploreButton({isActive} : {isActive : boolean}) {

    const router = useRouter();

    const handleClick = () => {
        router.push('/')
    }

    return (
        <div className={`${styles.explore} ${isActive ? styles.active : null}`} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M12.5 24C18.8513 24 24 18.8513 24 12.5C24 6.14873 18.8513 1 12.5 1C6.14873 1 1 6.14873 1 12.5C1 18.8513 6.14873 24 12.5 24Z" stroke={isActive ? '#F4801C' : '#BEC0CC'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.6304 8.20586C16.1923 8.01858 16.4732 7.92494 16.66 7.99156C16.8225 8.04953 16.9505 8.17746 17.0084 8.34002C17.0751 8.52683 16.9814 8.80775 16.7941 9.36958L15.0835 14.5016C15.0301 14.6616 15.0035 14.7416 14.958 14.8081C14.9178 14.8669 14.8669 14.9178 14.8081 14.958C14.7416 15.0035 14.6616 15.0301 14.5016 15.0835L9.36958 16.7941C8.80775 16.9814 8.52683 17.0751 8.34002 17.0084C8.17746 16.9505 8.04953 16.8225 7.99156 16.66C7.92494 16.4732 8.01858 16.1923 8.20586 15.6304L9.91654 10.4984C9.96987 10.3384 9.99654 10.2584 10.042 10.1919C10.0822 10.1331 10.1331 10.0822 10.1919 10.042C10.2584 9.99654 10.3384 9.96987 10.4984 9.91654L15.6304 8.20586Z" stroke={isActive ? '#F4801C' : '#BEC0CC'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Explore</p>
    </div>
    );
}

export default ExploreButton;