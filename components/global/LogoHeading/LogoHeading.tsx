import styles from './LogoHeading.module.scss'
import Image from "next/image";

function LogoHeading() {
    return <Image className={styles.logo} src={'./logo-light.svg'} width={140} height={40} alt="LifeAdvice" />
}

export default LogoHeading;