// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

import { Link, useLocation, useParams } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import { useSelector } from "react-redux";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const { pathname } = useLocation();
  let curntChangeUrl = pathname.split("/")
  console.log(curntChangeUrl[1]);
  let currentUrl = curntChangeUrl[1] == '' ? selected : curntChangeUrl[1];
  console.log(currentUrl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={currentUrl === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  let { isAuthentification, usertype, profile, userName, rptManager } = useSelector((state) => state.auth);
  console.log(usertype);
  console.log(isAuthentification);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {usertype}
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={`http://localhost:8000/${profile}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userName}
                </Typography>
                {/* <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {role}
                </Typography> */}
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            {usertype === 'employee' && (
              <>
                <Item
                  title="Dashboard"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {rptManager &&
                  (
                    <>
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 20px 5px 20px" }}
                      >
                        Reporting Status
                      </Typography>
                      <Item
                        title="Punchin Approved"
                        to="/punchinApproved"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </>
                  )

                }
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 20px 5px 20px" }}
                >
                  Users
                </Typography>
                <Item
                  title="Employee List"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Timesheet"
                  to="/timesheet"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

              </>)}
            {usertype === 'admin' && (
              <>
                <Item
                  title="AdminDashboard"
                  to="/AdminDashboard"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 20px 5px 20px" }}
                >
                  Data
                </Typography>
                <Item
                  title="Manage Team"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Services"
                  to="/service"
                  icon={<MapOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 20px 5px 20px" }}
                >
                  Users
                </Typography>
                <Item
                  title="Timesheet"
                  to="/timesheet"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>)}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;