import Image from 'next/image';
import styles from './BottomSheet.module.scss'

function BottomSheet({children, title} : {children? : React.ReactNode, title? : string}) {
    return (
        <div className={styles.bottomSheet}>
            <div className={styles.headingContainer}>
                <div className={styles.gripHandle}></div>
                <div className={styles.titleWrapper}>
                    <h3>{title}</h3>
                    <div className={styles.closeButton}>
                        <Image src={'/icons/closeSheet-icon.svg'} width={12} height={10} alt='' />
                    </div>
                </div>
            </div>
            
            {children}
        </div>
    );
}

export default BottomSheet;