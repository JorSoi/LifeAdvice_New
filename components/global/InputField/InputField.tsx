import { HTMLInputTypeAttribute, useState, useRef } from 'react';
import styles from './InputField.module.scss'
import Image from 'next/image';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error : string | null
}

function InputField({error, ...props} : InputFieldProps) {

    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(props.type || '') //Allows for overwriting the input type from prop in case its of type password.
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = (e : any) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.focus(); //Ensures that input remains focused even when pressing on the eye.
        }

        setInputType((prev) => prev == 'password' ? 'text' : 'password')
    }


    return (
        <div className={styles.inputFieldWrapper}>
            <div className={styles.passwordWrapper}>
                <input 
                    ref={inputRef}
                    className={`${styles.inputField} ${error ? styles.error : null} ${props.type == 'password' ? styles.password : null}`}
                    {...props} 
                    type={inputType}
                />

                {props.type == 'password' &&
                    <div className={styles.eye} onClick={handleClick}>
                        <Image src={`/icons/eye-${inputType == 'password' ? 'disabling' : 'enabling'}.svg`} width={20} height={20} alt="" />
                    </div>
                }
            </div>

            <p className={`${styles.errorMessage} ${error ? styles.active : null}`}>{error}</p>
        </div>
    );
}

export default InputField;