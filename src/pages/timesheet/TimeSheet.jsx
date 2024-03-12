import { Box } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'

const TimeSheet = () => {
  return (
    <Box m={"20px"}>
         <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Timesheet" subtitle="welcome to you Team" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
      >
      </Box>
    </Box>
  )
}

export default TimeSheet
