import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeftCircle } from 'react-icons/bs';
const STRIPE_PUBLISHED_KEY = 'pk_test_51NfxtdSDPLHE7lakNL9lnqqDZ9ZdWHaoGxAhe3zhlppvjpnrAAZDfdZVLrG1szyPwcPHET0iynGHTzYHkyEzXoE300MIZ1HB63';

function CartItem({ cartItem, removeFromCart, changeQuantity }){
  const { id, image, price, title, quantity } = cartItem;
  const [state, setState] = useState(quantity);
  const navigate = useNavigate();

  function removeItemFromCart(e){
    e.stopPropagation();
    const accessToken = localStorage.getItem('jwt');
    if(!accessToken){
      navigate("/login", {replace: true});
      return;
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
     }
    }
    axios.delete(`http://localhost:5000/api/cart/${id}`, config)
    .then(res => { 
      console.log(res);
      removeFromCart(cartItem);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
    <div className={styles.cartItemContainer}>
      <div className={styles.productContainer}>
      <img className={styles.cartImage} src={image}/>
      <div className={styles.cartInfoContainer}>
        <p className={styles.cartTitle} onClick={() => navigate(`/product/${id}`)}>{title}</p>
        <p className={styles.removeItem} onClick={removeItemFromCart}>Remove</p>
      </div>
      </div>
      <p className={styles.cartPrice}>Rs {price}</p>
      <div className={styles.quantityContainer}>
        <input 
          type='number' 
          min={1}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            changeQuantity(cartItem, e.target.value)
          }}
        />
      </div>
      <p className={styles.totalPrice}>Rs {quantity * price}</p>
    </div>
    <hr className={styles.hr}/>
    </>
  )
}

function Cart({ cartItems, removeFromCart, changeQuantity, currentLoggedInUserDetails, removeItemsFromCart }) {
  const [disabled, setDisabled] = useState(false);
  let totalPrice = 0;
  cartItems.map((cart) => totalPrice += cart.quantity * cart.price);
  const navigate = useNavigate();

  async function placeOrder(){
    setDisabled(true);
    const stripe = await loadStripe(STRIPE_PUBLISHED_KEY); 
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
    axios.post("http://localhost:5000/api/create-stripe-session", 
    { currentLoggedInUserDetails, cartItems, totalPrice },
    config
    ).then(res => {
      stripe.redirectToCheckout({
        sessionId: res.data.sessionId
      })
      setDisabled(false);
      })
      .catch(err => {
        console.log(err);
    });
  }

  function clearCart(){
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
  }

  return (
    <div className={styles.container}>
    <div className={styles.cartContainer}>
      <p className={styles.heading}>My Cart</p>
      <div className={styles.headerContainer}>
        <p>PRODUCT</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p>TOTAL</p>
      </div>
      <hr className={styles.hr}/>
      {(cartItems.length === 0) ? <div>
        <p>No items in cart</p>
        <button className={styles.goToHome} onClick={() => navigate("/", {replace: true})}>Go To Home</button>
        </div> : cartItems.map((cartItem) => <CartItem 
        cartItem={cartItem} 
        removeFromCart={removeFromCart}
        changeQuantity={changeQuantity}
      />)}
    </div>
    {cartItems.length > 0 && <div className={styles.bottomContainer}>
    <button className={styles.clearCart} onClick={clearCart}>Clear Cart</button>
    <div className={styles.checkoutContainer}>
      <div className={styles.totalContainer}>
        <div>Subtotal</div>
        <div>Rs {totalPrice}</div>
      </div>
      <button className={styles.placeOrder} onClick={placeOrder} disabled={disabled}>Place Order</button>
      <div className={styles.backButtonContainer}  onClick={() => navigate("/", { replace: true })}>
        <BsArrowLeftCircle size={18} style={{color: "gray"}}/>
        <button>Continue Shopping</button>
      </div>
    </div>
    </div>}
    </div>
  )
}

export default Cart