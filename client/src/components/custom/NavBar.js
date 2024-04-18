import { Container, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import Notifications from "../chat/Notifications";

const NavBar = () => {
  const navigate = useNavigate();

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Container
      maxWidth
      sx={{
        background: "white",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;"
      }}
    >
      <Typography component="h1" variant="h4" color="black">
        <img src="./logo.png" alt="logo" width="35px" height="35px" />
      </Typography>
      {user ? (
        <Typography component="span" variant="span" color="black">
          Logged in as {user?.name}
        </Typography>
      ) : null}
      <Stack display="flex" direction="row">
        {user ? <Notifications /> : null}
        {user ? (
          <Button
            sx={{ marginRight: "8px", color: "black" }}
            variant="text"
            onClick={logoutUser}
          >
            Logout
          </Button>
        ) : (
          <Fragment>
            <Button
              sx={{ marginRight: "8px", color: "white" }}
              variant="text"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="text"
              sx={{ color: "white" }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Fragment>
        )}
      </Stack>
    </Container>
  );
};

export default NavBar;
