import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RightNav from "./RightNav";
import ComplaintsList from "./ComplaintsList";
import Complaint from "./Complaint";
import Profile from "./Profile";
import { LoginContext } from "./ContextProvider/Context";

const ComplaintPage = () => {
  const {logindata, setLoginData} = useContext(LoginContext);
  console.log(logindata, " from complaint page");
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [unresolvedComplaints, setUnresolvedComplaints] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [gotMessages, setGotMessages] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      console.log("fetch is called")
      const response = await fetch(
        "http://localhost:5001/complaints/sentComplaints",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      setResolvedComplaints(
        data.complaints.filter((complaint) => complaint.resolved === true)
      );
      // set the unresolved complaints
      setUnresolvedComplaints(
        data.complaints.filter((complaint) => complaint.resolved === false)
      );

    };
    const fetchMessages = async () => {
      
      const response = await fetch(
        "http://localhost:5001/messages/sentMessages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setSentMessages(data);

      const response2 = await fetch(
        "http://localhost:5001/messages/gotMessages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data2 = await response2.json();
      setGotMessages(data2);
    };

    fetchMessages();

    fetchComplaints();
  }, []);

  const [onInbox, setOnInbox] = useState(true);
  const [onSent, setOnSent] = useState(false);
  const [got, setGot] = useState(false);
  const[profile,setprofile]=useState(false);
  const [res, onRes] = useState(false);

  const clickOnInbox = () => {
    setOnInbox(true);
    setOnSent(false);
    setGot(false);
    setprofile(false);
    setActiveComplaint(false);
    onRes(false)
  };
  const clickOnSent = () => {
    setOnInbox(false);
    setOnSent(true);
    setGot(false);
    setprofile(false);
    setActiveComplaint(false);
    onRes(false)
  };
  const clickOnGot = () => {
    setOnInbox(false);
    setActiveComplaint(false);
    setOnSent(false);
    setGot(true);
    setprofile(false);
    onRes(false)
  };
  const clickOnprofile =()=>{
    setOnInbox(false);
    setActiveComplaint(false);
    setOnSent(false);
    setGot(false);
    setprofile(true);
    onRes(false)

  }

  const clickOnResolved = () => {
    setOnInbox(false);
    setActiveComplaint(false);
    setOnSent(false);
    setGot(false);
    setprofile(false);
    onRes(true)

  };


  const [activeComplaint, setActiveComplaint] = useState(false);

  const resolveComplaint = async (id) => {
    console.log("jjjfjfj",id)
    const response = await fetch(
      `http://localhost:5001/complaints/resolveComplaint/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // set the unresolved complaints to the new list
    setUnresolvedComplaints(
      unresolvedComplaints.filter((complaint) => complaint._id !== id)
    );
    // set the resolved complaints to the new list
    setResolvedComplaints([...resolvedComplaints, data.savedComplaint]);
   
    alert("Complaint resolved");
    
  };


  const handleComplaintClick = (item) => {
    setActiveComplaint(item);
    setOnInbox(false);
    setOnSent(false);
    setGot(false);
    setprofile(false);
    onRes(false)
  };

  console.log(onInbox, onSent, got);
  console.log("resolved complaints", resolvedComplaints);
  console.log("unresolved complaints", unresolvedComplaints);

  return (
    <Grid container xs={12}>
      <Grid item xs={3}>
        <section className="flex gap-6  fixed p-0">
          <RightNav
            clickOnInbox={clickOnInbox}
            clickOnSent={clickOnSent}
            clickOnGot={clickOnGot}
            clickOnprofile={clickOnprofile}
            clickOnResolved={clickOnResolved}

          />
        </section>
      </Grid>
      <Grid item xs={9}>
        {activeComplaint && <Complaint activeComplaint={activeComplaint} resolveComplaint={resolveComplaint}/>}

        {onInbox && (
          <ComplaintsList
            complaints={unresolvedComplaints}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {res && (
          <ComplaintsList
            complaints={resolvedComplaints}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {got && (
          <ComplaintsList
            complaints={gotMessages}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {profile && (
          <Profile/>

        )}
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
