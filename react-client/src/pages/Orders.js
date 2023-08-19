import React, { useEffect } from 'react'
import styles from './Orders.module.css';
import { useNavigate } from 'react-router-dom';

function OrderItem({ orderItem }){
  const { id, image, price, title, quantity, order_date } = orderItem;
  console.log(orderItem);
  const navigate = useNavigate();

  return (
    <>
    <div className={styles.orderItemContainer}>
      <div className={styles.productContainer}>
      <img className={styles.orderImage} src={image}/>
      <div className={styles.orderInfoContainer}>
        <p className={styles.orderTitle} onClick={() => navigate(`/product/${id}`)}>{title}</p>
      </div>
      </div>
      <p className={styles.orderPrice}>Rs {price}</p>
      <div className={styles.quantityContainer}>
        <p>{quantity}</p>
      </div>
      <p className={styles.orderDate}>{order_date}</p>
    </div>
    <hr className={styles.hr}/>
    </>
  )
}

function Orders({ products, orders }) {
  const orderItems = orders.map((order) => {
    const product = products.find(product => product.id === Number(order.id));
    return { ...product, quantity: order.quantity, order_date: order.order_date };
  })
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
    <div className={styles.ordersContainer}>
      <p className={styles.heading}>My Orders</p>
      <div className={styles.headerContainer}>
        <p>PRODUCT</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p>ORDER DATE</p>
      </div>
      <hr className={styles.hr}/>
      {(orderItems.length === 0) ? <p>No Orders</p> : orderItems.map((orderItem) => <OrderItem 
        orderItem={orderItem}
      />)}
    </div>
    <button className={styles.goToHome} onClick={() => navigate("/", {replace: true})}>Go To Home</button>
    </div>
  )
}

export default Orders;