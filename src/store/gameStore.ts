import { create } from 'zustand';
import { GameSymbol, Room, Player } from '../types/types';

interface GameState {
    room: Room | null;
    currentPlayer: Player | null;
    isHost: boolean;
    setRoom: (room: Room | null) => void;
    setPlayer: (player: Player | null) => void;
    setIsHost: (isHost: boolean) => void;
    placeBet: (symbol: GameSymbol, amount: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
    room: null,
    currentPlayer: null,
    isHost: false,
    setRoom: (room) => set({ room }),
    setPlayer: (player) => set({ currentPlayer: player }),
    setIsHost: (isHost) => set({ isHost }),
    placeBet: (symbol, amount) =>
        set((state) => {
            if (!state.currentPlayer) return state;

            const updatedBets = [...(state.currentPlayer.bets || [])];
            const existingBetIndex = updatedBets.findIndex((bet) => bet.symbol === symbol);

            if (existingBetIndex >= 0) {
                updatedBets[existingBetIndex].amount += amount;
            } else {
                updatedBets.push({ symbol, amount });
            }

            return {
                currentPlayer: {
                    ...state.currentPlayer,
                    bets: updatedBets,
                    balance: state.currentPlayer.balance - amount,
                },
            };
        }),
}));