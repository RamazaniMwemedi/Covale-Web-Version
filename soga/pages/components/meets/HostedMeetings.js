import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const HostedMeetings = () => {
  return (
    <Box>
        <Typography variant="h5">Hosted</Typography>
        <Meet/>
    </Box>
  )
}

export default HostedMeetings

const Meet = () => { 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius:"10px",
        backgroundColor:"wheat",
        padding:"5px",
        margin:"2px"
      }}
    >
      <Typography variant="subtitle1">July 4 2022</Typography>
      <Typography variant="caption">duration: time</Typography>
    </Box>
  );
 }