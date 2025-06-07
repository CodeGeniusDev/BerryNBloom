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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          created_at: string
          updated_at: string
          cancellable_until: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          shipping_address: Json
          created_at?: string
          updated_at?: string
          cancellable_until?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          shipping_address?: Json
          created_at?: string
          updated_at?: string
          cancellable_until?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    }
  }
}