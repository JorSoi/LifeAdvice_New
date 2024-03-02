'use client'

import { useFormik } from "formik";
import InputField from "../../InputField/InputField";
import * as Yup from 'yup'
import supabaseBrowserClient from "@/lib/supabaseBrowserClient"
import Image from "next/image";
import styles from './UserNameForm.module.scss'
import { useContext, useRef, useState } from "react";
import { OverlayContextType } from "@/types/home.types";
import { OverlayContext } from "@/lib/contexts";
import { useRouter } from "next/navigation";

function UserNameForm({user} : { user? : any}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;

    const supabase = supabaseBrowserClient();
    const router = useRouter();
    const ctaRef = useRef<HTMLButtonElement | null>(null);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userName: '',
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string()
                .min(4, 'Username must be at least 4 characters')
                .matches(/^\S*$/, 'Username cannot contain spaces')
                .required('Username is required')
                .test('userName', 'This one has already been taken. 😦 ', async (value) => {
                    const {data, error} = await supabase.from('profiles').select().eq('user_name', value)
                    if(!error && data.length) {
                        console.log('duplicate detected')
                        return false
                    } else {
                        return true
                    }
                }),
        }),
        onSubmit: async () => {
            setIsLoading(true)
            const {error} = await supabase.from('profiles').update({user_name : formik.values.userName}).eq('id', user.id);
            if(!error) {
                closeOverlay();
                setIsLoading(false);
                router.refresh();
            } else {
                if(!ctaRef.current) return;

                setIsLoading(false)

                ctaRef.current.setAttribute('error', '')
                ctaRef.current.addEventListener('animationend', () => {
                    ctaRef.current!.removeAttribute('error')
                })
            }
        },
    });

    return (
        <form className={styles.userNameForm} onSubmit={formik.handleSubmit}>
            <p className={styles.information}>Please claim a unique username before moving on.</p>
            <InputField 
                name={'userName'} 
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                placeholder={'Username'}
                autoComplete='username'
                error={formik.errors.userName ? formik.errors.userName: null}
            />
            <div className={styles.buttonWrapper}>
                <button ref={ctaRef} className={styles.submit} type={'submit'} disabled={isLoading}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Set username' : ''}
                </button>
            </div>
        </form>
    );
}

export default UserNameForm;