'use client'

import Link from 'next/link';
import BackButton from '../../Buttons/BackButton/BackButton';
import InputField from '../../InputField/InputField';
import styles from './SignInForm.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';


function SignInForm({authNavigation} : {authNavigation : any}) {

    const [failedAttempts, setFailedAttempts] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const supabase = supabaseBrowserClient();
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async () => {
            setIsLoading(true)
            const {data, error} = await supabase.auth.signInWithPassword({
                email: formik.values.email,
                password: formik.values.password,
            })
            if(!error) {
                router.push('/profile')
                closeOverlay();
                setIsLoading(false)
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
            <div className={styles.passwordWrapper}>
                <InputField 
                    name={'password'} 
                    type='password' 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder={'Password'}
                    error={formik.touched.password && formik.errors.password ? formik.errors.password: null}
                />
                <p className={styles.forgotPassword} onClick={authNavigation.resetPassword}>Forgot Password?</p>
            </div>
            <div className={styles.buttonWrapper}>
                <BackButton onClick={authNavigation.navigateToIntro}/>
                <button className={styles.submit} type={'submit'} disabled={isLoading}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Log In' : ''}
                </button>
            </div>
            <p className={styles.register} onClick={authNavigation.navigateToRegistration}>Don't have an account? <span>Register</span></p>
        </form>
    );
}

export default SignInForm;