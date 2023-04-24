import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./mix.css";
import { LoginContext } from "./ContextProvider/Context";

const Login = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  // Redirect user to appropriate page if already logged in
  useEffect(() => {
    if (logindata) {
      if (logindata.isCreatedByAdmin) {
        history("/admin");
      } else {
        history("/user");
      }
    }
  }, [logindata, history]);

  console.log(inpval);

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

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "") {
      alert("Please enter Your email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (!email.includes(".")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Enter your password");
    } else if (password.length < 8) {
      alert("Password must be 8 char");
    } else {
      // console.log("user login succesfully");
      const data = await fetch("http://localhost:5001/lg/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      //  console.log(res);

      if (res.status === 201) {
        //save context data
        setLoginData(res.result.userValid);
        localStorage.setItem("loginData", JSON.stringify(res.result.userValid));
        localStorage.setItem("token", res.result.token);
        if (res.result.userValid.isCreatedByAdmin) {
          history("/dept");
        } else {
          history("/Home");
        }
        setInpval({ ...inpval, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please Login.</p>
          </div>

          <form>
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
                  id="password"
                  value={inpval.password}
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

            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>{" "}
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password <NavLink to="/password-reset">Click Here</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
