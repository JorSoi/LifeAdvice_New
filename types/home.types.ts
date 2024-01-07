import { Database } from "./database.types";

//Must be extended if new category is introduced. 
export type CategoryNames = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

export type Category = {
    id: number
    category_name: CategoryNames
    category_emoji: string
}

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
    categories: Category
    author: string | null
    category_id: number
    created_at: string
    downvotes: number
    id: number
    lesson: string
    profile_id: string | null
    upvotes: number
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
    openOverlay : (name : string, lessonid? : number) => void
}

//Used in ProfileCard Component
export interface SavedLessonCount {
    bookmarkedCount: number | null;
    likedCount: number | null;
    createdCount: number | null;
}