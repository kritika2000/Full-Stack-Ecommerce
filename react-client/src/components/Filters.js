import React from 'react'
import styles from './Filters.module.css';
import { RxCross2 } from 'react-icons/rx';

function Filters(props) {
  const { selectedCategories, removeCategory, removeAllCategories } = props;
  return (
    <div className={styles.filterContainer}>
        {selectedCategories.map(category => <button className={styles.filterButtons} onClick={() => removeCategory(category.id)}>{category.label}<RxCross2/></button>)}
        {selectedCategories.length > 0 && <button onClick={removeAllCategories} className={styles.clearFilters}>Clear All</button>}
    </div>
  )
}

export default Filters