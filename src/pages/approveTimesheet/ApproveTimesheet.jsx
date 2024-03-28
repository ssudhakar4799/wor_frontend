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
import { approveOrReject, approveOrRejectTimesheet, getPendingTimesheet } from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { approvedTimesheet } from "../Store/Redux/timeSheet/action";


const ApproveTimesheet = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { token, empId } = useSelector((state) => state.auth);
    const { approveTimesheet } = useSelector((state) => state.timeSheetSlice);
    console.log(approveTimesheet);
    const dispatch = useDispatch();
    const [selectedEmpId, setSelectedEmpId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [apiRes, setApiRes] = useState(null);

    const handleAction = (empId) => {
        setSelectedEmpId(empId);
        setOpenModal(true);
    }

    // const handleAccept = (empId) => {
    //     setSelectedEmpId(empId);
    //     setOpenModal(true);
    // };

    // const handleReject = (empId) => {
    //     setSelectedEmpId(empId);
    //     setOpenModal(true);
    // };


    const pendingTimesheet = async () => {
        let response = await getPendingTimesheet(token, { empId });
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(approvedTimesheet(response.data));
        }
    };

    const handleApproveAction = async () => {
        console.log(`Approve action for empId: ${selectedEmpId}`);
        // Implement your logic for approve action
        let payload = {
            id: selectedEmpId,
            approveBy: empId,
            timesheetStatus: "Completed",
            approveStatus: "Approve"
        }
        let response = await approveOrRejectTimesheet(token,payload)

        if (response.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
            pendingTimesheet();
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
        console.log(`Reject action for empId: ${selectedEmpId}`);
        // Implement your logic for reject action

        let payload = {
            id: selectedEmpId,
            approveBy: empId,
            timesheetStatus: "Pending",
            approveStatus: "Reject"
        }
        let response = await approveOrRejectTimesheet(token,payload)

        if (response.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
                setApiRes(null);
            }, 1000)
            pendingTimesheet();
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
        { field: "id", headerName: "Id", width: 200, cellClassName: "name-column--cell" },
        { field: "empId", headerName: "empId", width: 100, cellClassName: "name-column--cell" },
        { field: "date", headerName: "date", type: "number", headerAlign: "left", align: "left", width: 200 },
        { field: "department", headerName: "department", width: 200 },
        { field: "project", headerName: "project", width: 200 },
        { field: "billability", headerName: "billability", width: 200 },
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
        // {
        //     field: "accept",
        //     headerName: "accept",
        //     width: 100,
        //     renderCell: ({ row }) => (
        //         <Box
        //             width="100%"
        //             m="0 auto"
        //             p="5px"
        //             display="flex"
        //             justifyContent="center"
        //             backgroundColor={"green"}
        //             borderRadius="4px"
        //             sx={{ cursor: "pointer" }}
        //             onClick={() => handleAccept(row.empId)} // Pass empId to the handleAccept function
        //         >
        //             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
        //                 Accept
        //             </Typography>
        //         </Box>
        //     ),
        // },
        // {
        //     field: "reject",
        //     headerName: "reject",
        //     width: 100,
        //     renderCell: ({ row }) => (
        //         <Box
        //             width="100%"
        //             m="0 auto"
        //             p="5px"
        //             display="flex"
        //             justifyContent="center"
        //             backgroundColor={"red"}
        //             borderRadius="4px"
        //             sx={{ cursor: "pointer" }}
        //             onClick={() => handleReject(row.empId)} // Pass empId to the handleReject function
        //         >
        //             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
        //                 Reject
        //             </Typography>
        //         </Box>
        //     ),
        // },
    ];

    useEffect(() => {
        pendingTimesheet();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Punchin Approved" subtitle="Welcome to your Attendance" />
            </Box>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {
                    apiRes == null ? "" : apiRes ?
                        <Alert variant="filled" severity="success">
                            Attendance status successfully updated...
                        </Alert> :
                        <Alert variant="filled" severity="error">
                            Attendance status  not updated...
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
                <DataGrid rows={approveTimesheet} columns={columns} />
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

export default ApproveTimesheet;



