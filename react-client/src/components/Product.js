import React, { useState } from 'react'
import styles from './Product.module.css';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Product(props) {
  const [hasItemAdded, setItemAdded] = useState(false);
  const { id, image, price, rating, title } = props.productDetails;
  const { cartItems } = props;
  const foundItem = cartItems?.find(item => item.id === id);
  const navigate = useNavigate();
  
  function getRatingStars(rating){
    return [1, 2, 3, 4, 5].map(r => {
        if(!rating)
            return <BsStar/>
        if(rating >= r){
            return <BsStarFill/>
        }
        rating = 0;
        return <BsStarHalf/>
    })
  }

  function handleNavigation(){
    navigate(`product/${id}`);
  }

  function removeItemFromCart(e){
    setItemAdded(true);
    e.stopPropagation();
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
    console.log(config);
      const cartItem = {...props.productDetails, quantity: 1};
      axios.delete(`http://localhost:5000/api/cart/${id}`, config)
      .then(res => { 
         console.log(res);
         props.removeFromCart(cartItem);
         setItemAdded(false);
        }).catch(err => {
          console.log(err);
          setItemAdded(false);
      });
  }

  function addItemToCart(e){
    setItemAdded(true);
    e.stopPropagation();
    const accessToken = localStorage.getItem('jwt');
    if(!accessToken){
      navigate("/login");
      return;
    }
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
      const cartItem = {...props.productDetails, quantity: 1};
        axios.post("http://localhost:5000/api/cart", cartItem, config)
        .then(res => { 
          console.log(res);
          props.addToCart(cartItem);
          setItemAdded(false);
          }).catch(err => {
            console.log(err);
            setItemAdded(false);
        });
    }

  return (
    <div className={styles.productContainer} onClick={handleNavigation}>
        <img className={styles.productImage} src={image}/>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.productPrice}>Rs {price}</p>
        <div className={styles.ratingContainer}>
            {getRatingStars(rating.rate)}
        </div>
        <button className={!foundItem ? styles.addToCart : styles.removeFromCart} 
        disabled={hasItemAdded}
        onClick={!foundItem ? addItemToCart : removeItemFromCart}>
          {!foundItem ? "Add to Cart" : "Remove from Cart"}</button>
    </div>
  )
}

export default Product