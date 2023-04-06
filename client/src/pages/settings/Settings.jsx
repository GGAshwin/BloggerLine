import "./settings.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [password, setPassword] = useState('')
  // const [updateMode, setUpdateMode] = useState(false)

  // const path = location.pathname.split("/")[2];

  const handleUpdate = async (e) => {
    e.preventDefault()
    const payload = {
      userId: user._id,
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
      profilePic: profilePic || user.profilePic
    }
    try {
      await axios.put(process.env.REACT_APP_API + '/user/' + user._id, payload)
        .then((res) => {
          console.log(res);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        })
      // console.log('done');
      window.location.reload()
      // setUpdateMode(false)
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(user);
  const handleDelete = (e) => {
    e.preventDefault()
    const data = {
      userId: user._id
    }
    axios.delete(process.env.REACT_APP_API + "/user/" + user._id, { data: data })
    dispatch({ type: "LOGOUT" })
    window.location.replace('/register')
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            {
              user.profilePic ?
              <img
                className="topImg"
                src={user.profilePic}
                alt=""
              />
              :
              (<img
                className="topImg"
                src="https://img.freepik.com/free-icon/user_318-804790.jpg"
                alt="" />)
            }
          </div>
          <label>Image URL</label>
          <input type="text" placeholder={user.profilePic} name="profilePic" value={profilePic} onChange={(e) => {
            setProfilePic(e.target.value)
          }} />
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e) => {
            setUsername(e.target.value)
          }} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <button className="settingsSubmitButton" type="submit" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}