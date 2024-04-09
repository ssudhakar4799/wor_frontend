import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material"
import Header from '../../components/Header'
import "./profile.css"
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from "react-redux";
import { changePassword, particularUserDetails } from '../api/Api'

const Profile = () => {
    // userDetails
    const { token, empId } = useSelector((state) => state.auth);
    // console.log(state);
    // use-form 
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    const [userData, setUserData] = useState(null);
    console.log(userData);
    const [apiResponse, setApiResponse] = useState(false);
    const [apiError,setApiError] = useState("");

    const submit = async (data) => {
        let payload = {
            id:empId,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            password: data.confirmPassword,
        }
        console.log(payload);
        let response = await changePassword(token, payload)
            .then((res) => {
                if (res.statusCode == 200) {
                    setApiResponse(true);
                    setTimeout(() => {
                        setApiResponse(false)
                    }, 2000)
                    reset()
                }
                else{
                   setApiError(res.message)

                   setTimeout(()=>{
                    setApiError("")
                   },2000)
                }
            })
            .catch((error) => console.log(error))

    }

    const findOneUserDetails = async () => {

        const response = await particularUserDetails(token, { id: empId })
            .then((res) => {
                if (res.statusCode === 200) {
                    setUserData(res.data)
                    reset(res.data)
                }
            })
            .catch((e) => { console.log(e) })
        // console.log(response);
        // if(response.statusCode === 200){
        // }

    }


    useEffect(() => {
        findOneUserDetails();
    }, [])

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Profile" subtitle="welcome to you profile" />
            </Box>
            <div class="container p-5">
                <ul class="nav nav-pills mb-3 border-bottom border-2" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link text-primary fw-semibold active position-relative" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link text-primary fw-semibold position-relative" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Change Password</button>
                    </li>
                    {/* <li class="nav-item" role="presentation">
                        <button class="nav-link text-primary fw-semibold position-relative" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                    </li> */}
                </ul>
                <div class="tab-content border rounded-3 border-primary p-3 text-danger" id="pills-tabContent" style={{ backgroundColor: "#1f2a40" }}>
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {/* <form className='mt-3'> */}
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="col-sm-12 mx-t3 mb-4">
                                    <h2 className="text-center text-info">User details update</h2>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-outline">
                                        <label htmlFor="name-l" className='profiless'>First Name</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                            value={userData?.firstName}

                                            // {...register("firstName",
                                            //     {
                                            //         required: "FirstName is required",
                                            //         onChange: (e) => { setUserData({ ...userData, firstName: e.target.value }) }
                                            //     })}
                                            disabled

                                        />
                                        {/* <p className='text-danger'>{errors.firstName?.message}</p> */}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-outline">
                                        <label htmlFor="name-l" className='profiless'>Last Name</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                            value={userData?.email}

                                            // {...register("email",
                                            //     {
                                            //         required: "Email  Is Required",
                                            //         onChange: (e) => { setUserData({ ...userData, email: e.target.value }) }
                                            //     })}
                                            disabled
                                        />
                                        {/* <p className='text-danger'>{errors.email?.message}</p> */}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-outline">
                                        <label htmlFor="name-l" className='profiless'>DOB</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                            value={userData?.dob}

                                            // {...register("role",
                                            //     {
                                            //         required: "Role Is Required",
                                            //         onChange: (e) => { setUserData({ ...userData, role: e.target.value }) }
                                            //     })}
                                            disabled
                                        />
                                        {/* <p className='text-danger'>{errors.role?.message}</p> */}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-outline">
                                        <label htmlFor="name-l" className='profiless'>AGE</label>
                                        <input type="text" className="form-control input-color" name="lastName" id="name-l" placeholder="Enter your last name."
                                            value={userData?.age}

                                            // {...register("role",
                                            //     {
                                            //         required: "Role Is Required",
                                            //         onChange: (e) => { setUserData({ ...userData, role: e.target.value }) }
                                            //     })}
                                            disabled
                                        />
                                        {/* <p className='text-danger'>{errors.role?.message}</p> */}
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        {/* {
                                apiResponse ? <h5 className='text-success'>Successfuly user create</h5> : null
                            } */}
                        {/* <div className="mt-4 pt-2">
                                <input className="btn btn-primary btn-lg" style={{ width: "100%" }} type="submit" value="Update" />
                            </div> */}
                        {/* </form> */}
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <form className='mt-3' onSubmit={handleSubmit(submit)}>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="col-sm-12 mx-t3 mb-4">
                                        <h2 className="text-center text-info">Password update</h2>
                                    </div>

                                    <div className="col-md-12 mb-2">
                                        <div className="form-outline">
                                            <label htmlFor="oldpassword" className='profiless'>Old Password</label>
                                            <input type="text" className="form-control input-color" name="oldpassword" id="oldpassword" placeholder="Enter your oldPassword."
                                                {...register("oldPassword",
                                                    {
                                                        required: "Old Password Is Required",
                                                    })} />
                                            <p className='text-danger'>{errors.oldPassword?.message}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-outline">
                                            <label htmlFor="newpassword" className='profiless'>New Password</label>
                                            <input type="text" className="form-control input-color" name="newpassword" id="newpassword" placeholder="Enter your new password."
                                                {...register("newPassword",
                                                    {
                                                        required: "New Password Is Required",
                                                    })} />
                                            <p className='text-danger'>{errors.newPassword?.message}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-outline">
                                            <label htmlFor="confirmPassword" className='profiless'>Conform Password</label>
                                            <input type="password" className="form-control input-color" name="confirmPassword" id="confirmPassword"
                                                {...register("confirmPassword", {
                                                    required: "Confirm Password is required",
                                                    validate: (value) => value === watch("newPassword") || "Passwords do not match"
                                                })}
                                            />
                                            <p className='text-danger'>{errors.confirmPassword?.message}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {
                                apiResponse ? <h5 className='text-success'>Successfuly user create</h5> : null
                            }
                            {
                                apiError == "" ? "" : <p className='text-danger'>{apiError}</p>
                            }
                            <div className="mt-4 pt-2">
                                <input className="btn btn-primary btn-lg" style={{ width: "100%" }} type="submit" value="SUBMIT" />
                            </div>
                        </form>
                    </div>
                    {/* <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <h2>Contact</h2>
                        <p>Please check our more design @ <a target="_blank" href="https://codepen.io/Gaurav-Rana-the-reactor">Codepen</a></p>
                    </div> */}
                </div>
            </div>
        </Box>
    )
}

export default Profile
