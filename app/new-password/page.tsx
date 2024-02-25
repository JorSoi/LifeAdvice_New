'use client'

import PageContainer from "@/components/global/PageContainer/PageContainer";
import BottomSheetContainer from "@/components/global/BottomSheet/BottomSheetContainer";
import InputField from "@/components/global/InputField/InputField";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import { useState, useRef } from "react";
import * as Yup from 'yup'
import styles from './NewPassword.module.scss'
import Image from "next/image";



function newPassword() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = supabaseBrowserClient();
    const ctaRef = useRef<HTMLButtonElement | null>(null)
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: async () => {
            setIsLoading(true)
            const {data, error} = await supabase.auth.updateUser({
                password: formik.values.password,
            })
            if(!error) {
                router.push('/')
            } else {
                if(!ctaRef.current) return;

                setIsLoading(false)
                ctaRef.current.setAttribute('authError', '')
                ctaRef.current.addEventListener('animationend', () => {
                    ctaRef.current!.removeAttribute('authError')
                })
            }
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required')
        })
    });
    return (
        <PageContainer scrollEnabled={false}>
            <BottomSheetContainer isOpen={true} title="Enter new password" isDismissable={false}>
                <form className={styles.newPasswordForm} onSubmit={formik.handleSubmit}>
                    <InputField 
                        name={'password'} 
                        type='password' 
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder={'New password'}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password: null}
                    />
                    <InputField 
                        name={'confirmPassword'} 
                        type='password' 
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        placeholder={'Confirm password'}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword: null}
                    />
                    <button ref={ctaRef} className={styles.submit} type={'submit'} disabled={isLoading}>
                        {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                        <p>{!isLoading ? 'Log In' : ''}</p>
                    </button>
                </form>
            </BottomSheetContainer>
        </PageContainer>
    );
}

export default newPassword;