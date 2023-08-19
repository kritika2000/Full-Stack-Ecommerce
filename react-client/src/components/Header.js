import React from 'react'
import styles from './Header.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Header({ currentLoggedInUserDetails, cartItemsCount }) {
  const { username } = currentLoggedInUserDetails;
  const navigate = useNavigate();

  function NavigateToLogin(){
    if(!username)
      navigate("/login");
    else{
      localStorage.removeItem("jwt");
      navigate("/");
      window.location.reload();
    }
  }

  function NavigateToCart(){
    if(!username)
      navigate("/login");
    else{
      navigate("/cart");
      window.location.reload();
    }
  }

  return (
    <div className={styles.headerContainer}>
        <img className={styles.logo} src='../images/amazon-logo-pack/amazon-logo.svg'/>
        <p className={styles.username}>{username && `Hi ${username.charAt(0).toUpperCase() + username.slice(1)}`}</p>
        <button onClick={NavigateToLogin} className={styles.signInOut}>{username ? "Sign Out" : "Sign In"}</button>
        {username && <button className={styles.myOrder} onClick={() => {
          navigate("/myorders");
          window.location.reload();
        }}>My Orders</button>}
        <div className={styles.cartContainer}>
            <FaShoppingCart className={styles.cartIcon} size={35} onClick={NavigateToCart}/>
          {cartItemsCount > 0 && <div className={styles.noOfItems}>{cartItemsCount}</div>}
        </div>
    </div>
  )
}

export default Header