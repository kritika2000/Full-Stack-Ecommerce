import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import axios from 'axios';

function capitalizeFirstLetterOfWord(str){
  if(str === 'mensclothing')
    return "Men's Clothing";
  if(str === 'womensclothing')
    return "Women's Clothing";
  let words = str.trim().split(' ');
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
}

function ProductDetails({ allProducts, addToCart, removeFromCart, cartItems }) {
  const { id } = useParams();
  const product = allProducts.find((product) => product.id === Number(id));
  console.log(product);
  const foundItem = cartItems?.find(item => item.id === Number(id));
  const navigate = useNavigate();

  function removeItemFromCart(e){
    e.stopPropagation();
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
      const cartItem = {...product, quantity: 1};
      axios.delete(`http://localhost:5000/api/cart/${id}`, config)
      .then(res => { 
         console.log(res);
         removeFromCart(cartItem);
        }).catch(err => {
          console.log(err);
      });
  }

  function addItemToCart(e){
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
      const cartItem = {...product, quantity: 1};
        axios.post("http://localhost:5000/api/cart", cartItem, config)
        .then(res => { 
          console.log(res);
          addToCart(cartItem);
          }).catch(err => {
            console.log(err);
        });
    }
  return (
    <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img src={product.image}/>
    </div>
    <div className={styles.productDetailContainer}>
      <h1 className={styles.productTitle}>{product.title}</h1>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>Rs {product.price}</p>
      <p className={styles.category}><b>Category:</b> {capitalizeFirstLetterOfWord(product.category)}</p>
      <button className={!foundItem ? styles.addToCart : styles.removeFromCart} 
        onClick={!foundItem ? addItemToCart : removeItemFromCart}>
        {!foundItem ? "Add to Cart" : "Remove from Cart"}</button>
    </div>
    </div>
  )
}

export default ProductDetails