import React, { HTMLInputTypeAttribute } from "react";
import styles from './FormInput.module.scss'

interface FormInput extends React.FormHTMLAttributes<HTMLInputElement> {

}



function FormInput({...props} : FormInput) {

    return (
        <input className={styles.formInput} {...props} />
    );
}

export default FormInput;