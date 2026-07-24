function Summary({ total, income, expense }) {
  return (
    <>
      <div className="balance-card">
        <h2>Current Balance</h2>
        <h1>₹ {total.toFixed(2)}</h1>
      </div>

      <div className="summary">
        <div className="income-box">
          <h3>Income</h3>
          <p>₹ {income.toFixed(2)}</p>
        </div>

        <div className="expense-box">
          <h3>Expense</h3>
          <p>₹ {expense.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}

export default Summary;