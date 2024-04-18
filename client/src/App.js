import { Container } from "@mui/material";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/custom/NavBar";
import { Fragment } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContex";
import { ChatContextProvider } from "./context/ChatContext";

const App = () => {


  const { user }  = useContext(AuthContext)


  return (
    <Fragment>
      <ChatContextProvider user={user}>
      <NavBar />
      <Container
        disableGutters
        maxWidth
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "#E4E5E9"
          
        }}
      >
        <Routes>
          <Route path="/login" element={ user ? <Chat /> : <Login />} />
          <Route path="/register" element={ user ? <Chat /> : <Register />} />
          <Route path="/" element={ user ? <Chat /> : <Login /> } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      </ChatContextProvider>
    </Fragment>
  );
};

export default App;
