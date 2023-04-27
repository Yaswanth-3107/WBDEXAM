import React, { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { LoginContext } from "../ContextProvider/Context";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  styled,
} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Main = ({ activeComplaint, onUpdateComplaint, removeFromSidebar }) => {
  const userContext = useContext(LoginContext);
  const onEditField = (field, value) => {
    onUpdateComplaint({
      ...activeComplaint,
      [field]: value,
      lastModified: Date.now(),
    });
  };
  const [attachments, setAttachments] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  useEffect(() => {
    // get the admins from the database of that district and set them in the state
    const getAdmins = async () => {
      try {
        const response = await fetch(
          `https://myserverdemocracy.onrender.com/admins/${userContext.logindata.district}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userContext.logindata.token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        // i want fname and id of the admin
        const a = data.map((admin) => ({
          fname: admin.fname,
          id: admin._id,
          department:
            admin.department.charAt(0).toUpperCase() +
            admin.department.slice(1),
        }));

        setAdmins(a);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmins();
  }, []);

  const onAddAttachments = (event) => {
    setAttachments([...attachments, ...event.target.files]);
  };

  const onRemoveAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // const onAddAdmins = (event) => {
  //   const newAdmins = [...admins, ...event.target.value];
  //   setAdmins(newAdmins);
  // };

  // const onRemoveAdmin = (admin) => {
  //   const newAdmins = admins.filter((a) => a !== admin);
  //   setAdmins(newAdmins);
  // };

  console.log(admins);
  console.log(personName);
  const onDraftComplaint = async () => {
    try {
      // const complaint = complaints.find(({ id }) => id === ComplaintId);
      const complaint = activeComplaint;

      // check if the complaint is already saved in the database or not
      // if it is already saved then update it
      // if it is not saved then save it
      console.log(complaint);

      //query the database to check if the complaint is already saved or not
      // const response1 = await fetch(
      //   `http://localhost:5001/complaints/draft/${complaint.id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       authorization: `Bearer ${userContext.logindata.token}`,
      //     },
      //   }
      // );
      // const data1 = await response1.json();
      // console.log(data1);

      if (complaint.status === "draft") {
        const response = await fetch(
          `https://myserverdemocracy.onrender.com/complaints/draft/${complaint?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              title: complaint.title,
              description: complaint.description,
              user: userContext.logindata._id,
              status: "draft",
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          alert("Complaint saved successfully");
          console.log(data.savedComplaint);
          const com = {
            _id: data.savedComplaint._id,
            id: data.savedComplaint.complaintId,
            title: data.savedComplaint.title,
            description: data.savedComplaint.description,
            status: data.savedComplaint.status,
            lastModified: data.savedComplaint.lastModified,
            user: data.savedComplaint.user,
            admins: data.savedComplaint.admins,
            attachments: data.savedComplaint.attachments,
          };
          onUpdateComplaint(com);
        } else {
          alert("Complaint not saved");
        }
      } else {
        console.log(complaint);
        const response = await fetch(`https://myserverdemocracy.onrender.com/complaints/draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            complaintId: complaint.id,
            title: complaint.title,
            description: complaint.description,
            user: userContext.logindata._id,
            status: "draft",
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          alert("Complaint saved successfully");
          const com = {
            _id: data.savedComplaint._id,
            id: data.savedComplaint.complaintId,
            title: data.savedComplaint.title,
            description: data.savedComplaint.description,
            status: data.savedComplaint.status,
            lastModified: data.savedComplaint.lastModified,
            user: data.savedComplaint.user,
            admins: data.savedComplaint.admins,
            attachments: data.savedComplaint.attachments,
          };
          onUpdateComplaint(com);
        } else {
          alert("Complaint not saved");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(activeComplaint);

  const onSendComplaint = async () => {
    const formData = new FormData();

    // Add complaint data to the form data
    formData.append("id", activeComplaint._id);
    formData.append("complaintId", activeComplaint.id);
    formData.append("title", activeComplaint.title);
    formData.append("description", activeComplaint.description);
    formData.append("user", userContext.logindata._id);
    formData.append("status", "sent");

    // Add attachments to the form data
    console.log(attachments);
    attachments.forEach((attachment) => {
      formData.append("attachments", attachment);
    });

    console.log(formData);
    // Add admins to the form data
    personName.forEach((admin) => {
      const admin_id = admin.split("-")[1];
      formData.append("admins", admin_id);
    });

    // Send the complaint to the server
    if (activeComplaint.status === "draft") {
      try {
        const response = await fetch(
          `https://myserverdemocracy.onrender.com/complaints/send/${activeComplaint?._id}`,
          {
            method: "put",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );
        // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,

        const data = await response.json();
        console.log(data);
        alert("Complaint sent successfully");
        removeFromSidebar(activeComplaint.id);
      } catch (error) {
        console.error(error);
        alert("Failed to send complaint");
      }
    } else {
      try {
        const response = await fetch(`https://myserverdemocracy.onrender.com/complaints/send`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        alert("Complaint sent successfully");
        removeFromSidebar(activeComplaint.id);
      } catch (error) {
        console.error(error);
        alert("Failed to send complaint");
      }
    }
  };

  if (!activeComplaint)
    return <div className="no-active-complaint">No Complaints registered</div>;

  return (
    <div className="app-main">
      <div className="mt-5 ml-5">
        <Button
          className="btn"
          onClick={() => onDraftComplaint(activeComplaint.id)}

        >
          Save as Draft
        </Button>

        {/* Open modal for selecting attachments and admins */}
        <Button className="btn" onClick={() => setModal(true)}>
          Send to Admins
        </Button>
      </div>
      <div className="app-main-complaint-edit">
        <input
          type="text"
          id="title"
          placeholder="Complaint Title"
          value={activeComplaint.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="description"
          placeholder="Write your Complaint here..."
          value={activeComplaint.description}
          onChange={(e) => onEditField("description", e.target.value)}
        />
      </div>
      <div className="app-main-complaint-preview">
        <h1 className="preview-title">{activeComplaint.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeComplaint.description}
        </ReactMarkdown>

      </div>
      <div className="app-main-save-draft">
      </div>

      {/* Modal for selecting attachments and admins */}
      <SytledModal
        open={modal}
        onClose={(e) => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={600}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <div className="modal">
            <div className="modal-content">
              <h2>Select Attachments</h2>
              <input
                type="file"
                name="attachments"
                onChange={onAddAttachments}
                multiple
              />

              <ul>
                {attachments.map((attachment, index) => (
                  <li key={index}>
                    {attachment.name}{" "}
                    <Button onClick={() => onRemoveAttachment(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <h2>Select Admins</h2>
              {/* 
              <Select onChange={onAddAdmins}>
                {admins.map((user, index) => (
                  <MenuItem key={index} value={user.id}>
                    {user.fname}
                  </MenuItem>
                ))}
              </Select>

              <ul>
                {admins.map((admin, index) => (
                  <li key={index}>
                    {admin}{" "}
                    <Button onClick={() => onRemoveAdmin(admin)}>Remove</Button>
                  </li>
                ))}
              </ul> */}
              <div>
                <FormControl sx={{ m: 1, width: 500 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {admins.map((admin) => (
                      <MenuItem
                        key={admin?.id}
                        value={admin.fname + "-" + admin.id}
                      >
                        <Checkbox
                          checked={personName.indexOf(admin.fname) > -1}
                        />
                        <ListItemText
                          primary={
                            "Name: " +
                            admin.fname +
                            " ,Department : " +
                            admin.department
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button className="btn" onClick={() => onSendComplaint()}>
                Send
              </Button>

              <Button className="btn" onClick={() => setModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Box>
      </SytledModal>
      {/* {modal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Attachments</h2>
            <input type="file" onChange={onAddAttachments} multiple />

            <ul>
              {attachments.map((attachment, index) => (
                <li key={index}>
                  {attachment.name}{" "}
                  <button onClick={() => onRemoveAttachment(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h2>Select Admins</h2>
            <select onChange={onAddAdmins} multiple>
              {admins.map((admin, index) => (
                <option
                  key={index}
                  value={admin.fname + " " + admin.department}
                >
                  {admin}
                </option>
              ))}
            </select>

            <ul>
              {admins.map((admin, index) => (
                <li key={index}>
                  {admin}{" "}
                  <button onClick={() => onRemoveAdmin(admin)}>Remove</button>
                </li>
              ))}
            </ul>

            <button className="btn" onClick={() => onSendComplaint()}>
              Send
            </button>

            <button className="btn" onClick={() => setModal(false)}>
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Main;
