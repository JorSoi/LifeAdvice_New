import { Database } from "./database.types";

export type Lesson = Database['public']['Tables']['lessons']['Row']

export type CategoryProps = Database['public']['Tables']['categories']['Row']

export type Category = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

export type PageOptions = 'explore' | 'topics' | 'stories' | 'profile' | 'default'

export type CommentProps = {
    comment_id: number,
    avatar_url: string, 
    user_name: string,
    comment: string, 
    created_at: string
}

export interface CommentData extends CommentProps {
    id: number,
    profiles: {
        id: number;
        user_name: string
        avatars: {
            avatar_url: string
        }  
    }
}

export type InitiateReplyFunction = ((creator_id : number, comment_id : number, user_name : string) => void)

export type SocialType = 'whatsapp' | 'facebook' | 'reddit' | 'x' | 'discord' | 'messenger' | 'telegram';