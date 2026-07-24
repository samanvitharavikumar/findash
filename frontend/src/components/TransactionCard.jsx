function TransactionCard({
  transaction,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <div className="transaction-card">
      <div>
        <h3>{transaction.title}</h3>
        <p>₹ {transaction.amount}</p>
      </div>

      <div>
        <button
          onClick={() => editTransaction(transaction)}
        >
          ✏ Edit
        </button>

        <button
          onClick={() => deleteTransaction(transaction.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;