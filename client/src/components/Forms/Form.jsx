import React, { useState } from "react";
import styled from "styled-components";
import SubmitButton from "../Buttons/SubmitButton";
// import TextInput from "../Inputs/TextInput";
// import ToggleTheme from "../Togglers/ToggleTheme";
import LoadingSpinner from "../Spinners/LoadingSpinner";
import { Col, Row } from "react-bootstrap";

// Validations
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../Validations/RegisterValidation";
import { LoginSchema } from "../../Validations/LoginValidation";
import { SubmitProfileSchema } from "../../Validations/SubmitProfileValidation";

import { useForm } from "react-hook-form";

const FormWrapper = styled.div`
  position: relative;
  .form_wrapper {
    background: #fff;
    width: 25rem;
    max-width: 100%;
    box-sizing: border-box;
    padding: 1.5625rem;
    margin: 8% auto 0;
    position: relative;
    z-index: 1;
    border-top: 5px solid $yellow;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    -webkit-transition: none;
    transition: none;
    -webkit-animation: expand 0.8s 0.6s ease-out forwards;
    animation: expand 0.8s 0.6s ease-out forwards;
    opacity: 0;
    h2 {
      font-size: 1.5em;
      line-height: 1.5em;
      margin: 0;
    }
    .title_container {
      text-align: center;
      padding-bottom: 15px;
    }
    h3 {
      font-size: 1.1em;
      font-weight: normal;
      line-height: 1.5em;
      margin: 0;
    }
    label {
      font-size: 0.75rem;
    }
    .row {
      margin: 0.625rem -0.9375rem;
      > div {
        padding: 0 0.9375rem;
        box-sizing: border-box;
      }
    }
    .col_half {
      width: 50%;
      float: left;
    }
    .input_field {
      position: relative;
      margin-bottom: 1.25rem;
      -webkit-animation: bounce 0.6s ease-out;
      animation: bounce 0.6s ease-out;
    }

    input {
      &[type="text"],
      &[type="email"],
      &[type="password"],
      &[type="date"] {
        width: 100%;
        padding: 0.5rem 0.625rem 0.5625rem 2.1875rem;
        height: 2.1875rem;
        border: 1px solid ${({ theme }) => theme.inputBorder};
        background-color: 1px solid ${({ theme }) => theme.inputBackground};
        box-sizing: border-box;
        outline: none;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }
      &[type="text"]:hover,
      &[type="password"]:hover {
        background: ${({ theme }) => theme.inputBackgroundHover};
      }
      &[type="text"]:focus,
      &[type="password"]:focus {
        -webkit-box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
        -moz-box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
        box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
        border: 1px solid ${({ theme }) => theme.inputFocusShadow};
        background: ${({ theme }) => theme.inputBackgroundFocus};
      }

      &[type="checkbox"],
      &[type="radio"] {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    }
  }

  select {
    & {
      width: 100%;
      padding: 0.5rem 0.625rem 0.5rem 2.1875rem;
      height: 2.5875rem;
      /* height: 0.7875rem; */
      border: 1px solid ${({ theme }) => theme.inputBorder};
      background-color: 1px solid ${({ theme }) => theme.inputBackground};
      box-sizing: border-box;
      outline: none;
      -webkit-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      background: ${({ theme }) => theme.inputBackgroundHover};
    }

    &:focus {
      -webkit-box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
      -moz-box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
      box-shadow: 0 0 2px 1px ${({ theme }) => theme.inputFocusShadow};
      border: 1px solid ${({ theme }) => theme.inputFocusShadow};
      background: ${({ theme }) => theme.inputBackgroundFocus};
    }

    /* &[type="checkbox"],
    &[type="radio"] {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    } */
  }

  .credit {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0.9375rem;
    color: $yellow;
    a {
      color: darken($yellow, 7%);
    }
  }
  @-webkit-keyframes check {
    0% {
      height: 0;
      width: 0;
    }
    25% {
      height: 0;
      width: 7px;
    }
    50% {
      height: 1.25rem;
      width: 0.4375rem;
    }
  }

  @keyframes check {
    0% {
      height: 0;
      width: 0;
    }
    25% {
      height: 0;
      width: 7px;
    }
    50% {
      height: 1.25rem;
      width: 0.4375rem;
    }
  }

  @-webkit-keyframes expand {
    0% {
      -webkit-transform: scale3d(1, 0, 1);
      opacity: 0;
    }
    25% {
      -webkit-transform: scale3d(1, 1.2, 1);
    }
    50% {
      -webkit-transform: scale3d(1, 0.85, 1);
    }
    75% {
      -webkit-transform: scale3d(1, 1.05, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      opacity: 1;
    }
  }

  @keyframes expand {
    0% {
      -webkit-transform: scale3d(1, 0, 1);
      transform: scale3d(1, 0, 1);
      opacity: 0;
    }
    25% {
      -webkit-transform: scale3d(1, 1.2, 1);
      transform: scale3d(1, 1.2, 1);
    }
    50% {
      -webkit-transform: scale3d(1, 0.85, 1);
      transform: scale3d(1, 0.85, 1);
    }
    75% {
      -webkit-transform: scale3d(1, 1.05, 1);
      transform: scale3d(1, 1.05, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }
  }

  @-webkit-keyframes bounce {
    0% {
      -webkit-transform: translate3d(0, -1.5625rem, 0);
      opacity: 0;
    }
    25% {
      -webkit-transform: translate3d(0, 0.625rem, 0);
    }
    50% {
      -webkit-transform: translate3d(0, -0.375rem, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0.125rem, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes bounce {
    0% {
      -webkit-transform: translate3d(0, -1.5625rem, 0);
      transform: translate3d(0, -1.5625rem, 0);
      opacity: 0;
    }
    25% {
      -webkit-transform: translate3d(0, 0.625rem, 0);
      transform: translate3d(0, 0.625rem, 0);
    }
    50% {
      -webkit-transform: translate3d(0, -0.375rem, 0);
      transform: translate3d(0, -0.375rem, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0.125rem, 0);
      transform: translate3d(0, 0.125rem, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @media (max-width: 37.5rem) {
    .form_wrapper {
      .col_half {
        width: 100%;
        float: none;
      }
    }
    .bottom_row {
      .col_half {
        width: 50%;
        float: left;
      }
    }
    .form_container {
      .row {
        .col_half.last {
          border-left: none;
        }
      }
    }
    .remember_me {
      padding-bottom: 1.25rem;
    }
  }
`;

const Form = ({ title, isLoading, isRegister, isSubmitProfile, submitFunction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? RegisterSchema : isSubmitProfile ? SubmitProfileSchema : LoginSchema),
  });

  const submitForm = (data) => {
    const { firstName, lastName, birthDate, gender, weight, height, activity } = data;
    if (isSubmitProfile) {
      submitFunction(firstName, lastName, birthDate, gender, weight, height, activity);
    } else {
      const { email, password } = data;
      submitFunction(email, password);
    }
    // if (!radioValue) setRadioError(true);
    // if (radioError) {
    // console.log(data);
    //   console.log(radioValue);
    // }
  };

  return (
    <FormWrapper>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>{title}</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={handleSubmit(submitForm)}>
                {!isSubmitProfile ? (
                  <>
                    <div className="input_field">
                      <input type="text" placeholder="Email" {...register("email")} />
                    </div>
                    <p>{errors.email?.message}</p>

                    <div className="input_field">
                      <input type="password" placeholder="Password" {...register("password")} />
                    </div>
                    <p>{errors.password?.message}</p>
                  </>
                ) : (
                  <>
                    <div className="input_field">
                      <input type="text" placeholder="First Name" {...register("firstName")} />
                    </div>
                    <p>{errors.firstName?.message}</p>

                    <div className="input_field">
                      <input type="text" placeholder="Last Name" {...register("lastName")} />
                    </div>
                    <p>{errors.lastName?.message}</p>

                    <div className="input_field">
                      <input type="date" placeholder="Birth date" {...register("birthDate")} />
                    </div>
                    <p>{errors.birthDate?.message}</p>

                    <div className="input_field">
                      <select {...register("gender")}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <p>{errors.gender?.message}</p>

                    <div className="input_field">
                      <input type="text" placeholder="Weight (Kg)" {...register("weight")} />
                    </div>
                    <p>{errors.weight?.message}</p>

                    <div className="input_field">
                      <input type="text" placeholder="Height (Cm)" {...register("height")} />
                    </div>
                    <p>{errors.height?.message}</p>

                    <div className="input_field">
                      <select {...register("activity")}>
                        <option value="sedentary">Sedentary</option>
                        <option value="low-active">Low active</option>
                        <option value="medium-active">Medium active</option>
                        <option value="very-active">Very active</option>
                      </select>
                    </div>
                    <p>{errors.activity?.message}</p>
                  </>
                )}

                {isRegister && (
                  <>
                    <div className="input_field">
                      <input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
                    </div>
                    <p>{errors.cofirmPassword?.message}</p>
                  </>
                )}
                {isLoading ? (
                  <Row className="g-0 justify-content-center">
                    <Col xs="auto">
                      <LoadingSpinner />
                    </Col>
                  </Row>
                ) : (
                  <SubmitButton title="SUBMIT" />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Form;
