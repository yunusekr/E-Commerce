import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { set } from "react-hook-form";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((store) => store.currentUser);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUser(event.target.email.value, event.target.password.value));
  };

  useEffect(() => {
    if (currentUser) {
      history.push("/adpro");
    } else {
      setError(true);
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (currentUser === null) {
      setError(false);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="submit">Giriş</button>

      {error && <p style={{ color: "red" }}>Düzgün gir</p>}
    </form>
  );
}

export default LoginForm;
