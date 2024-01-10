'use client'

import { useFormik } from "formik";
import InputField from "../../InputField/InputField";
import * as Yup from 'yup'
import supabaseBrowserClient from "@/lib/supabaseBrowserClient";
import BackButton from "../../Buttons/BackButton/BackButton";
import Image from "next/image";
import styles from './ResetPasswordForm.module.scss'
import { useContext, useEffect, useState } from "react";
import { AuthNavigation, OverlayContextType, settingsNavigation } from "@/types/home.types";
import { OverlayContext } from "@/lib/contexts";

function ResetPasswordForm({authNavigation, settingsNavigation, user} : {authNavigation? : AuthNavigation, settingsNavigation? : settingsNavigation, user? : any}) {

    const [initialValue, setInitialValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;
    let test;

    const supabase = supabaseBrowserClient();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: initialValue,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Incorrect email').required('Required'),
        }),
        onSubmit: async () => {
            setIsLoading(true)
            const {data, error} = await supabase.auth.resetPasswordForEmail(formik.values.email, {redirectTo: 'http://localhost:3000'});
            if(!error) {
                setIsLoading(false);
                closeOverlay();
                settingsNavigation ? settingsNavigation.navigateToOverview() : null;
            }
        },
    });

    useEffect(() => {
        user ? setInitialValue(user) : null;
    }, [user])

    return (
        <form className={styles.resetPasswordForm} onSubmit={formik.handleSubmit}>
            <p className={styles.information}>Please tell us the email address to which we should send the link to.</p>
            <InputField 
                name={'email'} 
                type='email' 
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder={'Email'}
                error={formik.touched.email && formik.errors.email ? formik.errors.email: null}
            />
            <div className={styles.buttonWrapper}>
                <BackButton onClick={authNavigation ? () => authNavigation.navigateToSignIn() : () => settingsNavigation?.navigateToOverview()}/>
                <button className={styles.submit} type={'submit'} disabled={isLoading}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Reset Password' : ''}
                </button>
            </div>
        </form>
    );
}

export default ResetPasswordForm;