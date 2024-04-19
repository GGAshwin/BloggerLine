import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

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
        const data = response.data;

        data.map((d) => {
          if (d.username === user.username) {
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
      username: user.username,
      email: user.email,
    };
    axios.post(process.env.REACT_APP_API + "/notification", userData);
    setAlreadyPresent(true);
  }

  function handeUnsubscribe() {
    console.log("Unsubscribing");
  }

  return (
    <>
      {!alreadyPresent && <button onClick={handeSubscribe}>Subscribe</button>}
      {alreadyPresent && (
        <button onClick={handeUnsubscribe}>Unsubscribe</button>
      )}
      {
      alreadyPresent && 
      (
        <h1>
            You Are Subscribed
        </h1>
      )
      }
    </>
  );
}
