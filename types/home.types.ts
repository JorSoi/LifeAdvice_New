import { Database } from "./database.types";

export type Lesson = Database['public']['Tables']['lessons']['Row']

export type CategoryProps = Database['public']['Tables']['categories']['Row']

export type Category = 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other';

export type PageOptions = 'explore' | 'topics' | 'stories' | 'profile' | 'default'

export type CommentProps = {
    avatar_url: string, 
    username: string,
    comment: string, 
    creation_date: string
}