import { Database } from "./database.types";

export type Lesson = Database['public']['Tables']['lessons']['Row']

export type CategoryProps = Database['public']['Tables']['categories']['Row']

export type Category = {
    category_name: 'love' | 'friendship' | 'business' | 'mental-health' | 'education' | 'travel' | 'fitness' | 'other',
    category_emoji: string
}

export type PageOptions = 'explore' | 'topics' | 'stories' | 'profile'