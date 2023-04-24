import { Routes, Route } from "react-router-dom";
// import "./App.css";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ComplaintPage from "./components/ComplaintPage";
import { Grid } from "@mui/material";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import React, { useEffect, useState } from "react";
import CreateMail from "./components/CreateMail";
import { LoginContext } from "./components/ContextProvider/Context";
import Upload from "./components/Upload";
import Profile from "./components/Profile";
import Homee from "./components/Home";
import DeptPage from "./components/DeptPage";

const App = () => {
  const userContext = React.useContext(LoginContext);
  console.log(userContext);
  return (
    <Grid container className="App">
      <ResponsiveAppBar />

      <Routes>
        <Route exact path="/" element={<Login />} />

      

      {userContext?.logindata && (
          <Route path="/Profile" element={<Profile />} />

        )}  

        {userContext?.logindata && !userContext?.logindata.isCreatedByAdmin && (
          <Route path="/user" element={<ComplaintPage />} />
        )}
        {userContext?.logindata && userContext?.logindata.isCreatedByAdmin && (
          <Route path="/dept" element={<DeptPage />} />
        )}
        {userContext?.logindata && !userContext?.logindata.isCreatedByAdmin && (
          <Route path="/complaints" element={<CreateMail />} />
        )}
        <Route exact path="/register" element={<Register />} />

        <Route path="*" element={<Error />} />
        < Route  path="/Home" element={<Homee/>}/>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
      </Routes>
    </Grid>
  );
};

export default App;
