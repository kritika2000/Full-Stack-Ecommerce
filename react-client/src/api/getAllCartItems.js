import axios from "axios";

const getAllCartItems = async() => {
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
    try{
        const cartItems = await axios.get('/api/cart', config);
        console.log(cartItems);
        return cartItems;
    }
    catch(err){
        return err;
    }
}

export default getAllCartItems;