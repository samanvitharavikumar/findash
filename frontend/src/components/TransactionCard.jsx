function TransactionCard({ transaction, index, deleteTransaction }) {
  const isIncome = Number(transaction.amount) >= 0;

  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <h4>{transaction.title}</h4>

        <p
          style={{
            color: isIncome ? "green" : "red",
          }}
        >
          {isIncome ? "+" : "-"}₹ {Math.abs(Number(transaction.amount)).toFixed(2)}
        </p>
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTransaction(index)}
      >
        🗑️
      </button>
    </div>
  );
}

export default TransactionCard;