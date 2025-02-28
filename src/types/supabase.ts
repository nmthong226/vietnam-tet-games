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
            rooms: {
                Row: {
                    id: string
                    host_id: string
                    passkey: string
                    status: 'waiting' | 'betting' | 'spinning' | 'results'
                    current_round: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    host_id: string
                    passkey: string
                    status?: 'waiting' | 'betting' | 'spinning' | 'results'
                    current_round?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    host_id?: string
                    passkey?: string
                    status?: 'waiting' | 'betting' | 'spinning' | 'results'
                    current_round?: number
                    created_at?: string
                }
            }
            players: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    balance: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    balance?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    balance?: number
                    created_at?: string
                }
            }
            bets: {
                Row: {
                    id: string
                    room_id: string
                    player_id: string
                    symbol: string
                    amount: number
                    round: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    room_id: string
                    player_id: string
                    symbol: string
                    amount: number
                    round: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    room_id?: string
                    player_id?: string
                    symbol?: string
                    amount?: number
                    round?: number
                    created_at?: string
                }
            }
            rounds: {
                Row: {
                    id: string
                    room_id: string
                    round_number: number
                    winning_symbols: string[]
                    created_at: string
                }
                Insert: {
                    id?: string
                    room_id: string
                    round_number: number
                    winning_symbols: string[]
                    created_at?: string
                }
                Update: {
                    id?: string
                    room_id?: string
                    round_number?: number
                    winning_symbols?: string[]
                    created_at?: string
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
            [_ in never]: never
        }
    }
}