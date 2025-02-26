import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Crown, Users } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useGameStore } from '../../../store/gameStore';
import type { Player } from '../../../types/types';

export default function HostRoom() {
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [copied, setCopied] = useState(false);
  const { setIsHost } = useGameStore();

  useEffect(() => {
    setIsHost(true);
    createRoom();

    return () => setIsHost(false);
  }, [setIsHost]);

  const createRoom = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const passkey = Math.random().toString(36).substring(2, 8).toUpperCase();

      const { data: room, error } = await supabase
        .from('rooms')
        .insert([
          {
            host_id: user.id,
            passkey,
            status: 'waiting',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setRoomCode(passkey);

      // Subscribe to player updates
      const playersSubscription = supabase
        .channel(`room:${room.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'players',
            filter: `room_id=eq.${room.id}`,
          },
          (payload: any) => {
            console.log('Player change:', payload);
            // Update players list
            supabase
              .from('players')
              .select('*')
              .eq('room_id', room.id)
              .then(({ data }: { data: Player[] }) => {
                if (data) setPlayers(data as Player[]);
              });
          }
        )
        .subscribe();

      return () => {
        playersSubscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const joinUrl = `${window.location.origin}/play/${roomCode}`;

  return (
    <div className="p-6 min-h-screen">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
        {/* Room Info */}
        <div className="bg-white shadow-xl p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="font-bold text-2xl">Host Room</h1>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <QRCodeSVG value={joinUrl} size={200} />
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-3xl">{roomCode}</span>
              <button
                onClick={copyRoomCode}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
              {copied && (
                <span className="text-green-600 text-sm">Copied!</span>
              )}
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white shadow-xl p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-blue-500" />
            <h2 className="font-bold text-2xl">Players</h2>
          </div>

          <div className="space-y-4">
            {players.length === 0 ? (
              <p className="py-8 text-gray-500 text-center">
                Waiting for players to join...
              </p>
            ) : (
              players.map((player) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <span className="font-medium">{player.name}</span>
                  <span className="text-green-600">
                    ${player.balance.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}