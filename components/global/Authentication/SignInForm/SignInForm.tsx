'use client'

import Link from 'next/link';
import BackButton from '../../Buttons/BackButton/BackButton';
import InputField from '../../InputField/InputField';
import styles from './SignInForm.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useState } from 'react';


function SignInForm() {

    const [failedAttempts, setFailedAttempts] = useState<number>(0)

    const supabase = supabaseBrowserClient();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async () => {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: formik.values.email,
                password: formik.values.password,
            })
            if(!error) {
                alert(data.user.email)
            } else {
                if(error.cause == 'AuthApiError') {
                    console.log('sign in unsuccessfull. Invalid credentials')
                    setFailedAttempts((prev) => prev++)
                } else {
                    console.log('Sign In not possible. Please check internet connection or try again later.')
                }   
            }
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Incorrect email').required('Required'),
            password: Yup.string().required('Required')
        })
    });

    return (
        <form className={styles.signInForm} onSubmit={formik.handleSubmit} >
            <InputField 
                name={'email'} 
                type='email' 
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder={'Email'}
                error={formik.touched.email && formik.errors.email ? formik.errors.email: null}
            />
            <InputField 
                name={'password'} 
                type='password' 
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder={'Password'}
                error={formik.touched.password && formik.errors.password ? formik.errors.password: null}
            />
            <div className={styles.buttonWrapper}>
                <BackButton />
                <button className={styles.submit} type={'submit'}>Sign In</button>
            </div>
            <p className={styles.register}>Don't have an account? <span>Register</span></p>
        </form>
    );
}

export default SignInForm;