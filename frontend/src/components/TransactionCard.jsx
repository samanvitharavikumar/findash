function TransactionCard({
  transaction,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <div className="bg-indigo-900 text-white rounded-xl p-4 border border-white/20 flex justify-between items-center">

      <div>
        <h3 className="text-xl font-normal">
          {transaction.title}
        </h3>

        <p className="text-lg mt-2">
          ₹ {Math.abs(transaction.amount)}
        </p>

        <p className="text-sm text-gray-300 mt-1">
          {transaction.type}
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={() => editTransaction(transaction)}
          className="px-4 py-2 border bordesr-white/30 rounded-lg hover:bg-white hover:text-indigo-900 transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="px-4 py-2 border border-black text-red-300 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TransactionCard;