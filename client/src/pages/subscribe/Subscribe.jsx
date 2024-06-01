import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./subscribe.css"; 

export default function Subscribe() {
  const { user } = useContext(Context);
  const [alreadyPresent, setAlreadyPresent] = useState(false);

  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + "/notification"
        );
        console.log(response.data);
        // const data = response.data;
        const data = response.data;

        data.forEach((d) => {
          if (d.username === user.user.username) {
            setAlreadyPresent(true);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user]);

  console.log(alreadyPresent);

  function handeSubscribe() {
    const userData = {
      username: user.user.username,
      email: user.user.email,
    };
    axios.post(process.env.REACT_APP_API + "/notification", userData);
    setAlreadyPresent(true);
  }

  function handeUnsubscribe() {
    console.log("Unsubscribing");
    axios.delete(process.env.REACT_APP_API + "/notification/unsubscribe/" + user.username);
    setAlreadyPresent(false);
  }

  return (
    <div className="subscribe-container">
      {!alreadyPresent && <button className="subscribe-button" onClick={handeSubscribe}>Subscribe</button>}
      {alreadyPresent && (
        <button className="subscribe-button" onClick={handeUnsubscribe}>Unsubscribe</button>
      )}
      <p className="subscribe-text">
        {!alreadyPresent ? "Click here to Subscribe for some exciting updates about new posts, comments, and ratings." : "Click here to unsubscribe, see you soon!"}
      </p>
      {alreadyPresent && <h1 className="subscribed-message">You Are Subscribed</h1>}
    </div>
  );
}
