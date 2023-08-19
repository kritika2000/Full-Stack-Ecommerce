import axios from "axios";

const getAllCategories = async() => {
    try{
        const categories = await axios.get('/api/categories');
        return categories;
    }
    catch(err){
        return err;
    }
}

export default getAllCategories;