import React, { useEffect } from 'react'
import styles from './Success.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Success({removeItemsFromCart}) {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('jwt');
    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
    }
  }
  axios.delete("http://localhost:5000/api/cart", config)
  .then(res => {
    console.log(res);
    removeItemsFromCart();
  })
  .catch(err => console.log(err))
  }, [])
  return (
    <div className={styles.successContainer}>
        <AiFillCheckCircle color='lightgreen' size={40}/>
        <h1>Order Placed Successfully</h1>
        <div className={styles.backButtonContainer}  onClick={() => navigate("/", { replace: true })}>
        <BsArrowLeftCircle size={18} style={{color: "gray"}}/>
        <button>Continue Shopping</button>
      </div>
    </div>
  )
}

export default Success