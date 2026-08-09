import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

function CreditScore() {

    const [formData, setFormData] = useState({
        Age: "34",
        Annual_Income: "50000",
        Num_Bank_Accounts: "4",
        Num_Credit_Card: "4",
        Interest_Rate: "12",
        Num_of_Loan: "3",

        Credit_Mix: "Good",
        Payment_of_Min_Amount: "Yes",
        Occupation: "Engineer",

        Outstanding_Debt: "1000",
        Monthly_Balance: "500",
        Total_EMI_per_month: "2500",
    });

    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const predictCreditScore = async () => {

        try {

            setLoading(true);
            setResult("");

            const token = localStorage.getItem("access");

            /*
             * These are the exact names expected
             * by preprocessing.py
             */

            const data = {

 // USER INPUTS
    // =========================

    Age: Number(formData.Age),

    Annual_Income:
        Number(formData.Annual_Income),

    Num_Bank_Accounts:
        Number(formData.Num_Bank_Accounts),

    Num_Credit_Card:
        Number(formData.Num_Credit_Card),

    Interest_Rate:
        Number(formData.Interest_Rate),

    Num_of_Loan:
        Number(formData.Num_of_Loan),

    Credit_Mix:
        formData.Credit_Mix,

    Payment_of_Min_Amount:
        formData.Payment_of_Min_Amount,

    Occupation:
        formData.Occupation,

    Outstanding_Debt:
        Number(formData.Outstanding_Debt),

    Monthly_Balance:
        Number(formData.Monthly_Balance),

    Total_EMI_per_month:
        Number(formData.Total_EMI_per_month),


    // =========================
    // DEFAULT / MEDIAN VALUES
    // =========================

    Month: "April",

    Monthly_Inhand_Salary: 3093.745,

    Delay_from_due_date: 18,

    Num_of_Delayed_Payment: 14,

    Changed_Credit_Limit: 9.4,

    Num_Credit_Inquiries: 6,

    Credit_Utilization_Ratio: 32.30578367171092,

    Credit_History_Age: 219,

    Amount_invested_monthly: 128.95453805190283,


    // =========================
    // CATEGORICAL DEFAULTS
    // =========================

    Type_of_Loan: "Not Specified",

    Payment_Behaviour: "Unknown",

};



            const response = await axios.post(
                "http://127.0.0.1:8000/api/credit-score/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setResult(
                response.data.credit_score ||
                "Prediction completed"
            );

        } catch (error) {

            console.error(error);

            setResult(
                error.response?.data?.error ||
                "Prediction failed"
            );

        } finally {

            setLoading(false);

        }
    };


    const inputClass =
        "w-full border-b border-white/20 bg-transparent px-1 py-3 text-white placeholder-white/30 outline-none transition focus:border-white";

    const selectClass =
        "w-full border-b border-white/20 bg-[#080b14] px-1 py-3 text-white outline-none transition focus:border-white";


    return (

        <div className="min-h-screen w-full">

            <Navbar />

            <main className="mx-auto max-w-5xl px-6 py-10">

                {/* HEADER */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >

                    <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/40">
                        Financial Intelligence
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        Credit Score Prediction
                    </h1>

                    <p className="mt-3 max-w-2xl text-white/50">
                        Enter your financial information to estimate
                        your credit score category.
                    </p>

                </motion.div>


                {/* FORM */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                >

                    <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">


                        {/* AGE */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Age
                            </label>

                            <input
                                type="number"
                                name="Age"
                                value={formData.Age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                className={inputClass}
                            />

                        </div>


                        {/* ANNUAL INCOME */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Annual Income
                            </label>

                            <input
                                type="number"
                                name="Annual_Income"
                                value={formData.Annual_Income}
                                onChange={handleChange}
                                placeholder="Enter annual income"
                                className={inputClass}
                            />

                        </div>


                        {/* BANK ACCOUNTS */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Number of Bank Accounts
                            </label>

                            <input
                                type="number"
                                name="Num_Bank_Accounts"
                                value={formData.Num_Bank_Accounts}
                                onChange={handleChange}
                                placeholder="Number of bank accounts"
                                className={inputClass}
                            />

                        </div>


                        {/* CREDIT CARDS */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Number of Credit Cards
                            </label>

                            <input
                                type="number"
                                name="Num_Credit_Card"
                                value={formData.Num_Credit_Card}
                                onChange={handleChange}
                                placeholder="Number of credit cards"
                                className={inputClass}
                            />

                        </div>


                        {/* INTEREST RATE */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Interest Rate (%)
                            </label>

                            <input
                                type="number"
                                name="Interest_Rate"
                                value={formData.Interest_Rate}
                                onChange={handleChange}
                                placeholder="Enter interest rate"
                                className={inputClass}
                            />

                        </div>


                        {/* NUMBER OF LOANS */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Number of Loans
                            </label>

                            <input
                                type="number"
                                name="Num_of_Loan"
                                value={formData.Num_of_Loan}
                                onChange={handleChange}
                                placeholder="Number of loans"
                                className={inputClass}
                            />

                        </div>


                        {/* CREDIT MIX */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Credit Mix
                            </label>

                            <select
                                name="Credit_Mix"
                                value={formData.Credit_Mix}
                                onChange={handleChange}
                                className={selectClass}
                            >

                                <option value="Good">
                                    Good
                                </option>

                                <option value="Standard">
                                    Standard
                                </option>

                                <option value="Bad">
                                    Bad
                                </option>

                            </select>

                        </div>


                        {/* MINIMUM PAYMENT */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Payment of Minimum Amount
                            </label>

                            <select
                                name="Payment_of_Min_Amount"
                                value={formData.Payment_of_Min_Amount}
                                onChange={handleChange}
                                className={selectClass}
                            >

                                <option value="Yes">
                                    Yes
                                </option>

                                <option value="No">
                                    No
                                </option>

                                <option value="NM">
                                    Not Mentioned
                                </option>

                            </select>

                        </div>


                        {/* OCCUPATION */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Occupation
                            </label>

                            <select
                                name="Occupation"
                                value={formData.Occupation}
                                onChange={handleChange}
                                className={selectClass}
                            >

                                <option value="Accountant">
                                    Accountant
                                </option>

                                <option value="Architect">
                                    Architect
                                </option>

                                <option value="Developer">
                                    Developer
                                </option>

                                <option value="Doctor">
                                    Doctor
                                </option>

                                <option value="Engineer">
                                    Engineer
                                </option>

                                <option value="Entrepreneur">
                                    Entrepreneur
                                </option>

                                <option value="Journalist">
                                    Journalist
                                </option>

                                <option value="Lawyer">
                                    Lawyer
                                </option>

                                <option value="Manager">
                                    Manager
                                </option>

                                <option value="Mechanic">
                                    Mechanic
                                </option>

                                <option value="Scientist">
                                    Scientist
                                </option>

                                <option value="Teacher">
                                    Teacher
                                </option>

                                <option value="Writer">
                                    Writer
                                </option>

                            </select>

                        </div>


                        {/* OUTSTANDING DEBT */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Outstanding Debt
                            </label>

                            <input
                                type="number"
                                name="Outstanding_Debt"
                                value={formData.Outstanding_Debt}
                                onChange={handleChange}
                                placeholder="Enter outstanding debt"
                                className={inputClass}
                            />

                        </div>


                        {/* MONTHLY BALANCE */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Monthly Balance
                            </label>

                            <input
                                type="number"
                                name="Monthly_Balance"
                                value={formData.Monthly_Balance}
                                onChange={handleChange}
                                placeholder="Enter monthly balance"
                                className={inputClass}
                            />

                        </div>


                        {/* EMI */}

                        <div>

                            <label className="mb-2 block text-sm text-white/60">
                                Total EMI per Month
                            </label>

                            <input
                                type="number"
                                name="Total_EMI_per_month"
                                value={formData.Total_EMI_per_month}
                                onChange={handleChange}
                                placeholder="Enter total EMI"
                                className={inputClass}
                            />

                        </div>

                    </div>


                    {/* BUTTON */}

                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={predictCreditScore}
                        disabled={loading}
                        className="mt-12 w-full bg-white py-4 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading
                            ? "Analyzing Financial Profile..."
                            : "Predict Credit Score"}

                    </motion.button>


                    {/* RESULT */}

                    <AnimatePresence>

                        {result && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                className="mt-10 border-l-2 border-white/30 pl-5"
                            >

                                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">
                                    Prediction Result
                                </p>

                                <h2 className="text-3xl font-semibold text-white">
                                    {result}
                                </h2>

                                <p className="mt-2 text-sm text-white/40">
                                    Based on your financial profile.
                                </p>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </motion.div>

            </main>

        </div>
    );
}

export default CreditScore;