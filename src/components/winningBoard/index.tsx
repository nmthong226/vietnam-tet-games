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
                        className="relative flex flex-col bg-yellow-50 shadow-lg p-6 border-[#FEC548] border-10 rounded-lg w-[60%] h-[90%]"
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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WinningBoard;