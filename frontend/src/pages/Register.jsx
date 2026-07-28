import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function register() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                email,
                password,
            });

            alert("Registration Successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration Failed");
        }
    }

    return (
        <div className="text-white min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-slate-700 p-2 rounded-2xl shadow-2xltext-white ">
                <h1 className="font-serif text-6xl font-bold text-center text-white mb-2">
                     FinDash
                </h1>

                <p className="font-serif text-center text-gray-500 mb-8">
                    Create your account and start tracking your finances.
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="font-serif w-full border text-bg-white border-black rounded-lg p-3 mb-4"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-serif w-full border border-gray-300 rounded-lg p-3 mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-serif w-full border border-gray-300 rounded-lg p-3 mb-4"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="font-serif w-full border border-gray-300 rounded-lg p-3 mb-6"
                />

                <button
                    onClick={register}
                    className="font-serif w-full bg-slate-600 text-white py-3 rounded-lg"
                >
                    Create Account
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="font-serif w-full mt-3 border border-blacktext-slate-600 py-3 rounded-lg"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Register;