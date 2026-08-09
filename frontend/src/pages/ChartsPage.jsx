import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const COLORS = ["#af0095", "#4b004f"];

function ChartsPage() {

    const [transactions, setTransactions] = useState([]);

    async function fetchTransactions() {

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

    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    const income = transactions
        .filter(
            (transaction) =>
                transaction.type === "Income"
        )
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );

    const expense = transactions
        .filter(
            (transaction) =>
                transaction.type === "Expense"
        )
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0
        );

    /* Pie chart data */

    const pieData = [
        {
            name: "Income",
            value: income,
        },
        {
            name: "Expense",
            value: expense,
        },
    ];

    /* Line graph data */

    let runningBalance = 0;

    const lineData = transactions.map(
        (transaction, index) => {

            const amount = Number(transaction.amount);

            if (transaction.type === "Income") {
                runningBalance += amount;
            } else {
                runningBalance -= Math.abs(amount);
            }

            return {
                transaction: index + 1,
                name: transaction.title,
                balance: runningBalance,
            };
        }
    );

    return (
        <div className="min-h-screen w-full">

            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* Page heading */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mb-10"
                >

                    <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/40">
                        Analytics
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        Financial Overview
                    </h1>

                    <p className="mt-3 text-white/50">
                        Understand where your money is going.
                    </p>

                </motion.div>


                {/* PIE CHART */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                    }}
                    className="mb-8 border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >

                    <div className="mb-5">

                        <h2 className="text-xl font-medium text-white">
                            Income vs Expense
                        </h2>

                        <p className="mt-1 text-sm text-white/40">
                            Overall distribution
                        </p>

                    </div>

                    <div className="h-[400px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label
                                >

                                    {pieData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                            />
                                        )
                                    )}

                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "#080b14",
                                        border:
                                            "1px solid rgba(255,255,255,0.1)",
                                        borderRadius:
                                            "8px",
                                        color: "white",
                                    }}
                                />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </motion.section>


                {/* LINE GRAPH */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.25,
                    }}
                    className="border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >

                    <div className="mb-5">

                        <h2 className="text-xl font-medium text-white">
                            Financial Activity
                        </h2>

                        <p className="mt-1 text-sm text-white/40">
                            Running balance across your transactions
                        </p>

                    </div>

                    <div className="h-[400px]">

                        {lineData.length === 0 ? (

                            <div className="flex h-full items-center justify-center text-white/40">
                                No transaction data available yet.
                            </div>

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={lineData}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 0,
                                        bottom: 10,
                                    }}
                                >

                                    <CartesianGrid
                                        stroke="rgba(255,255,255,0.08)"
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="transaction"
                                        stroke="rgba(255,255,255,0.4)"
                                        tick={{ fill: "rgba(255,255,255,0.5)" }}
                                    />

                                    <YAxis
                                        stroke="rgba(255,255,255,0.4)"
                                        tick={{ fill: "rgba(255,255,255,0.5)" }}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                "#080b14",
                                            border:
                                                "1px solid rgba(255,255,255,0.1)",
                                            borderRadius:
                                                "8px",
                                            color: "white",
                                        }}
                                        formatter={(value) => [
                                            `$${Number(value).toFixed(2)}`,
                                            "Balance",
                                        ]}
                                        labelFormatter={(label) => {
                                            const item =
                                                lineData[label - 1];

                                            return item
                                                ? item.name
                                                : `Transaction ${label}`;
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="balance"
                                        stroke="#ffffff"
                                        strokeWidth={2.5}
                                        dot={{
                                            r: 3,
                                            fill: "#ffffff",
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </motion.section>

            </main>

        </div>
    );
}

export default ChartsPage;