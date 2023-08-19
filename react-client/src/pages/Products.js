import React from 'react'
import styles from './Products.module.css';

function Products({ children }) {
  return (
    <div className={styles.productsContainer}>
        {children}
    </div>
  )
}

export default Products;