

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import {GridList, GridListTile, Backdrop, Fade} from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from 'react-modal';;

const GridItemContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(1)
}));

const Image = styled("img")({
  maxHeight: "90%",
  maxWidth: "90%",
  cursor: "pointer",
});

const ModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  
});

const ModalFade = styled(Fade)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});


function FileDisplay({attachments}) {
  // const [fileData, setFileData] = useState("");
  
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  

  const handleOpen = (img) => {
    console.log(img);
    setOpen(true);
    setImage(img);
  };

  const handleClose = () => {
    setOpen(false);
    setImage("");
  };
  
  console.log(attachments);
 console.log(image)
    
  return (
    <>
     
      <Grid container>
        {attachments.map((url,index) => (
          <GridItemContainer key={attachments[index]} item xs={6} md={4} lg={3}>
            <Image
              src={url}
              alt={attachments[index]}
              // onClick={() => handleOpen(url)}
            />
            <Button onClick={() => handleOpen(url)}>View</Button>
          </GridItemContainer>
        ))}
      </Grid>
      <ModalContainer
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <ModalFade in={open} timeout={500}>
          <Image src={image} alt="asd" />
        </ModalFade>
      </ModalContainer>
        
      
    </>

  );
}

const Complaint = ({ activeComplaint , resolveComplaint}) => {

  console.log(activeComplaint,"activeComplaint");
  const [attachments, setAttachments] = useState([]);
  const user = JSON.parse(localStorage.getItem("loginData"));

  

  useEffect(() => {
    Promise.all(
      activeComplaint.attachments.map((filename) =>
        axios.get(`http://localhost:5001/complaints/uploads/${filename}`, {
          responseType: "blob",
        })
      )
    ).then((responses) => {
      const urls = responses.map((res) => URL.createObjectURL(res.data));
      setAttachments(urls);
    });
  }, [activeComplaint]);

  return (

    <div className="mt-8 mr-8 p-10 bg-white border-2 border-gray-300 rounded-lg leading-6">
      <div className="justify-between">
        
      <h1 className="ext-lg font-medium">{activeComplaint.title}</h1>
      <br/>
      <p className="text-sm font-medium text-gray-500">{activeComplaint.description}</p>
      </div>
      <br/>
      <div>
   
          <FileDisplay
           attachments = {attachments}
           
          
          />
        {
          activeComplaint.resolved === false && user.isCreatedByAdmin === false ? (
      <Button variant="contained"  className="mt-8"  onClick={() => resolveComplaint(activeComplaint._id)}>
        Resolved
      </Button>) : null

        }
    
      </div>
       
    </div>
  );
};

export default Complaint;