import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import ChartsPage from "./pages/ChartsPage";
import AIHelper from "./pages/AIHelper";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add-expense" element={<AddExpense />} />
    <Route path="/charts" element={<ChartsPage />} />
    <Route path="/ai-helper" element={<AIHelper />} />

    </Routes>
</BrowserRouter>
  );
}

export default App;