import { motion, AnimatePresence } from "framer-motion";

interface WinningBoardProps {
    isOpen: boolean;
    result: number[];
}

// Define the type for resultData
interface ResultItem {
    name: string;
    image: string;
}

const resultData = [
    {
        name: "Tôm",
        image: "/dat_tom.png"
    },
    {
        name: "Cá",
        image: "/dat_ca.png"
    },
    {
        name: "Cua",
        image: "/dat_cua.png"
    },
    {
        name: "Gà",
        image: "/dat_ga.png"
    },
    {
        name: "Nai",
        image: "/dat_nai.png"
    },
    {
        name: "Bầu",
        image: "/dat_bau.png"
    },
]

const WinningBoard: React.FC<WinningBoardProps> = ({ isOpen, result }) => {
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
                <p className="font-semibold text-2xl">{group[0].name} {group.length > 1 ? `X${group.length}` : ''} </p>
            </div>
        ));

    const winners = [
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
        { name: "Nguyễn Văn A", prize: "4000", total: "4000" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
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
                            style={{ backgroundImage: "url('/winning.png')",
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
                                    {winners.map((winner, index) =>
                                        <div
                                            key={index}
                                            className="flex items-center bg-white py-2 rounded-lg w-full max-w-2xl h-fit">
                                            <p className="flex px-2 w-[33.3%] font-semibold">
                                                {winner.name}
                                            </p>
                                            <p className="flex justify-center w-[33.3%] font-semibold">
                                                {winner.prize}
                                            </p>
                                            <p className="flex justify-end px-2 w-[33.3%] font-semibold">
                                                {winner.total}
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

export default WinningBoard;