import { Box, Typography } from '@mui/material'
import React from 'react'
import Chart from 'react-google-charts'

const Statistics = ({department,district,data,options}) => {
    
  return (
    // <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'white-smoke',border : 1, margin : 2 ,borderRadius : '50%'}}>
<div style = {{display : "flex",alignItems : "center",justifyContent : "center",flexDirection:"column"}}>
    <Chart
    chartType="PieChart"
    data={data}
    options={options}
    width={"100%"}
    height={"400px"}
   
    
  />
    {/* <Typography align="center" variant="body2">
        {department} - {district}
        </Typography> */}
    </div>
  )
}

export default Statistics