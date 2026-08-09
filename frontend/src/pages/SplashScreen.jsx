import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/auth");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">

          
            {/* Moving glow 1 */}
            <motion.div
                className="absolute h-72 w-72 rounded-full bg-pink-400/20 blur-[100px]"
                animate={{
                    x: [-150, 250, -100],
                    y: [-100, 180, -50],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Moving glow 2 */}
            <motion.div
                className="absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-500/20 blur-[110px]"
                animate={{
                    x: [100, -200, 50],
                    y: [100, 300, -50],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Moving glow 3 */}
            <motion.div
                className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-[100px]"
                animate={{
                    x: [-100, 150, -100],
                    y: [50, -150, 50],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Animated data lines */}
            <motion.div
                className="absolute left-0 top-1/3 h-px w-full bg-white/10"
                animate={{
                    x: ["-100%", "100%"]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div
                className="absolute left-0 top-2/3 h-px w-full bg-white/10"
                animate={{
                    x: ["100%", "-100%"]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />


            {/* Main content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >

                    

                    <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                        Welcome to FinDash
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-4 text-sm tracking-[0.25em] text-white/50 uppercase"
                    >
                        Intelligent Financial Management
                    </motion.p>

                </motion.div>

            </div>

        </div>
    );
}

export default SplashScreen;