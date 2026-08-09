import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

function AIHelper() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function askAI() {
        if (!question.trim()) {
            return;
        }

        try {
            setLoading(true);
            setAnswer("");

            const token = localStorage.getItem("access");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/ai-helper/",
                {
                    question: question,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {
            console.error(error);
            setAnswer("Something went wrong. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full">

            <Navbar />

            <main className="mx-auto flex min-h-[calc(100vh-70px)] max-w-4xl flex-col px-6 py-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >

                    <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/40">
                        FinDash Intelligence
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        AI Financial Assistant
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-white/50">
                        Ask questions about budgeting, spending,
                        saving, or managing your finances.
                    </p>

                </motion.div>


                {/* Question area */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >

                    <textarea
                        rows="5"
                        placeholder="Ask anything about your finances..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                askAI();
                            }
                        }}
                        className="w-full resize-none border-b border-white/20 bg-transparent px-1 py-4 text-white placeholder-white/30 outline-none transition focus:border-white"
                    />

                    <div className="mt-5 flex items-center justify-between">

                        <p className="text-xs text-white/30">
                            Enter to ask · Shift + Enter for a new line
                        </p>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={askAI}
                            disabled={loading}
                            className="bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Thinking..." : "Ask AI"}
                        </motion.button>

                    </div>

                </motion.div>


                {/* Loading */}

                <AnimatePresence>

                    {loading && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            className="mt-10 flex items-center gap-3 text-white/40"
                        >

                            <div className="flex gap-1">

                                <motion.span
                                    className="h-1.5 w-1.5 rounded-full bg-white"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                    }}
                                />

                                <motion.span
                                    className="h-1.5 w-1.5 rounded-full bg-white"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: 0.2,
                                    }}
                                />

                                <motion.span
                                    className="h-1.5 w-1.5 rounded-full bg-white"
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: 0.4,
                                    }}
                                />

                            </div>

                            <span className="text-sm">
                                FinDash AI is thinking...
                            </span>

                        </motion.div>

                    )}

                </AnimatePresence>


                {/* AI Response */}

                <AnimatePresence>

                    {answer && !loading && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="mt-10 border-l-2 border-white/30 pl-5"
                        >

                            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
                                FinDash AI
                            </p>

                            <p className="whitespace-pre-wrap leading-7 text-white/80">
                                {answer}
                            </p>

                        </motion.div>

                    )}

                </AnimatePresence>

            </main>

        </div>
    );
}

export default AIHelper;