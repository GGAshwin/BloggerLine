import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)
    try {
      axios.post(process.env.REACT_APP_API + "/auth/register", {
        username,
        email,
        password
      }).then((res) => {
        console.log(res);
        res.data && window.location.replace('/login')
      })
    } catch (err) {
      setError(true)
      console.log(err);
    }
  }

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <span className="registerTitle">Register</span>
        {/* <label>Username</label> */}
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={e => setUsername(e.target.value)}
        />
        {/* <label>Email</label> */}
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}
        />
        {/* <label>Password</label> */}
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      {/* <button className="registerLoginButton">
        <Link to={'/login'} className="link">
          Login
        </Link>
      </button> */}
      {error && <span style={{ color: 'red' }}>Something went wrong</span>}
    </div>
  )
}