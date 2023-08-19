import axios from "axios";

const getAllProducts = async() => {
    try{
        const products = await axios.get('/api/products');
        return products;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export default getAllProducts;