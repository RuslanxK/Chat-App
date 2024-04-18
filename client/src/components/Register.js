import CustomBox from "./custom/CustomBox";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  Stack,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <CustomBox>
      <Typography variant="h4" fontWeight="bold" component="h1">
        Register to chat
      </Typography>
      <FormControl
        sx={{ display: "flex", width: "100%" }}
      >
        <TextField
          type="text"
          label="name"
          required
          inputProps={{ maxLength: 7 }}
          name="name"
          sx={{ marginTop: "25px" }}
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, name: e.target.value })
          }
        />
        <TextField
          type="email"
          label="email"
          required
          name="email"
          sx={{ marginTop: "15px" }}
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, email: e.target.value })
          }
        />

        <TextField
          type="password"
          label="password"
          required
          name="password"
          sx={{ marginTop: "15px" }}
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, password: e.target.value })
          }
        />
        <Button
          onClick={registerUser}
          variant="contained"
          sx={{ padding: "15px", marginTop: "15px" }}
        >
          {isRegisterLoading ? "Creating your account" : "Register"}
        </Button>
      </FormControl>

      <Stack width="100%" mt={2} mb={2}>
        <Link to="/login"> Already has an account? Login here</Link>
      </Stack>

      {registerError?.error && (

        <Alert severity="error" sx={{width: "100%"}}>
          <Typography variant="span" component="span">
            {registerError?.message}
          </Typography>
        </Alert>

      )}
    </CustomBox>
  );
};

export default Register;
