'use client'

import { useEffect, useState } from 'react';
import BackButton from '../../Buttons/BackButton/BackButton';
import InputField from '../../InputField/InputField';
import styles from './RegistrationForm.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import Image from 'next/image';


function RegistrationForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = supabaseBrowserClient();

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
        },
        onSubmit: async () => {
            setIsLoading(true)
            const {data, error} = await supabase.auth.signUp({
                email: formik.values.email,
                password: formik.values.password,
                options: {
                    data: {
                        user_name: formik.values.userName
                    }
                }
            })
            if(!error) {
                setIsLoading(false)
                console.log(data)
            } else {
                setIsLoading(false)
                if(error.status == 400) {
                    formik.setFieldError('email', 'Email has already been taken')
                }
                
            }
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string()
                .min(4, 'Username must be at least 4 characters')
                .matches(/^\S*$/, 'Username cannot contain spaces')
                .required('Username is required')
                .test('userName', 'This one has already been taken. 😦 ', async (value) => {
                    const {data, error} = await supabase.from('profiles').select().eq('user_name', value)
                    console.log('test runs')
                    if(!error && data.length) {
                        console.log('duplicate detected')
                        return false
                    } else {
                        return true
                    }
                }),
            email: Yup.string().email('Incorrect email').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        })
    });



    return (
        <form className={styles.registrationForm} onSubmit={formik.handleSubmit} autoComplete="off">
            <InputField 
                name={'userName'} 
                type='userName' 
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                placeholder={'Username'}
                autoComplete='username'
                error={formik.errors.userName ? formik.errors.userName: null}
            />
            <InputField 
                name={'email'} 
                type='email' 
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder={'Email'}
                autoComplete='email'
                error={formik.touched.email && formik.errors.email ? formik.errors.email: null}
            />
            <InputField 
                name={'password'} 
                type='password' 
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder={'Password'}
                autoComplete='new-password'
                error={formik.touched.password && formik.errors.password ? formik.errors.password: null}
            />
            <div className={styles.buttonWrapper}>
                <BackButton />
                <button className={styles.submit} type={'submit'} disabled={isLoading}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Register' : ''}
                </button>
            </div>
            <p className={styles.register}>Have an account? <span>Sign In</span></p>
        </form>
    );
}

export default RegistrationForm;