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

    const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
            username,
            email,
            password,
        }
    );

    alert("Registration Successful!");

    navigate("/login");

} catch (error) {

    alert("Registration Failed");

}
        // We'll add axios here next

    }

    return (
        <div>
        <h1>Register</h1>

        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br /><br />
            ...

            <button onClick={register}>
                Register
            </button>

        </div>
    );
}

export default Register;