import { Grid } from "@mui/material";
import React from "react";

const OpenComplaint = () => {
  const Attachments = [
    {
      name: "Attachment 1",
      url: "https://www.google.com",
    },
    {
      name: "Attachment 2",
      url: "https://www.google.com",
    },
    {
      name: "Attachment 3",
      url: "https://www.google.com",
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1> Title </h1>
      </Grid>
      <Grid item xs={12}>
        <h2>From</h2>
      </Grid>
      <Grid item xs={12}>
        <h2>Message</h2>
      </Grid>
      <Grid item xs={12}>
        <h2>Attachments</h2>
      </Grid>
    </Grid>
  );
};

export default OpenComplaint;
