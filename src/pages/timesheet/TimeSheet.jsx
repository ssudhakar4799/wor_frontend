import {
  Box,
  useMediaQuery,
  Button,
  Drawer,
  List,
  IconButton,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { mockDataTeam } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import "./timeSheet.css"
import moment from 'moment';
import { createTimeSheet, getOneUserTimeSheet } from '../api/Api';
import { fetchTimesheets } from '../Store/Redux/timeSheet/action';

const TimeSheet = () => {
  const dispatch = useDispatch();
  const { token, userName, empId, assingnRptMng } = useSelector((state) => state.auth);
  const  {userTimeSheet} = useSelector((state)=>state.timeSheetSlice);
  console.log(userTimeSheet,"timeSheet");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const maxDate = moment().format("YYYY-MM-DD")
  const smllDate = moment(maxDate).format("YYYY-MM-DD")



  // useForm 
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const {
    register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm();

  // open drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(false)

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };


  // submit
  const submit = async (data) => {

    console.log(data);

    let payload = { ...data, userName, empId, rptMng: assingnRptMng }
    console.log(payload);

    const response = await createTimeSheet(token, payload)
      .then((res) => {
        if (res.statusCode == 200) {
          setApiResponse(true);
          fetchUserTimesheet();
          setTimeout(() => {
            setApiResponse(false);
          }, 2000)
        }
      })
      .catch((e) => {
        console.log(e);
      })

  }

  const dateSubmit = async (datas) => {
    let payload = {...datas,empId}
    let response = await getOneUserTimeSheet(token, payload)
    if (response.statusCode == 200) {
      console.log(response.data);
      dispatch(fetchTimesheets(response.data));
    }

  }

  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "empId",
      headerName: "empId",
      width: 200,
    },
    {
      field: "date",
      headerName: "date",
    },
    { field: "jobName", headerName: "jobName", width: 100 },
    { field: "jobCode", headerName: "jobCode", width: 200 },
    { field: "jobType", headerName: "jobType", width: 100 },
    { field: "department", headerName: "department", width: 200 },
    { field: "project", headerName: "project", width: 100 },
    { field: "modules", headerName: "modules", width: 200 },
    { field: "note", headerName: "note", width: 100 },
    { field: "timesheetStatus", headerName: "timesheetStatus", width: 200 },
    { field: "approveStatus", headerName: "approveStatus", width: 200 },
    { field: "approveBy", headerName: "approveBy", width: 200 },
    { field: "stToEdTime", headerName: "stToEdTime", width: 200 },
    { field: "timeDurations", headerName: "timeDurations", width: 200 },



  ];

  const fetchUserTimesheet = async () => {
    let response = await getOneUserTimeSheet(token, {empId})
    if (response.statusCode == 200) {
      console.log(response.data);
      dispatch(fetchTimesheets(response.data));
    }
  }

  useEffect(() => {
    fetchUserTimesheet()
  }, [])

  return (
    <Box m={"20px"}>
      <Box display={smScreen ? 'flex' : 'block'}
        flexDirection={smScreen ? 'row' : 'column'}
        justifyContent={smScreen ? 'space-between' : 'start'}
        alignItems={smScreen ? 'center' : 'start'}
        m="10px 0">
        <Header title="Timesheet" subtitle="welcome to you Team" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
            onClick={handleDrawerOpen}
            style={{ marginTop: '1rem', backgroundColor: '#393f81', color: '#fff' }}
          >
            <AddTaskIcon sx={{ mr: '10px' }} style={{ color: "#f708bf" }} />
            Add TimeSheet
          </Button>
        </Box>
      </Box>


      <Box>
        {/* <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
          onClick={handleDrawerOpen}
          style={{ marginTop: '1rem', backgroundColor: '#393f81', color: '#fff' }}
        >
          <AddTaskIcon sx={{ mr: '10px' }} style={{ color: "#f708bf" }} />
          Start Time
        </Button> */}
        <div className="row">
          <div className="col-sm-12 col-lg-5">
            <form onSubmit={handleSubmit2(dateSubmit)}>
              <div class="input-group mt-4">
                <input type="date" class="form-control input-fields" aria-label="Username"  {...register2("startDate",
                  {
                    required: "StartDate Is Required"
                  })}
                  max={maxDate} />
                <span class="input-group-text input-fields" style={{ color: "white" }}>to</span>
                <input type="date" class="form-control input-fields" aria-label="Server" {...register2("endDate",
                  {
                    required: "EndDate Is Required"
                  })} min={smllDate} />
                <input class="form-control input-fields" type="submit" value="Submit" />

              </div>
              <p className='text-danger'>{errors.startDate?.message}</p>
              <p className='text-danger'>{errors.endDate?.message}</p>
            </form>
          </div>
        </div>

      </Box>


      <Box
        m="28px 0 0 0"
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
        <DataGrid rows={userTimeSheet} columns={columns} />
      </Box>


      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ backgroundColor: '#1F2A40', padding: '20px', height: "auto" }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleDrawerClose} color="inherit">
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </Box>

          {/* Drawer content goes here */}
          <List>
            <form className='mt-3' onSubmit={handleSubmit(submit)}>
              <div className="row">
                <div className="col-md-12 mb-2">
                  <div className="col-sm-12 mx-t3 mb-4">
                    <h2 className="text-center text-info">Add Timesheet</h2>
                  </div>
                  <div className="col-md-12 mb-2 pb-2">
                    <div className="form-outline">
                      <label htmlFor="date-l">Date</label>
                      <input type="date" className="form-control input-color" id="date-l"
                        {...register("date",
                          {
                            required: "Date Is Required"
                          })}
                      />
                      <p className='text-danger'>{errors.date?.message}</p>
                    </div>
                  </div>
                  <div className="col-md-12 mb-2 pb-2">
                    <div className="form-outline">
                      <label htmlFor="stTime-l">Start Time</label>
                      <input type="time" className="form-control input-color" id="stTime-l"
                        {...register("stTime",
                          {
                            required: "Start Time Is Required"
                          })} />
                      <p className='text-danger'>{errors.stTime?.message}</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-md-12 mb-2 pb-2">
                  <div className="form-outline">
                    <div className="col-sm-12 form-group">
                      <label htmlFor="endTime">End Time</label>
                      <input type="time" className="form-control input-color" id="endTime"
                        {...register("edTime",
                          {
                            required: "End Time Is Required"
                          })} />
                      <p className='text-danger'>{errors.edTime?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2 pb-2 d-flex align-items-center">
                  <div className="form-outline datepicker w-100">
                    <label htmlFor="jobName">Job Name</label>
                    <input type="text" className="form-control input-color" name="jobName" id="jobName" placeholder="Enter your jobName"
                      {...register("jobName",
                        {
                          required: "jobName Is Required"
                        })} />
                    <p className='text-danger'>{errors.jobName?.message}</p>

                  </div>
                </div>
                <div className="col-md-12 mb-2 pb-2 d-flex align-items-center">
                  <div className="form-outline datepicker w-100">
                    <label htmlFor="jobCode">Job Code </label>
                    <input type="text" className="form-control input-color" name="jobCode" id="jobCode" placeholder="Enter your Jobcode"
                      {...register("jobCode",
                        {
                          required: "JobCode Is Required"
                        })} />
                    <p className='text-danger'>{errors.jobCode?.message}</p>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-12 mb-2 pb-2">
                  <label htmlFor="jobType">Job Type</label>
                  <select className="form-control" name="role"
                    {...register("jobType",
                      {
                        required: "JobType Is Required"
                      })} >
                    <option value="Coordinate">Coordinate</option>
                    <option value="Train">Train</option>
                    <option value="Validate">Validate</option>
                    <option value="Manage">Manage</option>
                    <option value="Meet">Meet</option>
                    <option value="Clarify">Clarify</option>
                    <option value="Internal_Dev">Internal Dev</option>
                    <option value="Project_Div">Project Div</option>
                  </select>
                  <p className='text-danger'>{errors.jobType?.message}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-12 mb-2 pb-2">
                  <label htmlFor="department">Department</label>
                  <select className="form-control" name="department"
                    {...register("department",
                      {
                        required: "Department Is Required"
                      })} >
                    <option value="Fablogic">Fablogic</option>
                    <option value="Fabevy">Fabevy</option>
                    <option value="Englishbevy">Englishbevy</option>
                    <option value="Skillbevy">Skillbevy</option>
                  </select>
                  <p className='text-danger'>{errors.department?.message}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-12 mb-2 pb-2">
                  <label htmlFor="project">Project </label>
                  <input type="text" className="form-control input-color" name="project" id="project" placeholder="Enter your project"
                    {...register("project",
                      {
                        required: "Project Is Required"
                      })} />
                  <p className='text-danger'>{errors.project?.message}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-12 mb-2 pb-2">
                  <label htmlFor="billability">Billability</label>
                  <select className="form-control" name="role"
                    {...register("billability",
                    )} >
                    <option>Options</option>
                    <option value="Billable" >Billable</option>
                    <option value="Non_Billable" >Non-Billable</option>
                  </select>
                  <p className='text-danger'>{errors.billability?.message}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2 pb-2">
                  <div className="form-outline">
                    <label htmlFor="modules">Modules</label>
                    <input type="text" className="form-control input-color" name="modules" id="modules" placeholder="Enter your modules."
                      {...register("modules",
                        {
                          required: "Module Is Required"
                        })} />
                    <p className='text-danger'>{errors.modules?.message}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2 pb-2">
                  <div className="form-outline">
                    <label htmlFor="note">Note</label>
                    <textarea type="text" className="form-control input-color" name="note" id="note" placeholder="Enter your notes."
                      {...register("note",
                      )} />
                    <p className='text-danger'>{errors.note?.message}</p>
                  </div>
                </div>
              </div>
              {
                apiResponse ? <h5 className='text-success'>Successfuly user create</h5> : null
              }
              <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" style={{ width: "100%" }} type="submit" value="Submit" />
              </div>
            </form>
          </List>
        </div>
      </Drawer>
    </Box>
  )
}

export default TimeSheet
