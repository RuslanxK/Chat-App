import { createContext, useCallback, useState, useEffect } from "react";
import { PostRequest, baseUrl } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const navigate = useNavigate()

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null)
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setLoginLoading] = useState(false);


  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);


  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);



  const registerUser = useCallback(async (e) => {

    e.preventDefault()

    setRegisterLoading(true)
    setRegisterError(null)
    const data = await PostRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );

    setRegisterLoading(false)

    if (data.error) {
      return setRegisterError(data);
    }

    localStorage.setItem("User", JSON.stringify(data))
    setUser(data)

    navigate('/')
   
     
  }, [registerInfo, navigate]);




  const logoutUser = useCallback(() => {

      localStorage.removeItem("User")
      setUser(null)
      navigate("/login")
      
  }, [navigate])



  const loginUser = useCallback( async (e) => {

    e.preventDefault()

    setLoginLoading(true)
    setLoginError(null)

    const data = await PostRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    );

    setLoginLoading(false)

    if (data.error) {
      return setLoginError(data);
    }

    localStorage.setItem("User", JSON.stringify(data))
    setUser(data)

    navigate('/')
  
       
  }, [loginInfo, navigate])



  useEffect(() => {
    
     const user = localStorage.getItem("User")
     setUser(JSON.parse(user))

  }, []);


  return (
    <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, isLoginLoading,  logoutUser, updateLoginInfo, loginUser, loginInfo, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};
