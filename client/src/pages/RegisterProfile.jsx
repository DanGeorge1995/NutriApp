import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userUpdateRegister, userCreateProfile } from "../axios/requests";
import Form from "../components/Forms/Form";

const RegisterProfile = ({ user, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitProfile = async (
    first_name,
    last_name,
    birth_date,
    gender,
    weight,
    height,
    activity
  ) => {
    setIsLoading(true);
    const res = await userCreateProfile(
      user.id,
      first_name,
      last_name,
      birth_date,
      gender,
      weight,
      height,
      activity
    );
    try {
      if (res && !res.data.error) {
        const res = await userUpdateRegister(user.id, true);
        try {
          if (res && !res.data.error) {
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data.user);
            navigate("/dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user.is_completed) navigate("/dashboard");
  }, [user.is_completed, navigate]);

  return (
    <div>
      <Form
        title="Submit your profile"
        isLoading={isLoading}
        isSubmitProfile={true}
        submitFunction={submitProfile}
      />
    </div>
  );
};

export default RegisterProfile;
