function SummaryCard({ title, amount }) {
    return (
        <div className="bg-slate-300 shadow-lg p-3">

            <h3 className="text-gray-500 text-lg">
                {title}
            </h3>

            <h2 className="text-3xl font-bold mt-3">
                {amount}
            </h2>

        </div>
    );
}

export default SummaryCard;