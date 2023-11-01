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
      album: {
        Row: {
          artist: number | null
          created_at: string
          id: number
          name: string | null
          release_date: string | null
        }
        Insert: {
          artist?: number | null
          created_at?: string
          id?: number
          name?: string | null
          release_date?: string | null
        }
        Update: {
          artist?: number | null
          created_at?: string
          id?: number
          name?: string | null
          release_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "album_artist_fkey"
            columns: ["artist"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          }
        ]
      }
      artists: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      artists_albums: {
        Row: {
          album_id: number | null
          artist_id: number | null
          created_at: string
          id: number
        }
        Insert: {
          album_id?: number | null
          artist_id?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          album_id?: number | null
          artist_id?: number | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "artists_albums_album_id_fkey"
            columns: ["album_id"]
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_albums_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          }
        ]
      }
      playlists: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      playlists_songs: {
        Row: {
          added_to_playlist: string
          id: number
          playlist_id: number | null
          song_id: number | null
        }
        Insert: {
          added_to_playlist?: string
          id?: number
          playlist_id?: number | null
          song_id?: number | null
        }
        Update: {
          added_to_playlist?: string
          id?: number
          playlist_id?: number | null
          song_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlists_songs_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "songs"
            referencedColumns: ["id"]
          }
        ]
      }
      songs: {
        Row: {
          album: number | null
          artist: number | null
          created_at: string
          id: number
          name: string | null
          release_date: string | null
        }
        Insert: {
          album?: number | null
          artist?: number | null
          created_at?: string
          id?: number
          name?: string | null
          release_date?: string | null
        }
        Update: {
          album?: number | null
          artist?: number | null
          created_at?: string
          id?: number
          name?: string | null
          release_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_album_fkey"
            columns: ["album"]
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_artist_fkey"
            columns: ["artist"]
            referencedRelation: "artists"
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
