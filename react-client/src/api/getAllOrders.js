import axios from "axios";

const getAllOrders = async() => {
    const accessToken = localStorage.getItem('jwt');
      const config = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
      }
    }
    try{
        const orders = await axios.get('/api/orders', config);
        console.log(orders);
        return orders;
    }
    catch(err){
        return err;
    }
}

export default getAllOrders;