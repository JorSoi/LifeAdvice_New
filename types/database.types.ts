export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      advice_categories: {
        Row: {
          category_emoji: string | null
          category_name: string | null
          id: number
        }
        Insert: {
          category_emoji?: string | null
          category_name?: string | null
          id?: number
        }
        Update: {
          category_emoji?: string | null
          category_name?: string | null
          id?: number
        }
        Relationships: []
      }
      lessons: {
        Row: {
          author: string | null
          category_id: number | null
          creation_date: string | null
          downvotes: number | null
          id: number
          lesson: string | null
          reports: string | null
          upvotes: number | null
        }
        Insert: {
          author?: string | null
          category_id?: number | null
          creation_date?: string | null
          downvotes?: number | null
          id?: number
          lesson?: string | null
          reports?: string | null
          upvotes?: number | null
        }
        Update: {
          author?: string | null
          category_id?: number | null
          creation_date?: string | null
          downvotes?: number | null
          id?: number
          lesson?: string | null
          reports?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "advice_categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
