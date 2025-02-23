import { motion, AnimatePresence } from "framer-motion";

type PlayerBetProps = {
    isOpen: boolean;
    symbol: string;
    playerList: Player[];
}

const PlayerBet: React.FC<PlayerBetProps> = ({ isOpen, symbol, playerList }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80">
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
                        className="relative flex flex-col bg-yellow-50 shadow-lg px-6 pt-6 border-[#425D51] border-6 rounded-lg w-[35%] h-[73%]"
                    >
                        <div className="-top-8 left-0 absolute flex justify-center items-center w-full">
                            <img src="/thanhtieude2.png" className="w-[90%]" />
                        </div>
                        <div
                            className="flex flex-col items-center bg-amber-100 my-10 p-6 rounded-xl h-[480px]"
                            style={{
                                backgroundImage: "url('/winning.png')",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex flex-col items-center space-y-1 w-full h-[400px] overflow-y-auto">
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
                </div>
            )}
        </AnimatePresence>
    );
};

export default PlayerBet;