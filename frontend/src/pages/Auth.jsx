import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function login() {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password,
                }
            );

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/dashboard");

        } catch (error) {
            alert("Invalid username or password.");
        }
    }

    async function register() {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/register/",
                {
                    username,
                    email,
                    password,
                }
            );

            alert("Registration Successful!");

            setIsLogin(true);

        } catch (error) {
            alert("Registration Failed.");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-6">

            <div className="w-full max-w-sm">

                {/* Branding */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-5xl font-semibold tracking-tight text-white">
                        FinDash
                    </h1>

                    <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/40">
                        Personal Finance Management
                    </p>
                </motion.div>

                {/* Login / Register */}
                <div className="mb-8 flex justify-center gap-8">

                    <button
                        onClick={() => setIsLogin(true)}
                        className={`pb-2 text-sm transition ${
                            isLogin
                                ? "border-b border-white text-white"
                                : "text-white/40 hover:text-white/70"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`pb-2 text-sm transition ${
                            !isLogin
                                ? "border-b border-white text-white"
                                : "text-white/40 hover:text-white/70"
                        }`}
                    >
                        Register
                    </button>

                </div>

                {/* Animated Form */}
                <AnimatePresence mode="wait">

                    <motion.div
                        key={isLogin ? "login" : "register"}
                        initial={{
                            opacity: 0,
                            x: isLogin ? -15 : 15,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: isLogin ? 15 : -15,
                        }}
                        transition={{ duration: 0.25 }}
                    >

                        {/* Username */}
                        <input
                            type="text"
                            placeholder="Username"
                            className="mb-5 w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {/* Email */}
                        {!isLogin && (
                            <input
                                type="email"
                                placeholder="Email"
                                className="mb-5 w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        )}

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            className="mb-5 w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Confirm Password */}
                        {!isLogin && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="mb-8 w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        )}

                        {/* Submit */}
                        <button
                            onClick={isLogin ? login : register}
                            className="w-full bg-white py-3 font-medium text-black transition hover:bg-white/90"
                        >
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                    </motion.div>

                </AnimatePresence>

            </div>

        </div>
    );
}

export default Auth;