import React from 'react'
import styles from './Category.module.css';

function Category({ category, selectedCategories, addCategory }){
    return (
        <div className={selectedCategories.find((c) => c.id === category.id) ? `${styles.categoryContainer} ${styles.appliedFilter}` : styles.categoryContainer} onClick={() => addCategory(category.id)}>
            {category.label}
        </div>
    )
}

export default Category