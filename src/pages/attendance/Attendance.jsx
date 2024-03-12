import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useSelector } from "react-redux";

const Attendance = () => {
    const { checkInAllDatas } = useSelector((state)=>state.attendanceSlice);
    console.log(checkInAllDatas);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Id" },
    { field: "empId", headerName: "empId" },
    {
      field: "date",
      headerName: "date",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "checkinTime", headerName: "checkinTime", width: 200 },
    { field: "checkOutTime", headerName: "checkOutTime", width: 100 },
    { field: "attendanceStatus", headerName: "attendanceStatus", width: 200,
    cellClassName: "name-column--cell" },
    { field: "approveStatus", headerName: "approveStatus", width: 100, cellClassName: "name-column--cell"},
    { field: "approveBy", headerName: "approveBy", width: 100, cellClassName: "name-column--cell" },
    { field: "reason", headerName: "reason", width: 100, cellClassName: "name-column--cell" },

  ];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Attendance" />
      </Box>
      <Box
        m="0 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid  rows={checkInAllDatas} columns={columns} />
      </Box>
    </Box>
  );
};

export default Attendance;

