import "./login.css";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context"
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(process.env.REACT_APP_API + "/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      // Handle successful login
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setErrorMessage(null); // Clear error message
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.error(err);

      // Handle login error (potentially from JWT validation failure)
      setErrorMessage(err.response?.data?.message || "Login failed"); // Display specific error message if available
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginTitle">Login</span>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your Username..."
          ref={userRef}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
