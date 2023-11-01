import NavBar from '@/components/NavBar'
import styles from './page.module.css'
import supabaseServerClient from '@/lib/supabaseServerClient'

export default async function Home() {

  const supabase = supabaseServerClient();

    const {data, error} = await supabase.auth.getUser();
 

  if(data.user) {
    return (
      <main className={styles.main}>
        <NavBar />
        welcome back {data.user.email}
      </main>
    )
  } else {
    return (
      <main className={styles.main}>
        <NavBar />
        please sign in
      </main>)
  }




}
