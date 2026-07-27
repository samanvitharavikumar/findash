function SummaryCard({ title, amount }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">

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