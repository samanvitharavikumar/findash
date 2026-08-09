import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import AddExpense from "./pages/AddExpense";
import ChartsPage from "./pages/ChartsPage";
import AIHelper from "./pages/AIHelper";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import CreditScore from "./pages/CreditScore";
import FinDashBackground from "./components/FinDashBackground";

function App() {
    return (
        <BrowserRouter>
            <FinDashBackground>

            <Routes>
                 <Route path="/" element={<SplashScreen />} />

                <Route path="/auth" element={<Auth />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/add-expense" element={<AddExpense />} />

                <Route path="/charts" element={<ChartsPage />} />

                <Route path="/ai-helper" element={<AIHelper />} />

                <Route path="/credit-score" element={<CreditScore />} />

            </Routes>
            </FinDashBackground>

        </BrowserRouter>
    );
}

export default App;