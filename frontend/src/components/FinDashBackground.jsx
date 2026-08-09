import { motion } from "framer-motion";

function FinDashBackground({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">

            {/* Pink glow */}
            <motion.div
                className="pointer-events-none absolute h-72 w-72 rounded-full bg-pink-400/20 blur-[100px]"
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

            {/* Purple glow */}
            <motion.div
                className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-500/20 blur-[110px]"
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

            {/* Blue glow */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-[100px]"
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

            {/* Moving line 1 */}
            <motion.div
                className="pointer-events-none absolute left-0 top-1/3 h-px w-full bg-white/10"
                animate={{
                    x: ["-100%", "100%"]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Moving line 2 */}
            <motion.div
                className="pointer-events-none absolute left-0 top-2/3 h-px w-full bg-white/10"
                animate={{
                    x: ["100%", "-100%"]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Page content */}
            <div className="relative z-10 min-h-screen">
                {children}
            </div>

        </div>
    );
}

export default FinDashBackground;