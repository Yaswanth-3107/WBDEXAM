import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ForgotPassword = () => {
  const history = useNavigate();
  const { id, token } = useParams();
  const userValid = async () => {
    const res = await fetch(
      `http://localhost:5001/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.status === 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5001/lg/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.status === 201) {
      setPassword("");
      setMessage(true);
    } else {
      toast.error("! Token Expired generate new Link");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your New Password</h1>
          </div>

          <form>
            {message ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Password Succesfully Updated
              </p>
            ) : (
              ""
            )}
            <div className="form_input">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                value={password}
                onChange={setVal}
                name="password"
                id="email"
                placeholder="Enter Your New Password"
              />
            </div>

            <button className="btn" onClick={sendPassword}>
              Send
            </button>
            <p>
              <Link to="/">Login</Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
