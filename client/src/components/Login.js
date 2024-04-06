import CustomBox from "./custom/CustomBox";
import { TextField, Button, Typography, FormControl, Stack, Alert} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

const Login = () => {

  const {updateLoginInfo, loginInfo, loginUser, isLoginLoading, loginError} = useContext(AuthContext);
    

  return (
    <CustomBox>
      <Typography variant="h4" fontWeight="bold" component="h1">
        Login to chat
      </Typography>
      
      <FormControl sx={{display: "flex", width: "100%"}}>

        <TextField
          type="email"
          label="email"
          required
          name="email"
          sx={{marginTop: "25px"}}
          onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
        />
        <TextField
          type="password"
          label="password"
          required
          name="password"
          sx={{marginTop: "15px"}}
          onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
        
        />
       
        <Button variant="contained" sx={{padding: "15px", marginTop: "15px"}} onClick={loginUser}>
        { isLoginLoading ? "logging..." : "Login"}
        </Button>
        
        </FormControl>

        <Stack width="100%" mt={2} mb={2}>
        <Link to="/register">Create account here</Link>
        </Stack>

        {loginError?.error && (

<Alert severity="error" sx={{width: "100%"}}>
  <Typography variant="span" component="span">
    {loginError?.message}
  </Typography>
</Alert>

)}

    </CustomBox>
  );
};

export default Login;
