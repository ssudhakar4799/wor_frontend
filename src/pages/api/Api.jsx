import { logDOM } from "@testing-library/react";
import axios from "axios";

const BASE_URL = "https://workplace-akcw.onrender.com/LightHouse";

// Regsiter
export const regUser = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/createUserProflie`, Payload, {
      headers: {
        // Accept: "application/json",
        'content-type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// Login
export const loginUser = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/loginDetails`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// Login
export const getAllUser = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/findAllUser`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// punchIn
export const punchIn = async (token,Payload) => {
  const response = await axios
    .post(`${BASE_URL}/checkin?token=${token}`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// punchOut
export const punchOut = async (token,Payload) => {
  const response = await axios
    .post(`${BASE_URL}/checkOut?token=${token}`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// findone checkin details

export const todayOnePunchinDetails = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/findOneCheckin`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// findAll in one user checkin details

export const OneUserAllPunchinDetails = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/findOneUserAllCheckin`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// findAll in one user checkin details

export const pendingPunchinDetails = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/punchinApproved`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};

// user attendance approve or reject functions

export const approveOrReject = async (Payload) => {
  const response = await axios
    .post(`${BASE_URL}/approveRejectPunchin`, Payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => ({ error: error }));
  return response;
};