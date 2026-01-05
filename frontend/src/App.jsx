import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
import Diagnosa from "./pages/Diagnosa";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-green-600 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

