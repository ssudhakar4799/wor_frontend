import React, { useEffect, useState } from 'react';
import {
    Box,
    useMediaQuery,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    TextField,
    IconButton,
} from '@mui/material';
import "./AdminDashboard.css"
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { getAllUser, regUser } from '../api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { userGetData } from '../Store/Redux/users/action';

const AdminDashboard = () => {

    // userList for Slice
    const { userList } = useSelector((state) => state.userSlice);
    console.log(userList);
    const dispatch = useDispatch();


    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const colors = tokens(theme.palette.mode);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [list, setList] = useState(null);
    const [apiResponse, setApiResponse] = useState(false)

    // useForm 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };


    const getAllDatas = async () => {
        let data = await getAllUser({});
        dispatch(userGetData(data.data))
    }



    const submit = async (data) => {

        try {
            console.log(data.profile[0]);
            // e.target.files[0]
            const formData = new FormData();
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('empId', data.empId)
            formData.append('dob', data.dob)
            formData.append('gender', data.gender)
            formData.append('joininDate', data.joininDate)
            formData.append('role', data.role)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('reportingManager', data.reportingManager)
            formData.append('team', data.team)
            formData.append('rptManager', data.rptmanager)
            formData.append('profile', data.profile[0])

            let response = await regUser(formData)

            console.log(response);
            if (response.statusCode.statusCode == "200") {
                setApiResponse(true);
                getAllDatas();
                setTimeout(() => {
                    setApiResponse(false);
                }, 2000)
            }
            console.log(response);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllDatas()
    }, [])

    return (
        <Box m={'20px'}>
            <Box
                display={smScreen ? 'flex' : 'block'}
                flexDirection={smScreen ? 'row' : 'column'}
                justifyContent={smScreen ? 'space-between' : 'start'}
                alignItems={smScreen ? 'center' : 'start'}
                m="10px 0"
            >
                <Header title="ADMIN DASHBOARD" subtitle="Welcome to your dashboard" />

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
                        <PeopleOutlinedIcon sx={{ mr: '10px' }} />
                        Create Employee
                    </Button>
                </Box>
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
                                        <h2 className="text-center text-info">Register</h2>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-outline">
                                            <label htmlFor="name-l">First Name</label>
                                            <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                                {...register("firstName",
                                                    {
                                                        required: "First Name Is Required"
                                                    })}
                                            />
                                            <p className='text-danger'>{errors.firstName?.message}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-outline">
                                            <label htmlFor="name-l">Last Name</label>
                                            <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                                {...register("lastName",
                                                    {
                                                        required: "Last Name Is Required"
                                                    })} />
                                            <p className='text-danger'>{errors.lastName?.message}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-outline">
                                        <div className="col-sm-12 form-group">
                                            <label htmlFor="employeeId">EmployeeId</label>
                                            <input type="text" className="form-control input-color" name="employeeId" id="employeeId" placeholder="Enter your EmployeeId."
                                                {...register("empId",
                                                    {
                                                        required: "Employee Id Is Required"
                                                    })} />
                                            <p className='text-danger'>{errors.empId?.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2 d-flex align-items-center">
                                    <div className="form-outline datepicker w-100">
                                        <label htmlFor="dob">BirthDay</label>
                                        <input type="date" className="form-control input-color" name="dob" id="dob" placeholder="choose your dob"
                                            {...register("dob",
                                                {
                                                    required: "DOB Is Required"
                                                })} />
                                        <p className='text-danger'>{errors.dob?.message}</p>

                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <h6 className="mb-2 pb-1">Gender: </h6>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender" value="female"
                                            {...register("gender",
                                                {
                                                    required: "gender Is Required"
                                                })} checked />
                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender" value="male"
                                            {...register("gender",
                                                {
                                                    required: "gender Is Required"
                                                })} />
                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender" value="others"
                                            {...register("gender",
                                                {
                                                    required: "gender Is Required"
                                                })} />
                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                    </div>
                                    <p className='text-danger'>{errors.gender?.message}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2 pb-2">
                                    <div className="form-outline">
                                        <label htmlFor="joininDate">Joining Date</label>
                                        <input type="date" className="form-control input-color" name="joininDate" id="joininDate" placeholder="Enter your joining date."
                                            {...register("joininDate",
                                                {
                                                    required: "joininDate Is Required"
                                                })} />
                                        <p className='text-danger'>{errors.joininDate?.message}</p>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-2">
                                    <label htmlFor="name-l">Role</label>
                                    <select class="form-control" name="role"
                                        {...register("role",
                                            {
                                                required: "role Is Required"
                                            })} >
                                        <option value="tech_trainer">Tech Trainer</option>
                                        <option value="executive_accountant">Executive - Accountant</option>
                                        <option value="business_development_executive">Business Development Executive</option>
                                        <option value="quality_assurance_expert">Quality Assurance Expert</option>
                                        <option value="operations_executive">Operations Executive</option>
                                        <option value="creative_designer">Creative Designer</option>
                                        <option value="program_co-ordinator">Program Co-ordinator</option>
                                        <option value="head_of_operations">Head of Operations</option>
                                        <option value="software_engineer">Software Engineer</option>
                                        <option value="software_engineer_trainee">Software Engineer Trainee</option>
                                        <option value="managing_director">Managing Director</option>
                                        <option value="director_of_HR_operations">Director of HR Operations</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <p className='text-danger'>{errors.role?.message}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-2">
                                    <label htmlFor="name-l">Team</label>
                                    <select class="form-control" name="role"
                                        {...register("team",
                                            {
                                                required: "team Is Required"
                                            })} >
                                        <option value="Android">Android Developer</option>
                                        <option value="Testing">Testing</option>
                                        <option value="Designing">Designing</option>
                                        <option value="Ios">Ios Developer</option>
                                        <option value="Business">Business</option>
                                        <option value="Frond_end_developer">Frond End Developer</option>
                                        <option value="Backend_developer">Backend Developer</option>
                                        <option value="Full_stack_developer">Full Stack Developer</option>
                                    </select>
                                    <p className='text-danger'>{errors.team?.message}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-2">
                                    <label htmlFor="name-l">Reproting Managers</label>
                                    <select class="form-control" name="role"
                                        {...register("reportingManager",
                                        )} >
                                        <option>Options</option>
                                        <option value="FAB002">Vinoth</option>
                                        <option value="FAB003">Praba</option>
                                    </select>
                                    {/* <p className='text-danger'>{errors.reportingManager?.message}</p> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12 mb-2">
                                    <label htmlFor="name-l">Assign for ReportingManager</label>
                                    <select class="form-control" name="role"
                                        {...register("rptmanager",
                                        )} >
                                        <option>Options</option>
                                        <option value={true} >True</option>
                                        <option value={false}>False</option>
                                    </select>
                                    {/* <p className='text-danger'>{errors.reportingManager?.message}</p> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2 pb-2">
                                    <div className="form-outline">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="email" placeholder="Enter your email."
                                            {...register("email",
                                                {
                                                    required: "email Is Required"
                                                })} />
                                        <p className='text-danger'>{errors.email?.message}</p>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2 pb-2">
                                    <div className="form-outline">
                                        <label htmlFor="password">Password</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="password" placeholder="Enter your password."
                                            {...register("password",
                                                {
                                                    required: "password Is Required"
                                                })} />
                                        <p className='text-danger'>{errors.password?.message}</p>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2 pb-2">
                                    <div className="form-outline">
                                        <label htmlFor="mobileNumber">Mobile NO</label>
                                        <input type="number" className="form-control input-color" name="mobileNumber" id="mobileNumber" placeholder="Enter your joining date."
                                            {...register("mobileNumber",
                                                {
                                                    required: "Mobile Is Required"
                                                }
                                            )} />
                                        <p className='text-danger'>{errors.mobileNumber?.message}</p>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-2 pb-2">
                                    <div className="form-outline">
                                        <label htmlFor="profile">Profile</label>
                                        <input type="file" className="form-control input-color" name="profile" id="profile" placeholder="Enter your joining date."
                                            {...register("profile",
                                            )} />
                                        {/* <p className='text-danger'>{errors.profile?.message}</p> */}

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


            {/* <div class="container">
                <div class="card ">
                    <div class="lines"></div>
                    <div class="imageBox">
                        <img src="https://i.pravatar.cc/600?img=24" alt="avatar" />
                    </div>
                    <div class="content">
                        <div class="details">
                            <h2>Alice Clooney <br /> <span>Senior Front-end Developer</span></h2>
                            <div class="info">
                                <h3>93 <br /><span>Posts</span></h3>
                                <h3>170k <br /><span>Followers</span></h3>
                                <h3>842 <br /><span>Following</span></h3>
                            </div>
                            <div class="actions">
                                <button>Follow</button>
                                <button>Message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="lines"></div>
                    <div class="imageBox">
                        <img src="https://i.pravatar.cc/600?img=24" alt="avatar" />
                    </div>
                    <div class="content">
                        <div class="details">
                            <h2>Alice Clooney <br /> <span>Senior Front-end Developer</span></h2>
                            <div class="info">
                                <h3>93 <br /><span>Posts</span></h3>
                                <h3>170k <br /><span>Followers</span></h3>
                                <h3>842 <br /><span>Following</span></h3>
                            </div>
                            <div class="actions">
                                <button>Follow</button>
                                <button>Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="row">
                {
                    userList?.map((items, index) => {
                        return (
                            <div className="col-12 col-sm-12 col-md-4 pt-4" key={index}>

                                <div class="card-container">
                                    <span class="pro">PRO</span>
                                    <img
                                        class="round"
                                        src={`http://localhost:8000/${items.profile}`}
                                        alt="user"
                                        width={"50%"}
                                    />
                                    <h3>{items.firstName}</h3>
                                    <h3>{items.empId}</h3>
                                    <h6>{items.role}</h6>
                                    {/* <p>
                                        User interface designer and <br />
                                        front-end developer
                                    </p> */}
                                    <div class="buttons pt-2">
                                        <button class="primary">
                                            Message
                                        </button>
                                        <button class="primary ghost ms-2">
                                            Following
                                        </button>
                                    </div>
                                    <div class="skills">
                                        <h6>Skills</h6>
                                        <ul>
                                            <li>UI / UX</li>
                                            <li>Frontend Development</li>
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>JavaScript</li>
                                            <li>React</li>
                                            <li>React</li>
                                            <li>Node</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </Box>
    );
};

export default AdminDashboard;
