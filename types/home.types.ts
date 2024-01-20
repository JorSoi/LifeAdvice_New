import { Dispatch, SetStateAction } from "react";

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



//Context Types
export interface OverlayContextType {
    openOverlay : (name : OverlayNames, lessonid? : number) => void
    closeOverlay: () => void
}

export type OverlayNames = 'authentication' | 'avatars' | 'comments' | 'socials' | 'general-settings' | ''

export interface SavedLessonsContextType {
    setSelected : Dispatch<SetStateAction<"bookmarked" | "liked" | "created">>
    selected: "bookmarked" | "liked" | "created"
}


//Path Navigations within BottomSheets
export interface authNavigation {
    navigateToIntro: () => void
    navigateToRegistration: () => void
    navigateToSignIn: () => void
    navigateToPasswordReset: () => void
}


export interface settingsNavigation {
    navigateToOverview: () => void
    navigateToFeedbackForm: () => void
    navigateToNotifications: () => void
    navigateToPasswordChange: () => void
    navigateToDangerZone: () => void
}



//Used in ProfileCard Component
export interface SavedLessonCount {
    bookmarkedCount: number | null;
    likedCount: number | null;
    createdCount: number | null;
}

//Used in Settings
export interface NotificationPreferences {
    posts: {
        likes: boolean,
        replies: boolean,
        bookmarked: boolean,
    },
    other: {
        weekly_lesson: boolean,
        monthly_story: boolean,
    }
}