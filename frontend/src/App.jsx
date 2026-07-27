import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import ChartsPage from "./pages/ChartsPage";
import AIHelper from "./pages/AIHelper";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add-expense" element={<AddExpense />} />
    <Route path="/charts" element={<ChartsPage />} />
    <Route path="/ai-helper" element={<AIHelper />} />

    </Routes>
</BrowserRouter>
  );
}

export default App;