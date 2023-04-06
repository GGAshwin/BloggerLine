import "./login.css";
import { Link } from "react-router-dom"
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context"
import axios from "axios";

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)
  const [flag, setFlag] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post(process.env.REACT_APP_API + "/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      await setFlag(true)
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
      await setFlag(false)
      console.log(err)
    }
  }
  console.log(flag);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginTitle">Login</span>
        {/* <label>Username</label> */}
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your Username..."
          ref={userRef}
        />
        {/* <label>Password</label> */}
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      {flag === true ? null : <p style={{ color: "red" }}>Incorrect username or password</p>}
      {/* <button className="loginRegisterButton">
        <Link to={'/register'}>
          Register
        </Link>
      </button> */}
    </div>
  );
}