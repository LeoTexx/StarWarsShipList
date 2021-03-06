import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle } from "../../firebase";
import styles from "../../styles/pages/Auth.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <h1>Sign In</h1>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: starwars@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p>or</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Don't have an account?</p>
        <Link
          style={{
            marginTop: 12,
            fontWeight: "bold",
            border: "1px solid #fefefe",
            padding: 4,
            borderRadius: 8,
          }}
          to="signUp"
        >
          Sign up here
        </Link>{" "}
        <Link
          style={{
            marginTop: 12,
            fontWeight: "bold",
            border: "1px solid #fefefe",
            padding: 4,
            borderRadius: 8,
          }}
          to="passwordReset"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
