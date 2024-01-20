import { OverlayContextType, settingsNavigation } from '@/types/home.types';
import styles from './DangerZone.module.scss'
import Image from 'next/image';
import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import BackButton from '@/components/global/Buttons/BackButton/BackButton';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { OverlayContext } from '@/lib/contexts';

function DangerZone({settingsNavigation, user} : {settingsNavigation : settingsNavigation, user : any}) {

    const supabase = supabaseBrowserClient();
    const router = useRouter();
    const {closeOverlay} = useContext(OverlayContext) as OverlayContextType;
    
    const handleDeletion = async () => {
        let hasConfirmed = confirm('By deleting your account, you will lose all your saved and created lectures. This action cannot be undone.')

        if (hasConfirmed) {
            let { data, error } = await supabase.rpc('deleteUser')
            if (!error) {
                router.refresh();
                closeOverlay();
            } else {
                console.log(error)
            }
        }
    }
    
    return (
        <div className={styles.dangerZone}>
            <BackButton onClick={() => settingsNavigation.navigateToOverview()}/>
            <button className={styles.deletionButton} onClick={handleDeletion}>
                <Image src={'/icons/delete-icon.svg'} width={21} height={21} alt='' />
                Delete Account
            </button>
        </div>
    );
}

export default DangerZone;