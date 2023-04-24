import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import "./createMail.css";
import { LoginContext } from "./ContextProvider/Context";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
function CreateMail() {
  const userContext = useContext(LoginContext);
  const [complaints, setcomplaints] = useState([]);
  const [activeComplaint, setActiveComplaint] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("complaints", JSON.stringify(complaints));
  // }, [complaints]);

  // get complaints which are saved as draft in the database and display them in the sidebar
  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/complaints/draftComplaints`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          const comp = data.complaints.map((complaint) => { 
            return {
              _id: complaint._id,
              id: complaint.complaintId,
              title: complaint.title,
              description: complaint.description,
              attachments: complaint.attachments,
              user: complaint.user,
              status: complaint.status,
              admins: complaint.admins,
              lastModified: complaint.lastModified,
            };
          });
          setcomplaints(comp);
        } else {
          alert("No complaints found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComplaints();
  }, []);

  const onAddComplaint = () => {
    const newComplaint = {
      _id: "",
      id: uuid(),
      title: "Untitled Complaint",
      description: "",
      attachments: [],
      user: userContext.logindata._id,
      status: "not saved",
      admins: [],
      lastModified: new Date().getTime(),
    };

    setcomplaints([newComplaint, ...complaints]);
    setActiveComplaint(newComplaint.id);
  };

  const removeFromSidebar = (ComplaintId) => {
    setcomplaints(complaints.filter(({ id }) => id !== ComplaintId));
  };

  const onDeleteComplaint = async (ComplaintId) => {
    const complaint = complaints.find(({ id }) => id === ComplaintId);
    if (complaint.status === "sent") {
      alert("Complaint already sent");
      return;
    }
    if (complaint.status === "draft") {
      // delete from database
      try {
        const response = await fetch(
          `http://localhost:5001/complaints/${ComplaintId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userContext.logindata.token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
          alert("Complaint deleted successfully");
        } else {
          alert("Complaint not deleted");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setcomplaints(complaints.filter(({ id }) => id !== ComplaintId));
  };

  const onUpdateComplaint = (updatedComplaint) => {
    const updatedcomplaintsArr = complaints.map((Complaint) => {
      if (Complaint.id === updatedComplaint.id) {
        return updatedComplaint;
      }

      return Complaint;
    });

    setcomplaints(updatedcomplaintsArr);
  };

  const getActiveComplaint = () => {
    return complaints.find(({ id }) => id === activeComplaint);
  };

  return (
    <div className="mail">
      <Sidebar
        complaints={complaints}
        onAddComplaint={onAddComplaint}
        onDeleteComplaint={onDeleteComplaint}
        activeComplaint={activeComplaint}
        setActiveComplaint={setActiveComplaint}
      />
      <Main
        activeComplaint={getActiveComplaint()}
        onUpdateComplaint={onUpdateComplaint}
        removeFromSidebar={removeFromSidebar}
      />
    </div>
  );
}

export default CreateMail;
