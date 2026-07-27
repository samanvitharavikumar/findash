import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AddExpense() {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const navigate = useNavigate();

    async function addTransaction() {

        try {

            const token = localStorage.getItem("access");

            await axios.post(
                "http://127.0.0.1:8000/api/transactions/",
                {
                    title,
                    amount,
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

            <div className="min-h-screen bg-slate-500 flex justify-center items-center">

                <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                    <h1 className="text-3xl font-bold mb-6">
                        Add Transaction
                    </h1>

                    <input
                        className="border w-full p-2 rounded mb-4"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        className="border w-full p-2 rounded mb-6"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <button
                        onClick={addTransaction}
                        className="w-full bg-indigo-700 text-white p-2 rounded hover:bg-indigo-800"
                    >
                        Add Transaction
                    </button>

                </div>

            </div>
        </>
    );
}

export default AddExpense;