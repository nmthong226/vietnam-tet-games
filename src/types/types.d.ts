// Represents a single bet placed by a player
interface Bet {
    symbol: 'tôm' | 'cá' | 'cua' | 'gà' | 'nai' | 'bầu';
    amount: number;
}

// Represents a player in the game
interface Player {
    id: string;
    room_id: string;
    timeEnter: Date;
    status: string;
    name: string;
    balance: number;
    bets: Bet[]; // List of bets placed in the current round
}

// Represents the game state
interface GameState {
    roundNumber: number;
    isBettingOpen: boolean;
    player: Player[];
    diceResult: Bet[]; // The outcome of the dice roll
}

// Props for the betting UI component
interface BettingProps {
    player: Player;
    placeBet: (bet: Bet) => void;
    clearBets: () => void;
}

// Props for the dice roll component
interface DiceRollProps {
    diceResult: Bet[];
    isRolling: boolean;
}

export type GameSymbol = 'tôm' | 'cá' | 'cua' | 'gà' | 'nai' | 'bầu';

export interface Room {
    id: string;
    hostId: string;
    passkey: string;
    players: Player[];
    status: 'waiting' | 'betting' | 'spinning' | 'results';
    currentRound: number;
    winningSymbols?: GameSymbol[];
}