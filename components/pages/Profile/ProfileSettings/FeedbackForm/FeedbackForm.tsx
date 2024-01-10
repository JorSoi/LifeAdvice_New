'use client'

import { useFormik } from 'formik';
import styles from './FeedbackForm.module.scss'
import { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType, settingsNavigation } from '@/types/home.types';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import Image from 'next/image';
import BackButton from '@/components/global/Buttons/BackButton/BackButton';


function FeedbackForm({ user, settingsNavigation } : { user : any, settingsNavigation : settingsNavigation }) {

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;
    const supabase = supabaseBrowserClient()

    const formik = useFormik({
        initialValues:{
            feedback: '',
        },
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

    useEffect(() => {
        const {feedback} = formik.values
        feedback.length < 5 ? setIsDisabled(true) : setIsDisabled(false)
    }, [formik.values.feedback])


    return (
        <form className={styles.feedbackForm} onSubmit={formik.handleSubmit}>
            <h3>Your Feedback</h3>
            <p>Tell us whatever it is that you want to tell us. We are always trying to improve LifeAdvice.</p>
            <textarea 
                className={styles.textArea} 
                name={'feedback'}
                placeholder='Tell us your ideas, wishes and general feedback!' 
                value={formik.values.feedback} 
                onChange={formik.handleChange} 
            />
            <div className={styles.buttonWrapper}>
                <BackButton onClick={settingsNavigation.navigateToOverview}/>
                <button className={`${styles.submitButton} ${isDisabled ? styles.disabled : null}`} type='submit' disabled={isDisabled}>
                {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Send Feedback' : ''}
            </button>
            </div>
        </form>
    );
}

export default FeedbackForm;
