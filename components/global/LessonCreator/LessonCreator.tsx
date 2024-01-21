import { useFormik } from 'formik';
import styles from './LessonCreator.module.scss'
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import { useContext, useState } from 'react';
import useTextLimit from '@/hooks/useTextLimit';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import * as Yup from 'yup';
import Image from 'next/image';
import { OverlayContext } from '@/lib/contexts';
import { OverlayContextType } from '@/types/home.types';
import { useRouter } from 'next/navigation';

function LessonCreator({user} : {user : any}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = supabaseBrowserClient();
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType
    const router = useRouter();
    const maxLength = 250; //Max length of lesson text

    const formik = useFormik({
        initialValues: {
            'lesson': '',
            'category': -1, //Placeholder for initial value
        },
        onSubmit : async () => {
            if(!user) return;
            
            setIsLoading(true);
            const {error} = await supabase.from('lessons').insert({lesson: formik.values.lesson, profile_id: user.id, category_id: formik.values.category})
            if(!error) {
                setIsLoading(false);
                closeOverlay();
                formik.resetForm();
                router.refresh();
            } else {
                console.log(error)
                setIsLoading(false)
            }
        },
        validationSchema: Yup.object().shape({
            lesson: Yup.string().min(30, 'Your lesson needs to be at least 30 characters long').max(maxLength, 'Your lesson is too long, make sure it is bite-sized').required('Your lesson needs to be at least 30 characters long'),
            category: Yup.number().notOneOf([-1], 'Please select a topic before submitting').required('Please choose a category for your lesson'),
        })
    })

    //Determines status for the text lengthCounter
    const status = useTextLimit(maxLength, formik.values.lesson)


    return (
        <form className={styles.lessonCreator} onSubmit={formik.handleSubmit}>
            <div className={styles.textAreaWrapper}>
                <textarea 
                    name={'lesson'}
                    className={styles.textArea} 
                    placeholder='Tell us about your personal lesson' 
                    value={formik.values.lesson} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    maxLength={maxLength}
                />
                
                <p className={`${styles.errorMessage} ${(formik.errors.lesson || formik.errors.category) && formik.touched.lesson ? styles.active : null}`}>{formik.errors.lesson ? formik.errors.lesson : formik.touched.category ? formik.errors.category : null}</p>

                <p className={`${styles.lengthCounter} ${status == 'warn' ? styles.warn : status == 'stop' ? styles.stop : styles.hidden}`}>
                    {formik.values.lesson.length}/{maxLength}
                </p>

                <CategoryDropdown formik={formik}/>
            </div>
            
            <button className={styles.postButton} type={'submit'} disabled={isLoading}>
                {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                {!isLoading ? 'Share your lesson' : ''}
            </button>
        </form>

    );
}

export default LessonCreator;