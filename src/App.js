import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";
import "./App.css"

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Services from "./pages/services/Services";
import Login from "./pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./pages/privateRoutes/PrivateRoute";
import TimeSheet from "./pages/timesheet/TimeSheet";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import PunchinApproved from "./pages/rptMPunchApproved/PunchinApproved";
import { useEffect, useState } from "react";
import { logout } from "./pages/Store/Redux/auth/action";
import { jwtDecode as decode } from 'jwt-decode';


const App = () => {
  const [theme, colorMode] = useMode();
  const { isAuthentification, usertype, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const [isTokenExpired, setTokenExpired] = useState(false);

  const handleTokenExpiration = (token) => {
    try {
      const decodedToken = decode(token);

      const expired = decodedToken.exp < Date.now() / 1000;
      // setTokenExpired(expired);

      if (expired) {

        dispatch(logout(false))
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
  };

  // Simulating token check on component mount
  useEffect(() => {
    handleTokenExpiration(token);
  }, [token, dispatch]);


  return (
    <BrowserRouter>
      {
        isAuthentification ? (
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MyProSidebarProvider>
                <div style={{ width: "100%" }} className="bg-image">
                  <main>
                    <Topbar />
                    <Routes>
                      <Route path="/" element={<Navigate to={usertype === 'admin' ? '/admin' : '/employee'} />} />
                      <Route path="/employee" element={<PrivateRoute element={Dashboard} roles={['employee']} />} />
                      <Route path="/timesheet" element={<PrivateRoute element={TimeSheet} roles={['employee', 'admin']} />} />
                      <Route path="/team" element={<PrivateRoute element={Team} roles={['employee', 'admin']} />} />
                      <Route path="/punchinApproved" element={<PrivateRoute element={PunchinApproved} roles={['employee', 'admin']} />} />
                      <Route path="/admin" element={<PrivateRoute element={AdminDashboard} roles={['admin']} />} />
                      <Route path="/service" element={<PrivateRoute element={Services} roles={['admin']} />} />

                      {/* Redirect to Home if no match */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </MyProSidebarProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        )
      }
    </BrowserRouter>
  );
};

export default App;
