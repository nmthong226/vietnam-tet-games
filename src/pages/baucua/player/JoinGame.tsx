import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dice6, DollarSign, Clock } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useGameStore } from '../../../store/gameStore';
import type { Room, GameSymbol, Player } from '../../../types/types';

const SYMBOLS: GameSymbol[] = ['tôm', 'cá', 'cua', 'gà', 'nai', 'bầu'];

export default function JoinGame() {
    const roomId = 'join';
    const navigate = useNavigate();
    const [room] = useState<Room | null>(null);
    const [playerName, setPlayerName] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const [isJoinForm] = useState(roomId === 'join');
    const { currentPlayer, setPlayer } = useGameStore();

    useEffect(() => {
        if (!currentPlayer) return;
    
        const playerSubscription = supabase
            .channel(`player:${currentPlayer.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'players',
                    filter: `id=eq.${currentPlayer.id}`,
                },
                (payload) => {
                    console.log('Player update:', payload);
                    setPlayer(payload.new as Player);
                }
            )
            .subscribe();
    
        return () => {
            playerSubscription.unsubscribe();
        };
    }, [currentPlayer]);

    const joinRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomCode.trim() || !playerName.trim()) return;
    
        setIsJoining(true);
        try {
            // Mocked player_id (Replace this with actual player_id retrieval)
            const playerId = "747340c4-54d7-43be-aa25-629c1dbd2f91";
    
            // 1️⃣ Check if the room exists & is open
            const { data: room, error: roomError } = await supabase
                .from("rooms")
                .select("*")
                .eq("passkey", roomCode.trim())
                .eq("status", "waiting")
                .single();
    
            if (roomError || !room) {
                alert("Invalid room code or room is not open.");
                throw roomError;
            }
    
            // 2️⃣ Assign the player to the room & set status = "waiting"
            const { error: updateError } = await supabase
                .from("players")
                .update({ room_id: room.id, name: playerName.trim(), status: "waiting" })
                .eq("user_id", playerId);
                
            if (updateError) throw updateError;
    
            setPlayer({
                id: playerId, room_id: room.id, name: playerName.trim(), status: "waiting",
                timeEnter: new Date(),
                balance: 0,
                bets: []
            });
    
            // 3️⃣ Listen for approval from the host
            subscribeToApproval(playerId);
    
        } catch (error) {
            console.error("Error joining room:", error);
        } finally {
            setIsJoining(false);
        }
    };

    const subscribeToApproval = (playerId: string) => {
        const subscription = supabase
            .channel(`player:${playerId}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "players", filter: `id=eq.${playerId}` },
                (payload) => {
                    const updatedPlayer = payload.new as Player;
                    console.log("Player status updated:", updatedPlayer);
    
                    if (updatedPlayer.status === "approved") {
                        navigate(`/baucua/game/${updatedPlayer.room_id}`); // 🎮 Go to gameboard
                    } else if (updatedPlayer.status === "rejected") {
                        alert("The host has rejected your request.");
                    }
    
                    setPlayer(updatedPlayer);
                }
            )
            .subscribe();
    
        return () => subscription.unsubscribe();
    };
    

    // Show join form
    const renderJoinForm = () => (
        <div className="flex justify-center items-center bg-gradient-to-br from-[#FFD6AC] to-[#ffc082] p-4 w-full h-full">
            <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md">
                <h1 className="mb-6 font-bold text-2xl">Join Game Room</h1>
                <form onSubmit={joinRoom} className="space-y-4">
                    <div>
                        <label htmlFor="roomCode" className="block font-medium text-gray-700 text-sm">
                            Room Code
                        </label>
                        <input
                            type="text"
                            id="roomCode"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            className="block shadow-sm mt-1 border-gray-300 focus:border-red-500 rounded-md focus:ring focus:ring-red-200 w-full"
                            placeholder="Enter room code"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700 text-sm">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="block shadow-sm mt-1 border-gray-300 focus:border-red-500 rounded-md focus:ring focus:ring-red-200 w-full"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!roomCode.trim() || !playerName.trim()}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg w-full text-white transition-colors"
                    >
                        Join Game
                    </button>
                </form>
            </div>
        </div>
    );

    // Show waiting screen if player is pending
    if (currentPlayer?.status === 'pending') {
        return (
            <div className="flex justify-center items-center bg-yellow-100 p-4 min-h-screen">
                <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md text-center">
                    <Clock className="mx-auto mb-4 w-16 h-16 text-yellow-600" />
                    <h1 className="mb-2 font-bold text-2xl">Waiting for Host Approval</h1>
                    <p className="mb-6 text-gray-600">
                        You have requested to join. Please wait for the host to approve.
                    </p>
                </div>
            </div>
        );
    }

    // Show join form if we're on the join page
    if (isJoinForm) {
        return renderJoinForm();
    }

    // Show loading if room is null but not in error state
    if (!room) {
        return (
            <div className="flex justify-center items-center p-4 min-h-screen">
                <div className="text-white text-center">
                    <Dice6 className="mx-auto mb-4 w-16 h-16 animate-spin" />
                    <p>Loading room...</p>
                </div>
            </div>
        );
    }

    // Show player join form if not joined yet
    if (!currentPlayer) {
        return (
            <div className="flex justify-center items-center p-4 min-h-screen">
                <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md">
                    <h1 className="mb-6 font-bold text-2xl">Join Game Room</h1>
                    <form onSubmit={joinRoom} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700 text-sm">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                className="block shadow-sm mt-1 border-gray-300 focus:border-red-500 rounded-md focus:ring focus:ring-red-200 w-full"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isJoining}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg w-full text-white transition-colors"
                        >
                            {isJoining ? 'Joining...' : 'Join Game'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Show game interface for joined player
    return (
        <div className="p-6 min-h-screen">
            <div className="mx-auto max-w-4xl">
                {/* Player Info */}
                <div className="bg-white shadow-xl mb-8 p-6 rounded-xl">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl">{currentPlayer.name}</h1>
                        <div className="flex items-center gap-2 text-green-600">
                            <DollarSign className="w-5 h-5" />
                            <span className="font-bold text-xl">{currentPlayer.balance}</span>
                        </div>
                    </div>
                </div>

                {/* Betting Grid */}
                <div className="gap-6 grid grid-cols-2 md:grid-cols-3">
                    {SYMBOLS.map((symbol) => (
                        <div
                            key={symbol}
                            className="bg-white shadow-xl p-6 rounded-xl text-center"
                        >
                            <div className="mb-4 text-4xl">
                                {symbol === 'nai' && '🦌'}
                                {symbol === 'bầu' && '🎃'}
                                {symbol === 'gà' && '🐓'}
                                {symbol === 'cá' && '🐟'}
                                {symbol === 'cua' && '🦀'}
                                {symbol === 'tôm' && '🦐'}
                            </div>
                            <h3 className="mb-4 font-medium text-lg capitalize">{symbol}</h3>
                            <div className="gap-2 grid grid-cols-3">
                                {[100, 200, 500].map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => {/* TODO: Implement betting */ }}
                                        className="bg-red-100 hover:bg-red-200 px-2 py-1 rounded-lg text-red-800 text-sm transition-colors"
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}