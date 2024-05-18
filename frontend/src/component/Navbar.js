import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import isAuth, { userType } from "../lib/isAuth";
import { Home, AddCircle, Assignment, Group, AccountCircle, ExitToApp } from "@material-ui/icons";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Welcome from "./Welcome";

const theme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/welcome" style={{ textDecoration: 'none', color: 'inherit' }} className={classes.title}>
                Job Portal
              </Link>
            </Typography>
            {isSmallScreen ? (
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {isAuth() ? (
                  userType() === "recruiter" ? (
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/home")}
                      >
                        Home
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/addjob")}
                      >
                        Add Jobs
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/myjobs")}
                      >
                        My Jobs
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/employees")}
                      >
                        Employees
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/profile")}
                      >
                        Profile
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/logout")}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/home")}
                      >
                        Home
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/applications")}
                      >
                        Applications
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/profile")}
                      >
                        Profile
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleClick("/logout")}
                      >
                        Logout
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/signup")}
                    >
                      Signup
                    </Button>
                  </>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            onClick={toggleDrawer}
          >
            <List>
              {isAuth() ? (
                userType() === "recruiter" ? (
                  <>
                    <ListItem button onClick={() => handleClick("/home")}>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/addjob")}>
                      <ListItemIcon>
                        <AddCircle />
                      </ListItemIcon>
                      <ListItemText primary="Add Jobs" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/myjobs")}>
                      <ListItemIcon>
                        <Assignment />
                      </ListItemIcon>
                      <ListItemText primary="My Jobs" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/employees")}>
                      <ListItemIcon>
                        <Group />
                      </ListItemIcon>
                      <ListItemText primary="Employees" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/profile")}>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/logout")}>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button onClick={() => handleClick("/home")}>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => handleClick("/applications")}
                    >
                      <ListItemIcon>
                        <Assignment />
                      </ListItemIcon>
                      <ListItemText primary="Applications" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/profile")}>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => handleClick("/logout")}>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                )
              ) : (
                <>
                  <ListItem button onClick={() => handleClick("/login")}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button onClick={() => handleClick("/signup")}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItem>
                </>
              )}
            </List>
          </Drawer>
        </Hidden>
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
