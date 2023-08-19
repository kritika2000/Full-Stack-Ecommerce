import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Login from './components/Login'
import Register from "./components/Register";
import AuthLayout from "./layouts/AuthLayout";
import getAllProducts from "./api/getAllProducts";
import getAllCategroies from './api/getAllCategories';
import getAllCartItems from './api/getAllCartItems';
import getAllOrders from "./api/getAllOrders";
import Products from "./pages/Products";
import Product from "./components/Product";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./layouts/Layout";
import Cart from "./pages/Cart";
import axios from "axios";
import Success from "./components/Success";
import Orders from "./pages/Orders";

function App() {
  const [state, setState] = useState({
    products: [],
    categories: [],
    cartItems: [],
    orders: [],
    isLoading: true,
    selectedCategories: []
  })
  const [error, setError] = useState(false);

  console.log(state);

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = searchParams.get('filter')?.split("&");
  const accessToken = localStorage.getItem('jwt');
  const [currentLoggedInUserDetails, setCurrentLoggedInUserDetails] = useState({
    username: "",
    email: ""
  });

  useEffect(() => {
    if(accessToken){
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
      axios.get('/authorize', config)
      .then(res => {
        setCurrentLoggedInUserDetails(res.data);
      })
      .catch((err) => {
        localStorage.removeItem('jwt');
        setCurrentLoggedInUserDetails({ username: "", email: "" });
      })
    }
    else{
      setCurrentLoggedInUserDetails({ username: "", email: "" });
    }
  }, [])

  useEffect(() => {
    (async() => {
      try{
        const products = await getAllProducts();
        console.log(products);
        setState(prev => ({
          ...prev,
          products: products.data ? products.data : [],
          isLoading: false,
        }))
        setError(false);
      }
      catch(err){
        setError(true);
      }
    })();

    (async() => {
      try{
        const categories = await getAllCategroies();
        setState(prev => ({
          ...prev,
          categories: categories.data ? categories.data : [],
          isLoading: false,
        }))
        filters && setCategoriesWithURLSearchParams(categories.data);
        setError(false);
      }
      catch(err){
        console.log(err);
        setError(true);
      }
    })();
    if(accessToken){
      (async() => {
        try{
          const cartItems = await getAllCartItems();
          setState(prev => ({
            ...prev,
            cartItems: cartItems?.data ? cartItems.data.cart : [],
            isLoading: false
          }))
          setError(false);
        }
        catch(err){
          console.log(err);
          window.location.reload();
        }
      })();
      (async() => {
        try{
          const orders = await getAllOrders();
          setState(prev => ({
            ...prev,
            orders: orders?.data ? orders.data.orders : [],
            isLoading: false
          }))
          setError(false);
        }
        catch(err){
          console.log(err);
          window.location.reload();
        }
      })();
    }
    else{
      setCurrentLoggedInUserDetails({ username: "", email: "" });
    }
}, [])

  function setCategoriesWithURLSearchParams (categoriesData){
    const updatedSelectedCategories = filters.map((filter) => {
      const categories = categoriesData.find(category => category.value === filter);
      return categories;
    })
    setState((prev) => ({
      ...prev,
      selectedCategories: updatedSelectedCategories
    }))
  }

  function addCategory(categoryId){
    const category = state.selectedCategories.find((category) => category.id === categoryId);
    if(category)
      removeCategory(categoryId);
    else{
      const updatedCategories = state.selectedCategories.filter((category) => category.id !== categoryId);
      const newCategory = state.categories.find((category) => category.id === categoryId);
      const searchFilters = [...updatedCategories, newCategory].map(c => c.value).join("+");
      setState(prev => ({
        ...prev,
        selectedCategories: [...updatedCategories, newCategory], 
      }))
      setSearchParams({
        filter: searchFilters
      })
    }
  }

  function removeCategory(categoryId){
    const updatedCategories = state.selectedCategories.filter((category) => category.id !== categoryId);
    const searchFilters = updatedCategories.map(c => c.value);
    console.log()
    setState(prev => ({
      ...prev,
      selectedCategories: updatedCategories
    }))
    searchFilters.length > 0 ? setSearchParams({
      filter: searchFilters.join("&")
    }) : setSearchParams({});
  }

  function removeAllCategories(){
    setState(prev => ({
      ...prev,
      selectedCategories: []
    }))
    setSearchParams({});
  }

  function addToCart(item){
    setState((prev) => ({
      ...prev,
      cartItems: [ ...state.cartItems, item ]
    }))
  }

  function removeFromCart(item){
    const updatedCartItems = state.cartItems.filter(cart => cart.id !== item.id);
    setState((prev) => ({
      ...prev,
      cartItems: updatedCartItems
    }))
  }

  function removeItemsFromCart(){
    setState((prev) => ({
      ...prev,
      cartItems: []
    }))
  }

  function changeQuantity(cartItem, quantity){
    const updatedCartItems = state.cartItems.map((item) => {
      return item.id === Number(cartItem.id) ? { ...item, quantity: Number(quantity) } : item
    })
    setState(prev => ({
      ...prev,
      cartItems: updatedCartItems
    }))
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
      const newItem = updatedCartItems.filter((item) => item.id === cartItem.id);
        axios.put(`http://localhost:5000/api/cart/${cartItem.id}`, newItem, config)
        .then(res => { 
          console.log(res);
          }).catch(err => {
            console.log(err);
        });
  }

  let allProductList = state.products?.map((product) => <Product key={product._id} 
    productDetails={product} 
    cartItems={state.cartItems}
    addToCart={addToCart}
    removeFromCart={removeFromCart}
    />);
  let filteredProductList = state.products?.filter((product) => state.selectedCategories?.find((category) => category.value === product.category))
  .map((product) => <Product 
    key={product._id} 
    productDetails={product} 
    cartItems={state.cartItems}
    addToCart={addToCart}
    removeFromCart={removeFromCart}
    />);

  return (
      <div className="App">
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
          {!error ? <Route element={<Layout currentLoggedInUserDetails={currentLoggedInUserDetails} cartItemsCount={state.cartItems?.length}/>}>
            state.categories && <Route path="" element={<HomeLayout 
              categories={state.categories} 
              selectedCategories={state.selectedCategories}
              addCategory={addCategory} 
              removeCategory={removeCategory}
              removeAllCategories={removeAllCategories}/>
          }>
          <Route index element={state.isLoading ? <p>Loading Results</p> : <Products>{state.selectedCategories.length ? filteredProductList : allProductList}</Products>}/>
          </Route>
          <Route path="/product/:id" element={<ProductDetails 
            allProducts={state.products} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            cartItems={state.cartItems}
          />}/>
          <Route path="/cart" element={<Cart 
            cartItems={state.cartItems} 
            removeFromCart={removeFromCart}
            changeQuantity={changeQuantity}
            removeItemsFromCart={removeItemsFromCart}
            currentLoggedInUserDetails={currentLoggedInUserDetails}
          />}
            />  
          <Route path="/success" element={<Success removeItemsFromCart={removeItemsFromCart}/>}
          />
          <Route path="/myorders" element={<Orders 
            products={state.products}
            orders={state.orders}
          />}/>
          </Route> : <h2>500 Internal Server Error</h2>}
        </Routes>
      </div>
  );
}

export default App;