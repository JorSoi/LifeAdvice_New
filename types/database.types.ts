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
      avatars: {
        Row: {
          avatar_name: string
          avatar_url: string
          background_colors: Json
          created_at: string
          id: number
        }
        Insert: {
          avatar_name: string
          avatar_url: string
          background_colors?: Json
          created_at?: string
          id?: number
        }
        Update: {
          avatar_name?: string
          avatar_url?: string
          background_colors?: Json
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      categories: {
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
      comment_upvoted_by: {
        Row: {
          comment_id: number | null
          created_at: string
          id: number
          profile_id: string
        }
        Insert: {
          comment_id?: number | null
          created_at?: string
          id?: number
          profile_id: string
        }
        Update: {
          comment_id?: number | null
          created_at?: string
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_upvoted_by_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_upvoted_by_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: number
          lesson_id: number | null
          profile_id: string | null
          reports_count: number
          upvotes: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          lesson_id?: number | null
          profile_id?: string | null
          reports_count?: number
          upvotes?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          lesson_id?: number | null
          profile_id?: string | null
          reports_count?: number
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      comments_replies: {
        Row: {
          comment_id: number | null
          created_at: string
          id: number
          recipient_profile_id: string
        }
        Insert: {
          comment_id?: number | null
          created_at?: string
          id?: number
          recipient_profile_id: string
        }
        Update: {
          comment_id?: number | null
          created_at?: string
          id?: number
          recipient_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_replies_recipient_profile_id_fkey"
            columns: ["recipient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lesson_upvoted_by: {
        Row: {
          created_at: string
          id: number
          lesson_id: number | null
          profile_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id?: number | null
          profile_id: number
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number | null
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_upvoted_by_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
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
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_id: number
          created_at: string
          id: string
          user_name: string
        }
        Insert: {
          avatar_id: number
          created_at?: string
          id: string
          user_name: string
        }
        Update: {
          avatar_id?: number
          created_at?: string
          id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_avatar_id_fkey"
            columns: ["avatar_id"]
            isOneToOne: false
            referencedRelation: "avatars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      downvoteComment: {
        Args: {
          comment_id: number
        }
        Returns: undefined
      }
      get_random_lessons: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      upvoteComment: {
        Args: {
          comment_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
