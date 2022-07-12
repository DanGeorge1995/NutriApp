import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../Validations/RegisterValidation";
import { useForm } from "react-hook-form";

const TextInput = ({ type, placeholder, name }) => {
  const { register } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  return (
    <div className="input_field">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(`${name}`)}
      />
    </div>
  );
};

export default TextInput;
