import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessmessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      name: name,
      phoneNo: phoneNo,
    };

    axios
      .post("https://protected-plateau-82492-26f0113d64bb.herokuapp.com/api/users/register", data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userName", response.data.name);
        setSuccessmessage(true);
        setTimeout(() => {
          setSuccessmessage(false);
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {successMessage ? (
                <p className="text-center" style={{ color: "green" }}>
                  Registration successful
                </p>
              ) : (
                ""
              )}
              <div class="form my-3">
                <label for="Name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div class="form my-3">
                <label for="Email">Mobile number</label>
                <input
                  type="text"
                  class="form-control"
                  id="PhoneNo"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="+92xxxxxxxxxx"
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info">
                    Login
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
