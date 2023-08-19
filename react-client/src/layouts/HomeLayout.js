import React from 'react'
import { Outlet } from 'react-router-dom';
import Categories from '../components/Categories';
import Category from '../components/Category';
import Filters from '../components/Filters';

function Layout(props) {
  const { categories, addCategory, selectedCategories } = props;

  const allCategories = categories.map((category) => <Category 
    key={category.id} 
    selectedCategories={selectedCategories}
    category={category} 
    addCategory={addCategory}
  />)
  
  return (
    <div className='homeLayoutContainer'>
        <div className='homeMainContainer'>
            <Categories>{allCategories}</Categories>
            <div className='filterAndProductsContainer'>
              {selectedCategories.length > 0 && <Filters {...props} />}
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout