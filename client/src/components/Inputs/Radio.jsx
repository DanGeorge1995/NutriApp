import React, { useState } from "react";
import styled from "styled-components";
//  Validation
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SubmitProfileSchema } from "../../Validations/SubmitProfileValidation";

const RadioWrapper = styled.div`
  .radio_option {
    label {
      margin-right: 1em;
      &:before {
        content: "";
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        margin-right: 0.5em;
        border-radius: 100%;
        vertical-align: -3px;
        border: 2px solid ${({ theme }) => theme.radioBorder};
        padding: 0.15em;
        background-color: transparent;
        background-clip: content-box;
        transition: all 0.2s ease;
      }
    }
    input {
      &:hover + label:before {
        border-color: ${({ theme }) => theme.radioBorderHover};
      }
      &:checked + label:before {
        background-color: ${({ theme }) => theme.radioBackgroundCheck};
        border-color: ${({ theme }) => theme.radioBorderChecked};
      }
    }
  }
`;

const Radio = ({ setValue }) => {
  const selectValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <RadioWrapper>
      <div className="input_field radio_option">
        <input
          type="radio"
          name="radiogroup1"
          id="rd1"
          value="male"
          onClick={selectValue}
        />
        <label htmlFor="rd1">Male</label>
        <input
          type="radio"
          name="radiogroup1"
          id="rd2"
          value="female"
          onClick={selectValue}
        />
        <label htmlFor="rd2">Female</label>
      </div>
    </RadioWrapper>
  );
};

export default Radio;
