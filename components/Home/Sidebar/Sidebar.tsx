import styles from './Sidebar.module.scss'
import supabaseServerClient from '@/lib/supabaseServerClient';
import Link from 'next/link';

export const revalidate = 60*60*24 //Daily

async function SideBar() {

    const currentYear = new Date().getFullYear();

    const supabase = supabaseServerClient();

    const {data, error} = await supabase.from('advice_categories').select('*');
    
    return (
        <div className={styles.sidebar}>

            <h1>LifeAdvice</h1>
                
            <div style={{ width: '100%'}}>
                <Link href={'/'} className={styles.category}><span>🎲</span> Random Advices</Link>
                {/* {data?.map((category) => {
                    return( 
                        <CategoryItem key={category.id} {...category} />
                    ) 
                })} */}
            </div>

            <p className={styles.footer}>Lifelessons ©{currentYear}</p>

        </div>
    );
}

export default SideBar;