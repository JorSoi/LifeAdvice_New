import { Database } from "./database.types";

export type CategoryProps = Database['public']['Tables']['categories']['Row']

export type Category = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

export type PageOptions = 'explore' | 'topics' | 'stories' | 'profile' | 'default'


export interface CommentData {
    id: number;
    comment: string; 
    upvotes: number;
    created_at: string;
    profiles: {
        id: number;
        user_name: string;
        avatars: {
            avatar_url: string;
        }  
    }
}

export type Lesson = {
    categories: any
    author: string | null
    category_id: number | null
    creation_date: string | null
    downvotes: number | null
    id: number
    lesson: string | null
    reports: string | null
    upvotes: number | null
}

export type InitiateReplyFunction = ((creator_id : number, comment_id : number, user_name : string) => void)

export type SocialType = 'whatsapp' | 'facebook' | 'reddit' | 'x' | 'discord' | 'messenger' | 'telegram';