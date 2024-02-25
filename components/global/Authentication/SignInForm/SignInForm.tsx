'use client'

import BackButton from '../../Buttons/BackButton/BackButton';
import InputField from '../../InputField/InputField';
import styles from './SignInForm.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';


function SignInForm({authNavigation} : {authNavigation : any}) {

    const [failedAttempts, setFailedAttempts] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const supabase = supabaseBrowserClient();
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType
    const ctaRef = useRef<HTMLButtonElement | null>(null)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async () => {
            setIsLoading(true)
            const {error} = await supabase.auth.signInWithPassword({
                email: formik.values.email,
                password: formik.values.password,
            })
            if(!error) {
                closeOverlay();
                setIsLoading(false)
                location.reload(); //Can't use next-navigation since top-layout appears to be untouched from refreshes even though it stores the "user" state. This state affects various components (especially related to comment-section) which is why I decided to use a hard-refresh instead of utilizing useRouter.
            } else {
                if(!ctaRef.current) return;

                setFailedAttempts((prev) => prev + 1)
                setIsLoading(false)

                ctaRef.current.setAttribute('error', '')
                ctaRef.current.addEventListener('animationend', () => {
                    ctaRef.current!.removeAttribute('error')
                })
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
            {
                failedAttempts >= 2 &&
                <div className={styles.forgotPassword} onClick={authNavigation.navigateToPasswordReset}>
                    <p>Reset my password</p>
                    <svg width="17" height="16" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.125H14.6667M14.6667 6.125L9.54167 1M14.6667 6.125L9.54167 11.25" stroke="#F4801C" strokeWidth="1.70833" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            }
            <div className={styles.buttonWrapper}>
                <BackButton onClick={authNavigation.navigateToIntro}/>
                <button ref={ctaRef} className={styles.submit} type={'submit'} disabled={isLoading}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    <p>{!isLoading ? 'Log In' : ''}</p>
                </button>
            </div>
            <p className={styles.register} onClick={authNavigation.navigateToRegistration}>Don't have an account? <span>Register</span></p>
        </form>
    );
}

export default SignInForm;