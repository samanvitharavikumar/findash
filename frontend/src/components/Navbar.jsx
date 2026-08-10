import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center text-white px-8 py-4 shadow-lg">

            <h2 className="text-2xl font-serif">
                 FinDash
            </h2>

            <div className="flex gap-8 font-serif">

                <Link
                    to="/dashboard"
                    className="hover:text-pink-300 transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/add-expense"
                    className="hover:text-pink-300 transition"
                >
                    Add Expense
                </Link>

                <Link
                    to="/charts"
                    className="hover:text-pink-300 transition"
                >
                    Charts
                </Link>

                <Link
                    to="/ai-helper"
                    className="hover:text-pink-300 transition"
                >
                    AI Helper
                </Link>
                <Link to="/credit-score"
                className="hover:text-pink-300 transition">
                     Credit Score
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;