import { SocialType } from "@/types/home.types";
import styles from './SocialItem.module.scss'
import Image from "next/image";

function SocialItem({type, url } : {type : string, url : string }) {



    return (
        <a className={styles.itemWrapper} href={url} target="_blank">
            <div className={`${styles.socialItem} ${styles[type]}`}>
                <Image src={`/social-logos/${type}-logo.svg`} width={30} height={30} alt='' />
            </div>
            <p>{type}</p>
        </a>
    );
}

export default SocialItem;