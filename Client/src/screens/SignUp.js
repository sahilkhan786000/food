import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
      })

      let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    
    e.preventDefault(); // Synthetic event(Interview)
    console.log(JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      }))
    const response = await fetch("https://food-api.onrender.comapi/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })

    });
  

    const jsn = await response.json()
    console.log(jsn);

    if (!jsn.success) {
      alert("Enter valid Credentials")
    }

    if(jsn.success){
      navigate("/");
    }

  }

  const onChange = (event) => {
    setcredentials({...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            {" "}
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
