import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import axios from "axios";

function Dashboard() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

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

                console.error(error);

            }

        };

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

            <div className="min-h-screen bg-slate-500 p-8">

                <h1 className="text-5xl font-serif text-black mb-8">
                    Welcome to FinDash
                </h1>

                <div className="grid grid-cols-3 gap-6 font-serif">
                    <SummaryCard title="Balance" amount={`$${balance}`} />
                    <SummaryCard title="Income" amount={`$${income}`} />
                    <SummaryCard title="Expenses" amount={`$${expenses}`} />
                </div>

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-5">
                        Transactions
                    </h2>

                    {transactions.map((transaction) => (

                        <div
                            key={transaction.id}
                            className="bg-white p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center"
                        >

                            <div>

                                <h3 className="text-xl font-bold">
                                    {transaction.title}
                                </h3>

                                <p className="text-lg">
                                    ${transaction.amount}
                                </p>

                            </div>

                            <button
                                onClick={() => deleteTransaction(transaction.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

export default Dashboard;