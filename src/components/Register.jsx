import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    district: "",
    state: "",
    aadhar: "",
  });

  //   console.log(inpval);

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const adduserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword, district, state, aadhar } =
      inpval;

    if (fname === "") {
      alert("Please enter Your name");
    } else if (email === "") {
      alert("Please enter Your email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (!email.includes(".")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Enter your password");
    } else if (password.length < 8) {
      alert("Password must be 8 char");
    } else if (cpassword === "") {
      alert("Enter your Confirm Password");
    } else if (cpassword.length < 8) {
      alert("Password mut be 8 char");
    } else if (password !== cpassword) {
      alert("Password and Confirm Password not match");
    } else if (aadhar < 12) {
      alert("Enter correct aadhar");
    } else if (state === "") {
      alert("Enter state");
    } else if (district === "") {
      alert("Enter district");
    } else {
      // console.log("User registration succesfully done");

      const data = await fetch("http://localhost:5001/lg/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
          district,
          state,
          aadhar,
        }),
      });
      const res = await data.json();
      console.log(res.status);

      if (res.status === 201) {
        alert("user registration done");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
          district: "",
          state: "",
          aadhar: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using this Project to manage <br />
              your tasks! we hope that you will get like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                onChange={setVal}
                value={inpval.fname}
                id="fname"
                placeholder="Enter Your Email Name"
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={setVal}
                value={inpval.email}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  onChange={setVal}
                  value={inpval.password}
                  id="password"
                  placeholder="Enter Your Password Address"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  onChange={setVal}
                  value={inpval.cpassword}
                  id="cpassword"
                  placeholder="Enter Your Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCpassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="district">District</label>
              <input
                type="text"
                name="district"
                onChange={setVal}
                value={inpval.district}
                id="district"
                placeholder="Enter Your District Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="state">state</label>
              <input
                type="text"
                name="state"
                onChange={setVal}
                value={inpval.state}
                id="state"
                placeholder="Enter Your state Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="aadhar">Aadhar</label>
              <input
                type="text"
                name="aadhar"
                onChange={setVal}
                value={inpval.aadhar}
                id="aadhar"
                placeholder="Enter Your aadhar"
              />
            </div>

            <button className="btn" onClick={adduserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
