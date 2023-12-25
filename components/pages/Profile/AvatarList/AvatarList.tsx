'use client'

import supabaseBrowserClient from '@/lib/supabaseBrowserClient';
import styles from './AvatarList.module.scss'
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import { useEffect, useState } from 'react';
import { Avatar } from '@/types/home.types';
import Image from 'next/image';

function AvatarList() {

    //still needs to fetch the user's current avatarId and set it to be hightlighted at the very beginning.

    const [avatarList, setAvatarList] = useState<Avatar[]>([])
    const [avatarId, setAvatarId] = useState<number>(); //for currently selected avatar
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const supabase = supabaseBrowserClient();


    const selectAvatar = (avatarId : number) => {
        setAvatarId(avatarId);
    }

    const handleClick = async () => {
        setIsLoading(true);
        const {data, error} = await supabase.from('profiles').update({avatar_id: avatarId}).eq('id', '782049b9-91f5-410b-ad7c-e327a5ec898f') //must be dynamic
        if(!error) {
            setIsLoading(false);
        }
    }

    const getAvatars = async () => {
        const {data, error} = await supabase.from('avatars').select('*')
        if (!error) {
            setAvatarList(data)
            console.log(data)
        }
    }

    //Gets the user's current avatarId
    const getCurrentAvatar = async () => {
        const {data, error} = await supabase.from('profiles').select('avatar_id').eq('id', '782049b9-91f5-410b-ad7c-e327a5ec898f').single() //must be dynamic
        if (!error) {
            setAvatarId(data.avatar_id)
        } 
    }
    

    useEffect(() => {
        getCurrentAvatar();
        getAvatars();
}, [])

    return (
        <>
            <div className={styles.avatarList}>
                {
                    avatarList.map((avatar) => {
                        return <AvatarIcon key ={avatar.id} avatar={avatar} isActive={avatarId == avatar.id ? true : false} selectAvatar={selectAvatar}/>
                    })
                }
            </div>
            <button className={styles.saveButton} disabled={!avatarId} onClick={handleClick}>
                    {isLoading && <Image src={'/spinner-animation.gif'} width={17} height={17} alt='' /> }
                    {!isLoading ? 'Save' : ''}
                </button>
        </>
    );
}

export default AvatarList;