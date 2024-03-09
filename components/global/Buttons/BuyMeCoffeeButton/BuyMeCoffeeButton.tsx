'use client'

import Image from "next/image";
import styles from './BuyMeCoffeeButton.module.scss'

function BuyMeCoffeeButton() {

    const handleClick = () => {
        window.open ('https://www.buymeacoffee.com/jorim_from_lifeadvice', '_blank')
    }

    return (
        <button className={styles.buyMeCoffee} onClick={handleClick}>
            <Image src={'/icons/buy-me-coffee.svg'} width={25} height={25} alt="Buy be Coffee Icon" />
        </button>
    );
}

export default BuyMeCoffeeButton;