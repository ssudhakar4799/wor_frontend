import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { approveOrReject, approveOrRejectLeave, pendingLeaves } from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { approvedLeave } from "../Store/Redux/attendance/action";


const LeaveApprove = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { token, empId } = useSelector((state) => state.auth);
    const { approvedLeaves } = useSelector((state) => state.attendanceSlice);
    const dispatch = useDispatch();
    const [selectedEmpId, setSelectedEmpId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [apiRes, setApiRes] = useState(null);

    const handleAction = (empId) => {
        setSelectedEmpId(empId);
        setOpenModal(true);
    }

    const pendingLeavesList = async () => {
        let response = await pendingLeaves(token,{});

        if (response.statusCode === 200) {
            dispatch(approvedLeave(response.data));
        }
    };

    const handleApproveAction = async () => {
        // console.log(`Approve action for empId: ${selectedEmpId}`);
        // // Implement your logic for approve action
        let payload = {
            id: selectedEmpId,
            approveBy: empId,
            approveStatus: "Approved",
        }
        let response = await approveOrRejectLeave(token,payload)

        if (response.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
            pendingLeavesList();
        }
        else {
            setApiRes(false);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
        }
        setOpenModal(false);
    };

    const handleRejectAction = async () => {
        // console.log(`Reject action for empId: ${selectedEmpId}`);
        // // Implement your logic for reject action

        let payload = {
            id: selectedEmpId,
            approveBy: empId,
            approveStatus: "Reject",
        }
        let response = await approveOrRejectLeave(token,payload)

        if (response.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
            pendingLeavesList();
        }
        else {
            setApiRes(false);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
        }
        setOpenModal(false);
    };

    const columns = [
        { field: "id", headerName: "id" },
        {
            field: "empId",
            headerName: "empId",
            width: 100,
            cellClassName: "name-column--cell",
        },
        { field: "date", headerName: "date", width: 200 },
        { field: "leaveType", headerName: "leaveType", width: 200 },
        { field: "description", headerName: "description", width: 200 },
        { field: "approveBy", headerName: "approveBy", width: 200 },
        {
            field: "approveStatus",
            headerName: "approveStatus",
            width: 100,
            renderCell: ({ row }) => (
                <Box
                    width="100%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={"red"}
                    borderRadius="4px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleAction(row.id)} // Pass empId to the handleAccept function
                >
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        Pending
                    </Typography>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        pendingLeavesList();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Punchin Approved" subtitle="Welcome to your Attendance" />
            </Box>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {
                    apiRes == null ? "" :apiRes ? 
                        <Alert variant="filled" severity="success">
                            Leave status successfully updated...
                        </Alert> :
                        <Alert variant="filled" severity="error">
                           Leave status  not updated...
                        </Alert>
                }

            </Stack>

            <Box
                m="8px 0 0 0"
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
                }}
            >
                <DataGrid rows={approvedLeaves} columns={columns} />
            </Box>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} >
                <DialogTitle style={{ color: "white", fontSize: "20px", fontFamily: 'Roboto' }}>{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: "white", fontSize: "12px", fontFamily: 'Roboto' }}>
                        {`Do you want to approve or reject the action for empId: ${selectedEmpId} ?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleApproveAction} style={{ backgroundColor: "green", color: "#fff" }}>
                        Approve
                    </Button>
                    <Button onClick={handleRejectAction} style={{ backgroundColor: "red", color: "#fff" }}>
                        Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LeaveApprove;


