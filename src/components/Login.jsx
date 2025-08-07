// src/components/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate,Link} from "react-router-dom";
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tasks");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
  
  <div className={styles.spcontainer}>
    <h2 className={styles.spheading}>Login</h2>
    <form className={styles.spform}onSubmit={handleLogin}>
      <input
        className={styles.spinput}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.spinput}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.spbutton} type="submit">LogIn</button>
       <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#007bff", textDecoration: "underline" }}>
        Sign up here
       </Link>
      </p>
    </form>
    {error && <p className={styles.sperror}>{error}</p>}
  </div>
);
};

export default Login;
