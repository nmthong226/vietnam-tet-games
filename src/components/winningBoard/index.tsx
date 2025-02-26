import { motion, AnimatePresence } from "framer-motion";
import { FcCancel } from "react-icons/fc";
import { Player } from "../../types/types";

interface WinningBoardProps {
    isOpen: boolean;
    result: number[];
    playerList: Player[];
}

// Define the type for resultData
interface ResultItem {
    name: string;
    image: string;
}

const resultData = [
    {
        name: "tôm",
        image: "/dat_tom.png"
    },
    {
        name: "cá",
        image: "/dat_ca.png"
    },
    {
        name: "cua",
        image: "/dat_cua.png"
    },
    {
        name: "gà",
        image: "/dat_ga.png"
    },
    {
        name: "nai",
        image: "/dat_nai.png"
    },
    {
        name: "bầu",
        image: "/dat_bau.png"
    },
]

const WinningBoard: React.FC<WinningBoardProps> = ({ isOpen, result, playerList }) => {
    // Group results by image
    const groupedResults = Object.values(
        result.reduce((acc, index) => {
            const item = resultData[index];
            if (!item) return acc; // Safety check
            if (!acc[item.image]) acc[item.image] = [];
            acc[item.image].push(item);
            return acc;
        }, {} as Record<string, ResultItem[]>)
    );

    // Render function
    const renderResult = () =>
        groupedResults.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col justify-center items-center">
                <div className="flex">
                    {group.map((item, index) => (
                        <img key={index} src={item.image} className="w-40 h-40" alt={item.name} />
                    ))}
                </div>
                {group.length > 1 ? (
                    <p className="bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#FF8000] to-[#FF0000] font-bold text-transparent text-2xl capitalize">{group[0].name} {`X${group.length}`} </p>
                ) : (
                    <p className="font-semibold text-2xl capitalize">{group[0].name}</p>
                )}
            </div>
        ));

    const getWinningPlayers = (players: Player[], result: number[]): { name: string; bets: string; balance: number }[] => {
        return players
            .map(player => {
                // Find the winning bets for this player
                const winningBets = player.bets.filter(bet =>
                    result.some(index => bet.symbol === resultData[index].name)
                );

                if (winningBets.length === 0) return null; // Skip players with no winning bets

                // Calculate total winnings (assuming a 1:1 payout)
                const totalWinnings = winningBets.reduce((sum, bet) => sum + bet.amount, 0);
                const updatedBalance = player.balance + totalWinnings;

                return {
                    name: player.name,
                    bets: winningBets.map(bet => `${bet.symbol} (${bet.amount})`).join(', '),
                    balance: updatedBalance
                };
            })
            .filter((player): player is { name: string; bets: string; balance: number } => player !== null); // Ensure correct type
    };

    const winningPlayers = getWinningPlayers(playerList ?? [], result);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="z-50 fixed inset-0 flex justify-center items-center bg-black/80">
                    <motion.div
                        variants={{
                            hidden: { y: "100vh", opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: { type: "spring", stiffness: 200, damping: 15, duration: 0.15 }
                            },
                            exit: { y: "100vh", opacity: 0 }
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative flex flex-col bg-yellow-50 shadow-lg px-6 pt-6 border-[#FEC548] border-10 rounded-lg w-[60%] h-[90%]"
                    >
                        {/* Image Positioned at the Top Center */}
                        <div className="top-0 left-1/2 absolute flex -translate-x-1/2">
                            <img src="/thanhtieude.png" className="" />
                        </div>
                        <div className="flex flex-row justify-center items-center mt-20 w-full">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}  // Delays inner animation
                            >
                                <div className="flex space-x-4">
                                    {renderResult()}
                                </div>
                            </motion.div>
                        </div>
                        <div
                            className="flex flex-col items-center bg-amber-100 my-10 p-6 rounded-xl h-[320px]"
                            style={{
                                backgroundImage: "url('/winning.png')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <p className="bg-gradient-to-r from-amber-300/40 to-amber-400/60 mb-4 p-1.5 px-8 rounded-xl font-semibold text-amber-700 text-xl">Danh sách người chơi đã trúng</p>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex items-center bg-amber-300 rounded-lg w-full max-w-2xl h-10">
                                    <p className="flex px-2 w-[33.3%] font-semibold">
                                        Người chơi
                                    </p>
                                    <p className="flex justify-center w-[33.3%] font-semibold">
                                        Tiền thưởng
                                    </p>
                                    <p className="flex justify-end px-2 w-[33.3%] font-semibold">
                                        Tổng tiền
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-1 w-full h-[180px] overflow-y-auto">
                                    {winningPlayers.length > 0 ? winningPlayers.map((winner, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-white shadow-md py-2 rounded-lg w-full max-w-2xl h-fit"
                                        >
                                            {/* Player Name */}
                                            <p className="flex px-2 w-[33.3%] font-semibold">
                                                {winner.name}
                                            </p>

                                            {/* Winning Bets */}
                                            <p className="flex justify-center w-[33.3%] font-semibold capitalize">
                                                {winner.bets}
                                            </p>

                                            {/* Updated Balance */}
                                            <p className="flex justify-end px-2 w-[33.3%] font-semibold">
                                                {winner.balance}
                                            </p>
                                        </div>
                                    )) : (
                                        <div className="flex justify-center items-center bg-white shadow-md py-2 rounded-lg w-full max-w-2xl h-fit text-gray-600">
                                            <FcCancel className="mr-1 size-5" />
                                            <p>Không có người chơi thắng</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WinningBoard;