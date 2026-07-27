import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-indigo-900 text-white px-8 py-4 shadow-lg">

            <h2 className="text-2xl font-serif">
                 FinDash
            </h2>

            <div className="flex gap-8 font-serif">

                

                <Link
                    to="/add-expense"
                    className="hover:text-black transition"
                >
                    Add Expense
                </Link>

                <Link
                    to="/charts"
                    className="hover:text-black transition"
                >
                    Charts
                </Link>

                <Link
                    to="/ai-helper"
                    className="hover:text-black transition"
                >
                    AI Helper
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;