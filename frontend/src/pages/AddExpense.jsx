import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-300  flex justify-center items-center font-serif">

                <div className="bg-slate-300 p-10  shadow-2xl">

                    <h1 className="text-3xl font-bold text-center text-indigo-900">
                        Add Transaction
                    </h1>

                    <p className="text-center text-gray-500 mb-8">
                        Record a new income or expense.
                    </p>

                    <label className="block mb-2 font-medium text-indigo-900">
                        Title
                    </label>

                    <input
                        type="text"
                        className="w-full border border-slate-600 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="block mb-2 font-medium text-indigo-900">
                        Amount
                    </label>

                    <input
                        type="number"
                        className="w-full border border-slate-300 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <label className="block mb-2 font-medium text-indigo-900">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Expense">Expense</option>
                        <option value="Income"> Income</option>
                    </select>

                    <button
                        onClick={addTransaction}
                        className="w-full bg-indigo-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-300 transition duration-300 active:scale-95"
                    >
                        Add Transaction
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-slate-300 w-full mt-4 border border-indigo-900 text-indigo-900 py-3 rounded-xl hover:bg-indigo-90 transition"
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        </>
    );
}

export default AddExpense;