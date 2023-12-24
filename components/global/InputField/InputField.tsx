import styles from './InputField.module.scss'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error : string | null
}

function InputField({error, ...props} : InputFieldProps) {


    return (
        <div className={styles.inputFieldWrapper}>
            <input 
                className={`${styles.inputField} ${error ? styles.error : null}`}
                {...props} 
            />

            <p className={`${styles.errorMessage} ${error ? styles.active : null}`}>{error}</p>
        </div>
    );
}

export default InputField;