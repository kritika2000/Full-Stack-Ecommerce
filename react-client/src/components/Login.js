import React from 'react'
import styles from './Login.module.css'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [hasError, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    /* 
      The request is being proxied to :5000, and the access control headers are set automatically,
      otherwise we have to manually pass the server URL in each request and enable CORS on that server
      for the client.
    */
    axios.post("/login", loginData).then(res => {
      const { accessToken } = res.data;
      setError(false);
      localStorage.setItem('jwt', accessToken);
      navigate("/");
      window.location.reload();
    }).catch(function(err){
      console.log(err);
      setError(true);
    })
    ;
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
      <h1>Sign in to your account</h1>
      {hasError ? <p className={styles.error}>Invaild Email and Password</p> : <p></p>}
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Sign In</button>
      </form>
      <p>Don't have an account?<Link to="/register">Sign Up</Link></p>
      </div>
  )
}

export default Login