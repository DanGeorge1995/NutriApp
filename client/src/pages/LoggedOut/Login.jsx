import React, { useEffect, useState } from "react";
import { userLogin } from "../../axios/requests";
import useAuth from "../../custom-hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../../components/Forms/Form";

const Login = ({ setUser, user }) => {
  // const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  // console.log(location);

  // const handleSubmit = () => {
  //   setUser("Dange");
  //   // setAuth(true);
  //   navigate("/dashboard");
  //   // navigate(from, { replace: true });
  // };

  const loginUser = async (email, password) => {
    setIsLoading(true);
    const res = await userLogin(email, password);
    try {
      if (res && !res.data.error) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        // if (res.data.user.is_completed) {
        // navigate("/dashboard");
        // } else {
        navigate("/register-profile");
        // }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (user) navigate("/dashboard");
  // }, [user, navigate]);

  return (
    <Form
      // theme={theme}
      // toggleTheme={toggleTheme}
      title="Login"
      isLoading={isLoading}
      submitFunction={loginUser}
    />
  );
};

export default Login;
