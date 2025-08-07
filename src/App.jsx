import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Tasks from "./components/Tasks"; // You’ll create this later
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App
