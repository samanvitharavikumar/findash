import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AIHelper() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function askAI() {

        try {
            setLoading(true);

            const token = localStorage.getItem("access");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/ai-helper/",
                {
                    question: question,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {
            console.error(error);
            setAnswer("Something went wrong.");
        }

        setLoading(false);
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100 p-8">

                <h1 className="text-4xl font-bold text-center mb-10">
                     AI Financial Assistant
                </h1>

                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                    <textarea
                        rows="5"
                        placeholder="Ask anything about your finances..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full border rounded-xl p-4 mb-6"
                    />

                    <button
                        onClick={askAI}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-700"
                    >
                        {loading ? "Thinking..." : "Ask AI"}
                    </button>

                    {answer && (

                        <div className="mt-8 bg-slate-100 rounded-xl p-6">

                            <h2 className="text-xl font-semibold mb-3">
                                AI Response
                            </h2>

                            <p>{answer}</p>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
}

export default AIHelper;