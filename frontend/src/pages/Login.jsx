import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            localStorage.setItem("access", accessToken);
            localStorage.setItem("refresh", refreshToken);

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response?.data);
            alert("Invalid Username or Password");

        }

    }

    return (
        <div>

            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Login
            </button>

        </div>
    );

}

export default Login;