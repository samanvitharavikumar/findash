import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import TransactionCard from "./components/TransactionCard";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/transactions/")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));
  }, []);

  function addTransaction() {
    if (title.trim() === "" || amount.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prev) => [...prev, data]);
        setTitle("");
        setAmount("");
      })
      .catch((error) => console.error(error));
  }

  function deleteTransaction(id) {
    fetch(`http://127.0.0.1:8000/api/transactions/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions((prev) =>
          prev.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => console.error(error));
  }

  function editTransaction(transaction) {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setEditingId(transaction.id);
  }

  function updateTransaction(id, title, amount) {
    fetch(`http://127.0.0.1:8000/api/transactions/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
      }),
    })
      .then((response) => response.json())
      .then((updatedTransaction) => {
        setTransactions((prev) =>
          prev.map((transaction) =>
            transaction.id === id ? updatedTransaction : transaction
          )
        );

        setEditingId(null);
        setTitle("");
        setAmount("");
      })
      .catch((error) => console.error(error));
  }

  const total = transactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const income = transactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  return (
    <div className="app">
      <Navbar />

      <Summary
        total={total}
        income={income}
        expense={expense}
      />

      <div className="form-container">
        <h2>{editingId ? "Edit Transaction" : "Add Transaction"}</h2>

        <input
          type="text"
          placeholder="Transaction title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (+ income, - expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={() =>
            editingId
              ? updateTransaction(editingId, title, amount)
              : addTransaction()
          }
        >
          {editingId ? "💾 Save Changes" : "➕ Add Transaction"}
        </button>
      </div>

      <div className="transactions">
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;