import React from 'react'
import {
  Box,
  //  Typography, useTheme 
} from "@mui/material";
import Header from "../../components/Header";
const Services = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Services" subtitle="welcome to you Team" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
      >
      </Box>
    </Box>
  )
}

export default Services
