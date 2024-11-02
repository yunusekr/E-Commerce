import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/actions";

function Register() {
  const { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    dispatch(saveUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input type="text" {...register("username")} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
