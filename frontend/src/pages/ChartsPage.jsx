import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const COLORS = ["#95ace3", "#e3d55c"];
function ChartsPage() {

    const [transactions, setTransactions] = useState([]);

    async function fetchTransactions() {

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
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    const income = transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expense = transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const data = [
        {
            name: "Income",
            value: income,
        },
        {
            name: "Expense",
            value: expense,
        },
    ];

return (
    <>
        <Navbar />

        <div className="font-serif min-h-screen bg-slate-300 p-8">

            <h1 className="font-serif text-3xl text-indigo-900 text-center mb-8">
                Financial Overview
            </h1>

            <div className="font-serif bg-indigo-900 rounded-2xl shadow-lg p-2 w-full max-w-2xl mx-auto">

                <ResponsiveContainer width="100%" height={400}>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                        
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    </>
);
}
export default ChartsPage;