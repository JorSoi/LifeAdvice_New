import React from "react";
import styles from './Wrapper.module.scss'

function Wrapper({children} : {children : React.ReactNode}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}

export default Wrapper;