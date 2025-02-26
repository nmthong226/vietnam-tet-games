import { motion, AnimatePresence } from "framer-motion";

type PlayerBetProps = {
    isOpen: boolean;
    symbol: string;
    playerList: Player[];
}

const symbolData = [
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

const PlayerBet: React.FC<PlayerBetProps> = ({ isOpen, symbol, playerList }) => {
    const selectedSymbol = symbolData.find(item => item.name === symbol);
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
                        className="relative flex flex-col justify-center bg-yellow-50 shadow-lg px-6 pt-6 border-[#425D51] border-6 rounded-lg w-[35%] h-[73%]"
                    >
                        <div className="-top-8 left-0 absolute flex justify-center items-center w-full">
                            <img src="/thanhtieude2.png" className="w-[90%]" />
                        </div>
                        <div className="flex flex-col justify-center items-center mb-4 w-full">
                            <img src={selectedSymbol?.image} className="w-40 h-40" alt={selectedSymbol?.name} />
                            <p className="font-semibold text-lg capitalize">{selectedSymbol?.name}</p>
                        </div>
                        <div
                            className="flex flex-col items-center bg-amber-100 p-6 rounded-xl h-[280px]"
                            style={{
                                backgroundImage: "url('/winning.png')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex flex-col items-center space-y-1 w-full h-[240px] overflow-y-auto">
                                    {playerList && playerList.map((player, index) =>
                                        <div
                                            key={index}
                                            className="flex items-center bg-white shadow-md py-2 rounded-lg w-[90%] max-w-2xl h-fit">
                                            <p className="flex px-2 w-[50%]">
                                                {player.name}
                                            </p>
                                            <p className="flex justify-end items-center px-2 w-[50%]">
                                                đã đặt <span className="ml-2 font-bold text-lg">{player.bets.find(bet => bet.symbol === symbol)?.amount}</span>
                                            </p>
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

export default PlayerBet;