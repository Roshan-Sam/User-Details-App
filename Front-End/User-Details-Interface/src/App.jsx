import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./pages";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
