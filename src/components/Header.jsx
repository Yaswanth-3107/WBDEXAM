import React,{useContext} from 'react'
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import "./header.css";



const Header = () => {

  const history = useNavigate();
  const logout = ()=>{
      localStorage.removeItem("usersdatatoken");
      history("/");
  }
  return (
    <>
      <header>
        <nav>
          <h1>
            <NavLink to="/">
              <img src="./allconnect.png" />{" "}
            </NavLink>
          </h1>
          <h1 >
            <NavLink
              to="/profile"
              style={{ textDecoration: "none", marginLeft: "-400px" }}
            >
              Profile
            </NavLink>
          </h1>

          <div className="avtar">
            <Avatar
              style={{
                background: "salmon",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={logout}
            >
              U
            </Avatar>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header
