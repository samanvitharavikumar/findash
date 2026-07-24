import { useState } from "react";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import TransactionCard from "./components/TransactionCard";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  function addTransaction() {
    if (title.trim() === "" || amount.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    const newTransaction = {
      title,
      amount,
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
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