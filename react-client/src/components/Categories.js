import React from 'react'
import styles from './Categories.module.css';

function Categories({ children }) {
  return (
    <div className={styles.categoriesContainer}>
        <h3>Categories</h3>
        {children}
    </div>
  )
}

export default Categories