import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Button, Input } from '@mui/material';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    district: '',
    state: '',
    department: '',
    pic: ''
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [picc, setPicc] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginData"));
    console.log(typeof (data));
    setUserData({ email: data.email, username: data.fname, district: data.district, department: data.department, state: data.state, pic: data.pic })

  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginData"));
    if (data.pic !== '') {
      axios.get(`https://mydemocracyserver.onrender.com/upload/${data.pic}`, {
        responseType: "blob",
      }).
        then((res) => {
          const url = URL.createObjectURL(res.data);
          setPicc(url);
        })
    }
  }, [userData])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the form data


  };

  const updatedDetails = async () => {
    const response = await fetch('https://mydemocracyserver.onrender.com/user/update', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fname: userData.username,
        state: userData.state,
        email: userData.email,
        district: userData.district
      }),
    });

    const d = await response.json();
    if (d.status == 201) {
      alert('Details updated successfully');
      localStorage.removeItem('loginData');
      localStorage.setItem('loginData', JSON.stringify(d.userSaved));
      const data = d.userSaved;
      setUserData({ email: data.email, username: data.fname, district: data.district, department: data.department, state: data.state, pic: data.pic })
      setIsDisabled(true);
    } else {
      alert('Details not updated');
    }
  };


  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImageSrc(URL.createObjectURL(file));


  };

  const uploadFile = async () => {
    const formData = new FormData();
    console.log(selectedFile);
    formData.append('profilepic', selectedFile);
    try {
      const res = await fetch(
        `https://mydemocracyserver.onrender.com/upload/profilepic`,
        {
          method: "put",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      )
      const response = await res.json();
      if (response.status == 201) {

        localStorage.removeItem('loginData');
        localStorage.setItem('loginData', JSON.stringify(response.saveduser));
        const data = response.saveduser;
        setUserData({ email: data.email, username: data.fname, district: data.district, department: data.department, state: data.state, pic: data.pic })
        console.log(response.data);
      }

    } catch (error) {
      console.error(error);
    }
  };




  return (

    <div className="bodyregister" >
      <div className="container8">
        <div className="title">PROFILE</div>
        <br />
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className='full-box'>
              <div className="user-details">
                <div className="input-box">
                  <span className="details" id="username">
                    Username
                  </span>
                  <Input
                    disabled={isDisabled}
                    type="text"
                    value={userData.username}
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }

                  />
                </div>
                <div className="input-box">
                  <span className="details" id="username">
                    Email
                  </span>
                  <Input
                    disabled={isDisabled}
                    type="email"
                    value={userData.email}
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }

                  />
                </div>
                <div className="input-box">
                  <span className="details" id="username">
                    Address
                  </span>
                  <Input
                    disabled={isDisabled}
                    type="text"
                    value={userData.district}
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, district: e.target.value })
                    }
                  />
                </div>
                <div className="input-box">
                  <span className="details" id="username">
                    Address
                  </span>
                  <Input
                    disabled={isDisabled}
                    type="text"
                    value={userData.state}
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, state: e.target.value })
                    }
                  />
                </div>
                <div className="input-box">
                  <span className="details" id="department">
                    department
                  </span>
                  <Input
                    disabled={isDisabled}
                    type="department"
                    value={userData.department}
                    id="departmentId"
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, department: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="profile-pic">
                <div className="pic-box">
                  <img src={picc ? picc : imageSrc} alt="profile" />
                  <br />
                  <Button>
                    <label htmlFor="upload-photo">
                      Add Photo
                    </label>
                  </Button>
                  <input
                    id="upload-photo"
                    type="file"
                    name="profilepic"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <Button onClick={uploadFile}>upload file</Button>
                  <Button sx={{ backgroundColor: "green", color: "white", margin: "10px" }} onClick={() => setIsDisabled(false)}> Edit </Button >

                  {!isDisabled && <Button sx={{ backgroundColor: "green", color: "white", margin: "10px" }} onClick={() => updatedDetails()}>Update</Button>}




                </div>
              </div>

            </div>

            {/* <div className="button" id="but">
              <input id="submitBut" type="submit" value="Edit" />

            </div> */}



          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
