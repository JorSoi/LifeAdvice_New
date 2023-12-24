import Image from "next/image";
import styles from './BackButton.module.scss'

function BackButton() {
    return (
        <button type={'button'} className={styles.backButton}>
            <Image src={'/icons/chevron-left.svg'} width={15} height={15} alt="" />
        </button>
    );
}

export default BackButton;