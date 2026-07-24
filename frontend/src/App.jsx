import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import TransactionCard from "./components/TransactionCard";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
useEffect(() => {
  console.log("Fetching data...");

  fetch("http://127.0.0.1:8000/api/transactions/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTransactions(data);
    })
    .catch((error) => {
      console.error(error);
    });
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
      setTransactions([...transactions, data]);

      setTitle("");
      setAmount("");
    });
}
  function deleteTransaction(indexToDelete) {
    const updatedTransactions = transactions.filter(
      (_, index) => index !== indexToDelete
    );

    setTransactions(updatedTransactions);
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
        <h2>Add Transaction</h2>

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

        <button onClick={addTransaction}>
          ➕ Add Transaction
        </button>
      </div>

      <div className="transactions">
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              index={index}
              deleteTransaction={deleteTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;