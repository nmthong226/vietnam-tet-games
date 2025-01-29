export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex items-center bg-[#ffcea4] p-3 w-full h-screen">
            {children}
        </div>
    );
};