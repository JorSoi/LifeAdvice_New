import Image from "next/image";
import styles from './BackButton.module.scss'

function BackButton({onClick} : {onClick : () => void}) {
    return (
        <button onClick={onClick} type={'button'} className={styles.backButton}>
            <Image src={'/icons/chevron-left.svg'} width={15} height={15} alt="" priority={true} />
        </button>
    );
}

export default BackButton;