import React, { useEffect } from 'react'

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import { leaveList } from '../api/Api';
import { listOfLeaves } from '../Store/Redux/attendance/action';




const Leave = () => {
    const { token, empId } = useSelector((state) => state.auth);
    const { leaves } = useSelector((state) => state.attendanceSlice);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();


    const fetchAllLeaves = async () => {
        let response = await leaveList(token,{ id: empId })
        if (response.statusCode == 200) {
            console.log(response.data);
            dispatch(listOfLeaves(response.data));
        }
        else{
            console.log("error");
        }
    }

    useEffect(() => {
        fetchAllLeaves();
    }, [])




    const columns = [
        { field: "id", headerName: "id" },
        {
            field: "empId",
            headerName: "empId",
            width: 100,
            cellClassName: "name-column--cell",
        },
        { field: "date", headerName: "date", width: 100 },
        { field: "leaveType", headerName: "leaveType", width: 100 },
        { field: "leaveDuration", headerName: "leaveDuration", width: 100 },
        { field: "description", headerName: "description", width: 100 },
        { field: "approveStatus", headerName: "approveStatus", width: 100 },
        { field: "approveBy", headerName: "approveBy", width: 100 },
    ];
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Leave" />
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
                <DataGrid rows={leaves} columns={columns} />
            </Box>
        </Box>
    );
}

export default Leave
