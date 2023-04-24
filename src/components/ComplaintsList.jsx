import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const ComplaintsList = (props) => {
  console.log(props);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const pageCount = Math.ceil(props.complaints?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        width: "100%",
        height: "100%",
        marginTop: "1rem",
      }}
    >
      {props.complaints?.slice(startIndex, endIndex).map((item, index) => {
        console.log(item);
        const timestamp = moment(item.createdAt).format("MMM Do");
        return (
          <div
            className="flex justify-between border-b py-1.5 px-6 bg-gray-100"
            key={index}
          >
            <p className="w-[8rem] font-bold  "> {item.user?.fname}</p>
            <div className="flex items-center w-[16rem] sm:w-[30rem] truncate   lg:w-[40rem]">
              <p className="font-semibold  ">{item.title} -</p>
              <p className="pl-1 text-gray-500 truncate"> {item.description}</p>
            </div>

            <p className="text-gray-500 w-[6rem] text-end">{timestamp}</p>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => props.handleComplaintClick(item)}
            >
              View
            </Button>
          </div>
        );
      })}
      <Typography align="center" variant="body2">
        Page {currentPage} of {pageCount}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={currentPage === pageCount}
          onClick={handleNextPage}
          sx={{ ml: 1 }}
        >
          Next
        </Button>
      </div>
    </Box>
  );
};

export default ComplaintsList;
