import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import RightNav from './RightNav'
import ComplaintsList from './ComplaintsList'
import Complaint from './Complaint'
import Statistics from './Statistics'

const DeptPage = () => {
  // get the data from the local storage
  const user = JSON.parse(localStorage.getItem('loginData'))
  const [resolvedComplaints, setResolvedComplaints] = useState([])
  const [unresolvedComplaints, setUnresolvedComplaints] = useState([])
  const [activeComplaint, setActiveComplaint] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [res, onRes] = useState(false)
  const [unres, onUnres] = useState(true)
  useEffect(() => {
    //get all the complaints which are send to this user department
    fetch(`https://mydemocracyserver.onrender.com/complaints/deptComplaints`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data)

        setResolvedComplaints(
          data.complaints.filter((complaint) => complaint.resolved === true)
        )
        // set the unresolved complaints
        setUnresolvedComplaints(
          data.complaints.filter((complaint) => complaint.resolved === false)
        )
      }
      )
  }, [])

  console.log(resolvedComplaints, unresolvedComplaints);

  const handleRes = () => {
    onRes(true)
    onUnres(false)
    setActiveComplaint(false)
    setStatistics(false)
  }
  const handleUnres = () => {
    onRes(false)
    onUnres(true)
    setActiveComplaint(false)
    setStatistics(false)
  }


  const handleComplaintClick = (item) => {
    console.log(item)
    setActiveComplaint(item);
    onRes(false)
    onUnres(false)
    setStatistics(false)
  };

  const handleStatistics = () => {
    setStatistics(true)
    setActiveComplaint(false)
    onRes(false)
    onUnres(false)
  }

  let data = [
    ["Complaints", "No.of Complaints"],
  ];

  const options = {
    title: "Complaints Statistics \n" + user.department + "- " + user.district,
    is3D: true,
  };

  data.push(["Resolved", resolvedComplaints.length])
  data.push(["Unresolved", unresolvedComplaints.length])
  console.log(data)

  return (
    <Grid container xs={12}>
      <Grid item xs={3}>
        <section className="flex gap-6  fixed p-0">
          <RightNav
            handleRes={handleRes}
            handleUnres={handleUnres}
            handleStatistics={handleStatistics}
          />
        </section>
      </Grid>
      <Grid item xs={9}>
        {activeComplaint && <Complaint activeComplaint={activeComplaint} />}
        {res && <ComplaintsList complaints={resolvedComplaints} handleComplaintClick={handleComplaintClick} />}
        {unres && <ComplaintsList complaints={unresolvedComplaints} handleComplaintClick={handleComplaintClick} />}
        {statistics && <Statistics department={user.department} district={user.district} data={data} options={options} />}

      </Grid>


    </Grid>
  )

}

export default DeptPage