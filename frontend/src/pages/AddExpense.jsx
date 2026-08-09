import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Expense");

    const navigate = useNavigate();

    async function addTransaction() {
        try {
            const token = localStorage.getItem("access");

            await axios.post(
                "http://127.0.0.1:8000/api/transactions/",
                {
                    title,
                    amount,
                    type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Transaction Added!");

            navigate("/dashboard");

        } catch (error) {
            console.log(error.response?.data);
        }
    }

    return (
        <div className="min-h-screen w-full">

            <Navbar />

            <div className="flex min-h-[calc(100vh-70px)] items-center justify-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >

                    {/* Heading */}
                    <div className="mb-10">

                        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/40">
                            Financial Activity
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight text-white">
                            Add Transaction
                        </h1>

                        <p className="mt-3 text-white/50">
                            Record a new income or expense.
                        </p>

                    </div>

                    {/* Title */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm text-white/60">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                        />

                    </div>

                    {/* Amount */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm text-white/60">
                            Amount
                        </label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white"
                        />

                    </div>

                    {/* Type */}
                    <div className="mb-8">

                        <label className="mb-2 block text-sm text-white/60">
                            Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border-b border-white/20 bg-transparent px-1 py-3 text-white outline-none transition focus:border-white"
                        >
                            <option
                                value="Expense"
                                className="bg-black"
                            >
                                Expense
                            </option>

                            <option
                                value="Income"
                                className="bg-black"
                            >
                                Income
                            </option>
                        </select>

                    </div>

                    {/* Add */}
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ y: -2 }}
                        onClick={addTransaction}
                        className="w-full bg-white py-3 font-medium text-black transition hover:bg-white/90"
                    >
                        Add Transaction
                    </motion.button>

                    {/* Back */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-4 w-full border border-white/10 py-3 text-white/60 transition hover:bg-white/5 hover:text-white"
                    >
                        Back to Dashboard
                    </button>

                </motion.div>

            </div>

        </div>
    );
}

export default AddExpense;