'use client'

import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType, settingsNavigation } from '@/types/home.types';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import BackButton from '@/components/global/Buttons/BackButton/BackButton';
import styles from './FeedbackForm.module.scss'
import Image from 'next/image';
import * as Yup from 'yup';


function FeedbackForm({ user, settingsNavigation } : { user : any, settingsNavigation : settingsNavigation }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;
    const supabase = supabaseBrowserClient()

    const formik = useFormik({
        initialValues:{
            feedback: '',
        },
        validationSchema: Yup.object().shape({
            feedback: Yup.string().min(6, 'Please tell us more.').max(900, 'Text limit reached').required(''),
        }),
        onSubmit: async () => {
            setIsLoading(true)
            const {data, error} = await supabase.from('user_feedback').insert({profile_id: user.id, feedback: formik.values.feedback})

            if (!error) {
                setIsLoading(false);
                closeOverlay();
                formik.resetForm();
                settingsNavigation.navigateToOverview()
            } else {
                setIsLoading(false)
            }
        }

    })

    console.log(formik.touched.feedback)


    return (
        <form className={styles.feedbackForm} onSubmit={formik.handleSubmit}>
            <p className={styles.information}>Tell us whatever it is that you want to tell us. We are always trying to improve LifeAdvice.</p>
            <div className={styles.textAreaWrapper}>
                <textarea 
                    className={styles.textArea} 
                    name={'feedback'}
                    placeholder='Tell us your ideas, wishes and general feedback!' 
                    value={formik.values.feedback} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                />
                <p className={`${styles.errorMessage} ${formik.touched.feedback ? styles.active : null}`}>{formik.errors.feedback}</p>
            </div>


            <div className={styles.buttonWrapper}>
                <BackButton onClick={settingsNavigation.navigateToOverview}/>
                <button className={styles.submit} type='submit' disabled={isLoading}>
                {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Send Feedback' : ''}
            </button>
            </div>
        </form>
    );
}

export default FeedbackForm;
