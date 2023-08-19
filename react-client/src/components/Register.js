import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate(); 
  const [hasError, setError] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    /* 
      The request is being proxied to :5000, and the access control headers are set automatically,
      otherwise we have to manually pass the server URL in each request and enable CORS on that server
      for the client.
    */
    axios.post("/register", loginData).then(res => {
      setError(false);
      navigate("/login");
    }).catch(function(err){
      console.log(err);
      setError(true);
    })
  }

  function handleChange(e){
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
      <div className={styles.loginFormContainer}>
      <h1>Create an account</h1>
      {hasError ? <p className={styles.error}>The email is already in use</p> : <p></p>}
      <form onSubmit={handleSubmit}>
        <input 
          className={styles.username}
          type='text'
          name='username'
          required
          placeholder='Enter your name'
          value={loginData.username}
          onChange={handleChange}
        />
        <input 
          className={styles.email}
          type='email'
          name='email'
          required
          placeholder='Enter your email'
          value={loginData.email}
          onChange={handleChange}
        />
        <input 
          className={styles.password}
          type='password'
          name='password'
          required
          placeholder='Enter your password'
          value={loginData.password}
          onChange={handleChange}
        />
        <button type='submit'>Create Account</button>
      </form>
      <p>Already have an account?<Link to="/login">Sign In</Link></p>
      </div>
  )
}

export default Register