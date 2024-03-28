import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Grid, Tabs, Tab, Container, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../../components/Header';
import Attendance from '../attendance/Attendance';
import Birthday from '../birthday/Birthday';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useDispatch, useSelector } from 'react-redux';
import { checkin, checkout, oneUserCheckinAllData } from '../Store/Redux/attendance/action';
import { OneUserAllPunchinDetails, applyLeave, punchIn, punchOut, todayOnePunchinDetails } from '../api/Api';
import { useForm } from 'react-hook-form';

// stack of alert
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Loader from '../../components/Loader';
import Leave from '../leave/Leave';

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const colors = tokens(theme.palette.mode);
  // const [isPunchedIn, setIsPunchedIn] = useState(true);

  // state for attendance slice
  const { token, empId } = useSelector((state) => state.auth);
  const state = useSelector((state) => state);
  console.log(state);

  const { checkin_id, checkin_Time, checkout_Time, todayStatus, allDatas } = useSelector((state) => state.attendanceSlice)
  const dispatch = useDispatch();


  // useForm 
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [apiRes, setApiRes] = useState(null);



  // fetch today checkin details
  const fetchOneCheckinDetails = async () => {
    // Fetch One User Checkin Details
    let response = await todayOnePunchinDetails({ id: empId })
    if (response.statusCode == 200 || 400) {
      console.log(response.data);
      dispatch(checkin(response.data));
      dispatch(checkout(response.data));
    }
  }

  // fetch all details
  const fetchAllDetails = async () => {
    let res = await OneUserAllPunchinDetails({ id: empId })
    if (res.statusCode == 200) {
      console.log(res.data);
      dispatch(oneUserCheckinAllData(res.data))
    }

  }

  const handlePunchAction = async () => {
    // Perform API call based on the current state (Punch In or Punch Out)
    if (todayStatus) {
      let response = await punchIn(token, {
        "empId": empId,
        "checkinStatus": true
      })
        .then((res) => {
          if (res.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
            fetchOneCheckinDetails();
            fetchAllDetails();
          } else {
            console.log("err");
            setApiRes(false);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
          }
        })
        .catch((err) => console.log(err));

    } else {
      let response = await punchOut(token, {
        "id": checkin_id,
        "checkinStatus": false
      })
        .then((res) => {
          if (res.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
            fetchOneCheckinDetails();
            fetchAllDetails();
          } else {
            console.log("err");
            setApiRes(false);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
          }
        })
        .catch((err) => console.log(err));
    }

    // Toggle the state after the API call is complete
    // setIsPunchedIn(!isPunchedIn);
  };

  useEffect(() => {

    fetchOneCheckinDetails();
    fetchAllDetails();
  }, [])

  const [tabIndex, setTabIndex] = useState(0);
  const [isLeaveApplyDialogOpen, setLeaveApplyDialogOpen] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleOpenLeaveApplyDialog = () => {
    setLeaveApplyDialogOpen(true);
  };

  const handleCloseLeaveApplyDialog = () => {
    setLeaveApplyDialogOpen(false);
  };

  const submit = async (data) => {

    console.log(data, "form data");

    let payload;
    if (data.startDate) {
      payload = {
        "empId": empId,
        "fullDayLeave": {
          "startDate": "2024-02-17",
          "endDate": "2024-02-19"
        },
        "leaveType": data.leaveType,
        "description": data.description
      }
    }
    else {
      payload = {
        "empId": empId,
        "halfDayLeave": {
          "leaveDate": data.leaveDate
        },
        "leaveType": data.leaveType,
        "description": data.description
      }
    }

    console.log(payload);

    if (payload) {

      let response = await applyLeave(token, payload)
        .then((res) => {
          if (res.statusCode == 200) {
            setApiRes(true);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
          }
          else {
            console.log("err");
            setApiRes(false);
            setTimeout(() => {
              setApiRes(null);
            }, 1000)
          }
        })
        .catch((err)=>console.log(err))


        console.log(response);
    }

    reset();

    // Handle form submission logic here
    handleCloseLeaveApplyDialog(); // Close the dialog after submission
  };
  console.log(errors, "form errors");

  return (
    <>
      {
        apiRes ? <Loader /> : <Box m={'20px'}>
          <Box
            display={smScreen ? 'flex' : 'block'}
            flexDirection={smScreen ? 'row' : 'column'}
            justifyContent={smScreen ? 'space-between' : 'start'}
            alignItems={smScreen ? 'center' : 'start'}
            m="10px 0"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box>
              <Button
                sx={{
                  backgroundColor: "orange",
                  color: colors.grey[100],
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  maxWidth: '100%',
                  marginRight: "10px"
                }}
                onClick={handleOpenLeaveApplyDialog}
              >
                <BeachAccessIcon sx={{ mr: '10px' }} />
                Leave Apply
              </Button>
              {
                todayStatus == null ? null : <Button
                  sx={{
                    backgroundColor: todayStatus ? "#48df1e" : 'red',
                    color: colors.grey[100],
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    maxWidth: '100%',
                  }}
                  onClick={handlePunchAction}
                >
                  {todayStatus ? (
                    <>
                      <LoginIcon sx={{ mr: '10px' }} />
                      Punch In
                    </>
                  ) : (
                    <>
                      <LogoutIcon sx={{ mr: '10px' }} />
                      Punch Out
                    </>
                  )}
                </Button>
              }
            </Box>
          </Box>
          <Stack sx={{ width: '100%', padding: "0 0 20px 0" }} spacing={2}>
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
          <div className="row">
            <div className="col-md-3 col-sm-6 ">
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="100%" m="0 30px" p="12px 0">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                      >
                        {"Checkin"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        // backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '0 0 25px 0',
                      }}>
                      <LoginIcon style={{ color: "#9bff00" }} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                      {"Checkin Time"}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontStyle="italic"
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      {checkin_Time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </div>
            <div className="col-md-3 col-sm-6 ">
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="100%" m="0 30px" p="12px 0">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                      >
                        {"CheckOut"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        // backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '0 0 25px 0',
                      }}>
                      <LogoutIcon style={{ color: "#ff1a00" }} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                      {"CheckOut Time"}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontStyle="italic"
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      {checkout_Time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </div>
            <div className="col-md-3 col-sm-6 ">
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="100%" m="0 30px" p="12px 0">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                      >
                        {"Today Work Hours"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        // backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '0 0 25px 0',
                      }}>
                      <HourglassBottomIcon style={{ color: "#f708bf" }} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                      {"Total Hours"}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontStyle="italic"
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      {allDatas.totalTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </div>
            <div className="col-md-3 col-sm-6 ">
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="100%" m="0 30px" p="12px 0">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                      >
                        {"Leave"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        // backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '0 0 25px 0',
                      }}>
                      <BeachAccessIcon style={{ color: "#f5f504" }} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="2px">
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                      {"subtitle"}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontStyle="italic"
                      sx={{ color: colors.greenAccent[600] }}
                    >
                      {"increase"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Box m={"20px 0 0 0"}>
                <Attendance />
              </Box>
            </div>
            <div className="col-md-6">
              <Box m={"20px 0 0 0"}>
                <Leave />
              </Box>
            </div>
          </div>


          {/* Leave Apply Dialog */}
          <Dialog open={isLeaveApplyDialogOpen} onClose={handleCloseLeaveApplyDialog} maxWidth="sm">
            <DialogTitle>Leave Application</DialogTitle>
            <DialogContent >
              <Container maxWidth="sm">
                <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                  <Tabs value={tabIndex} onChange={handleChangeTab} centered>
                    <Tab label="Full Day Leave" style={{ color: "#00fff1", fontSize: "14px", fontFamily: 'Source Sans Pro' }} />
                    <Tab label="Half Day Leave" style={{ color: "#efff00", fontSize: "14px", fontFamily: 'Source Sans Pro' }} />
                  </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                  <form onSubmit={handleSubmit(submit)}>
                    {tabIndex === 0 && (
                      <Box>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="col-sm-12 mx-t3 mb-4">
                              <h2 className="text-center text-info">Register</h2>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="form-outline">
                                <label htmlFor="date-l">Start Date</label>
                                <input type="date" className="form-control input-color" name="startDate" id="date-l"
                                  {...register("startDate",
                                    {
                                      required: "startDate Required"
                                    })}
                                />
                                <p className='text-danger'>{errors.startDate?.message}</p>
                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="form-outline">
                                <label htmlFor="end-l">End Date</label>
                                <input type="date" className="form-control input-color" name="endDate" id="end-l" placeholder="Enter your last name."
                                  {...register("endDate",
                                    {
                                      required: "EndDate Name Is Required"
                                    })}
                                />
                                <p className='text-danger'>{errors.endDate?.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-12 mb-2">
                            <label htmlFor="name-l">Leave Type</label>
                            <select class="form-control" name="role"
                              {...register("leaveType",
                              )}
                            >
                              <option>Options</option>
                              <option value="casualLeave">Casual Leave</option>
                              <option value="sickLeave">Sick Leave</option>
                            </select>
                            <p className='text-danger'>{errors.leaveType?.message}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="col-md-12 mb-2">
                              <div className="form-outline">
                                <label htmlFor="discription-l">Discription</label>
                                <textarea type="text" className="form-control input-color" name="description" id="discription-l" placeholder="Enter your discription."
                                  {...register("description",
                                  )}
                                />
                                <p className='text-danger'>{errors.description?.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="col-sm-12 mx-t3 mb-4">
                              <h2 className="text-center text-info">Register</h2>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="form-outline">
                                <label htmlFor="date-l">Leave Date</label>
                                <input type="date" className="form-control input-color" name="startDate" id="date-l"
                                  {...register("leaveDate",
                                    {
                                      required: "LeaveDate Is Required"
                                    })}
                                />
                                <p className='text-danger'>{errors.leaveDate?.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-12 mb-2">
                            <label htmlFor="name-l">Leave Type</label>
                            <select class="form-control" name="role"
                              {...register("leaveType",
                              )}
                            >
                              <option>Options</option>
                              <option value="casualLeave">Casual Leave</option>
                              <option value="sickLeave">Sick Leave</option>
                            </select>
                            <p className='text-danger'>{errors.leaveType?.message}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="col-md-12 mb-2">
                              <div className="form-outline">
                                <label htmlFor="discription-l">Discription</label>
                                <textarea type="text" className="form-control input-color" name="description" id="discription-l" placeholder="Enter your discription."
                                  {...register("description",
                                  )}
                                />
                                <p className='text-danger'>{errors.description?.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    )}
                    <Button type="submit" variant="contained" style={{ backgroundColor: "blue" }} >
                      Submit
                    </Button>
                  </form>
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLeaveApplyDialog} style={{ backgroundColor: "red" }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box >
      }
    </>
  );
};

export default Dashboard;
