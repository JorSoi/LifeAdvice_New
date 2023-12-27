import { Database } from "./database.types";

export type CategoryProps = Database['public']['Tables']['categories']['Row']

export type Category = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

export type PageOptions = 'explore' | 'topics' | 'stories' | 'profile' | 'default'


export interface CommentData {
    id: number;
    content: string; 
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

export type InitiateReplyFunction = ((user_name : string) => void)

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

export type SocialType = 'whatsapp' | 'facebook' | 'reddit' | 'x' | 'discord' | 'messenger' | 'telegram';

export type AuthNavigation = {
    navigateToIntro: () => void;
    navigateToRegistration: () => void;
    navigateToSignIn: () => void;
    navigateToPasswordReset: () => void;
}

export interface Avatar {
    avatar_name: string;
    avatar_url: string;
    created_at: string;
    id: number;
}

export interface OverlayContextType {
    openOverlay : (name : string) => void
}