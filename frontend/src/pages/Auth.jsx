import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function login() {

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password,
                }
            );

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid username or password.");

        }

    }

    async function register() {

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/api/register/",
                {
                    username,
                    email,
                    password,
                }
            );

            alert("Registration Successful!");

            setIsLogin(true);

        } catch (error) {

            alert("Registration Failed.");

        }

    }

    return (

        <div className="font-serif min-h-screen w-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex items-center justify-center">

            <div className="bg-slate-300 bg-indigo-900  p-10 w-700">

                <h1 className=" text-4xl font-bold text-center text-indigo-900">
                    FinDash
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Personal Finance Tracker
                </p>

                <div className="flex mb-8">

                    <button
                        className={`w-1/2 py-2 rounded-l-xl ${
                            isLogin
                                ? "bg-indigo-900 text-white"
                                : "bg-slate-300"
                        }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>

                    <button
                        className={`w-1/2 py-2 rounded-r-xl ${
                            !isLogin
                                ? "bg-indigo-900 text-white"
                                : "bg-slate-300"
                        }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>

                </div>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border rounded-xl p-3 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {!isLogin && (

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-xl p-3 mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                )}

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-xl p-3 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!isLogin && (

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border rounded-xl p-3 mb-6"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                )}

                <button
                    onClick={isLogin ? login : register}
                    className="w-full bg-indigo-900 text-white rounded-xl py-3 hover:bg-indigo-900 transition"
                >
                    {isLogin ? "Login" : "Create Account"}
                </button>

            </div>

        </div>

    );

}

export default Auth;