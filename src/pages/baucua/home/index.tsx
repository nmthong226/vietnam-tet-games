import { useNavigate } from 'react-router-dom';
import { Dice6, Users } from 'lucide-react';

export default function HomeBauCua() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center bg-gradient-to-br from-[#FFD6AC] to-[#ffc082] p-4 w-full h-full">
            <div className="bg-white shadow-2xl p-8 rounded-xl w-full max-w-md">
                <h1 className="mb-8 font-bold text-red-800 text-4xl text-center">
                    Bầu Cua Game
                </h1>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/baucua/host')}
                        className="flex justify-center items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-4 rounded-lg w-full text-white transition-colors"
                    >
                        <Users size={24} />
                        Host a Game
                    </button>

                    <button
                        onClick={() => navigate('/play/join')}
                        className="flex justify-center items-center gap-3 bg-gray-800 hover:bg-gray-900 px-6 py-4 rounded-lg w-full text-white transition-colors"
                    >
                        <Dice6 size={24} />
                        Join a Game
                    </button>
                </div>
            </div>
        </div>
    );
}