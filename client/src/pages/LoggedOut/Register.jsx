import { useEffect, useState } from "react";
import { userRegister } from "../../axios/requests";
import { useNavigate } from "react-router-dom";
// Components
import Form from "../../components/Forms/Form";

const Register = ({ setUser }) => {
  // *** Booleans *** //
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (email, password) => {
    setIsLoading(true);
    const res = await userRegister(email, password);
    try {
      if (res && !res.data.error) {
        // console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        navigate("/register-profile");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form title="Register" isLoading={isLoading} isRegister={true} submitFunction={registerUser} />
    </>
  );
};

export default Register;
