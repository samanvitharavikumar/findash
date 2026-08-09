function SummaryCard({ title, amount }) {
    return (
        <div className="shadow-lg p-3">

            <h3 className=" text-lg">
                {title}
            </h3>

            <h2 className="text-3xl font-bold mt-3">
                {amount}
            </h2>

        </div>
    );
}

export default SummaryCard;