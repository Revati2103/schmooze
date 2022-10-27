import React, {useState, useEffect} from 'react'


function UserDetails() {
  const [userDetails , setUserDetails] = useState("");

  useEffect(() => {
   fetch("http://localhost:5500/userData", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      token: window.localStorage.getItem("token"),
    }),
   }).then((res) => res.json())
   .then((data) => {
    console.log(data, "userData");
    setUserDetails(data.data)
   })
  }, []);

  return (
    <div>
      Name: <h1>{userDetails.fname}</h1>
      Email: <h1>{userDetails.email}</h1>
    </div>
  )
}

export default UserDetails