import { motion, AnimatePresence } from "framer-motion";

interface WinningBoardProps {
    isOpen: boolean;
}

const WinningBoard: React.FC<WinningBoardProps> = ({ isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
                    <motion.div
                        initial={{ y: "100vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100vh", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.15 }}
                        className="relative bg-white shadow-lg p-6 border-[#FEC548] border-10 rounded-lg w-[60%] h-[90%]"
                    >
                        {/* Image Positioned at the Top Center */}
                        <div className="top-0 left-1/2 absolute flex -translate-x-1/2">
                            <img src="/thanhtieude.png" className="" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WinningBoard;