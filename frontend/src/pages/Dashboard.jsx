import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import axios from "axios";
import { motion } from "framer-motion";

function Dashboard() {

    const [transactions, setTransactions] = useState([]);
    const [showTransactions, setShowTransactions] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAmount, setEditAmount] = useState("");

    const fetchTransactions = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/transactions/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTransactions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const deleteTransaction = async (id) => {

        try {

            const token = localStorage.getItem("access");

            await axios.delete(
                `http://127.0.0.1:8000/api/transactions/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTransactions(
                transactions.filter(
                    (transaction) => transaction.id !== id
                )
            );

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const startEditing = (transaction) => {

        setEditingId(transaction.id);
        setEditTitle(transaction.title);
        setEditAmount(transaction.amount);

    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const saveEdit = async (id) => {

        try {

            const token = localStorage.getItem("access");

            await axios.put(
                `http://127.0.0.1:8000/api/transactions/${id}/update/`,
                {
                    title: editTitle,
                    amount: editAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditingId(null);

            fetchTransactions();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const income = transactions
        .filter((transaction) => Number(transaction.amount) > 0)
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount),
            0
        );

    const expenses = Math.abs(
        transactions
            .filter((transaction) => Number(transaction.amount) < 0)
            .reduce(
                (total, transaction) =>
                    total + Number(transaction.amount),
                0
            )
    );

    const balance = income - expenses;

    return (
        <div className="min-h-screen w-full">

            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >

                    <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/40">
                        Financial Overview
                    </p>

                    
                        

                    <p className="mt-3 text-white/50">
                        Your financial activity, all in one place.
                    </p>

                </motion.div>

                {/* Summary */}
                <div className="mb-10 grid gap-5 md:grid-cols-3">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <SummaryCard
                            title="Balance"
                            amount={`$${balance.toFixed(2)}`}
                            color="bg-white/10"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SummaryCard
                            title="Income"
                            amount={`$${income.toFixed(2)}`}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <SummaryCard
                            title="Expenses"
                            amount={`$${expenses.toFixed(2)}`}
                        />
                    </motion.div>

                </div>

                {/* Transactions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                >

                    {/* Header */}
                    <button
                        onClick={() =>
                            setShowTransactions(!showTransactions)
                        }
                        className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/[0.04]"
                    >

                        <div>
                            <h2 className="text-xl font-medium text-white">
                                Transactions
                            </h2>

                            <p className="mt-1 text-sm text-white/40">
                                {transactions.length} transaction
                                {transactions.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <span className="text-white/50">
                            {showTransactions ? "▲" : "▼"}
                        </span>

                    </button>

                    {/* Transaction list */}
                    {showTransactions && (

                        <div className="border-t border-white/10 p-5">

                            {transactions.length === 0 ? (

                                <p className="py-8 text-center text-white/40">
                                    No transactions yet.
                                </p>

                            ) : (

                                transactions.map((transaction) => (

                                    <motion.div
                                        key={transaction.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mb-3 border border-white/10 bg-white/[0.03] p-4"
                                    >

                                        {editingId === transaction.id ? (

                                            <div>

                                                <input
                                                    value={editTitle}
                                                    onChange={(e) =>
                                                        setEditTitle(e.target.value)
                                                    }
                                                    className="mb-3 w-full border-b border-white/20 bg-transparent p-2 text-white outline-none focus:border-white"
                                                />

                                                <input
                                                    value={editAmount}
                                                    onChange={(e) =>
                                                        setEditAmount(e.target.value)
                                                    }
                                                    className="mb-4 w-full border-b border-white/20 bg-transparent p-2 text-white outline-none focus:border-white"
                                                />

                                                <div className="flex gap-3">

                                                    <button
                                                        onClick={() =>
                                                            saveEdit(transaction.id)
                                                        }
                                                        className="bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/80"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={cancelEditing}
                                                        className="border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10"
                                                    >
                                                        Cancel
                                                    </button>

                                                </div>

                                            </div>

                                        ) : (

                                            <div className="flex items-center justify-between gap-5">

                                                <div>

                                                    <h3 className="text-lg text-white">
                                                        {transaction.title}
                                                    </h3>

                                                    <p
                                                        className={`mt-1 ${
                                                            Number(transaction.amount) >= 0
                                                                ? "text-emerald-400"
                                                                : "text-pink-400"
                                                        }`}
                                                    >
                                                        {Number(transaction.amount) >= 0
                                                            ? "+"
                                                            : ""}
                                                        ${transaction.amount}
                                                    </p>

                                                </div>

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            startEditing(transaction)
                                                        }
                                                        className="border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteTransaction(transaction.id)
                                                        }
                                                        className="border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        )}

                                    </motion.div>

                                ))

                            )}

                        </div>

                    )}

                </motion.section>

            </main>

        </div>
    );
}

export default Dashboard;