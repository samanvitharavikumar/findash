import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import axios from "axios";

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
            (total, transaction) => total + Number(transaction.amount),
            0
        );

    const expenses = Math.abs(
        transactions
            .filter((transaction) => Number(transaction.amount) < 0)
            .reduce(
                (total, transaction) => total + Number(transaction.amount),
                0
            )
    );

    const balance = income - expenses;
    return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-300 p-8">

            <h1 className="text-5xl font-serif text-black mb-8">
                Welcome to FinDash
            </h1>

            <div className="bg-indigo-900 grid grid-cols-3 gap-5 font-serif mb-10">
                <SummaryCard title="Balance" amount={`$${balance}`} color="bg-slate-900"/>
                <SummaryCard title="Income" amount={`$${income}`} />
                <SummaryCard title="Expenses" amount={`$${expenses}`} />
            </div>

            <div className="bg-indigo-900 rounded-xl font-serif text-white">

                <div
                    onClick={() => setShowTransactions(!showTransactions)}
                    className="flex justify-between items-center p-5 cursor-pointer"
                >
                    <h2 className="text-2xl ">
                        Transactions
                    </h2>

                    <span className="text-2xl">
                        {showTransactions ? "▲" : "▼"}
                    </span>
                </div>

                {showTransactions && (

                    <div className="p-2">

                        {transactions.map((transaction) => (

                            <div
                                key={transaction.id}
                                className="border rounded-lg p-4 mb-4"
                            >

                                {editingId === transaction.id ? (

                                    <>
                                        <input
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(e.target.value)
                                            }
                                            className="border p-2 rounded w-full mb-3"
                                        />

                                        <input
                                            value={editAmount}
                                            onChange={(e) =>
                                                setEditAmount(e.target.value)
                                            }
                                            className="border p-2 rounded w-full mb-4"
                                        />

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    saveEdit(transaction.id)
                                                }
                                                className=" text-white px-4 py-2 rounded"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={cancelEditing}
                                                className="bg-slate-300 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </>

                                ) : (

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h3 className="text-xl font-normal">
                                                {transaction.title}
                                            </h3>

                                            <p className="text-lg">
                                                ${transaction.amount}
                                            </p>

                                        </div>

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    startEditing(transaction)
                                                }
                                                className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-slate-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteTransaction(transaction.id)
                                                }
                                                className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-slate-600"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    </>
);


}
export default Dashboard