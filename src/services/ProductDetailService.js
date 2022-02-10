import axios from 'axios';

const PRODUCT_DETAIL_API_BASE_URL = 'http://localhost:8080/api/product-details';

class ProductDetailService{

    getproductDetails(){
        return axios.get(PRODUCT_DETAIL_API_BASE_URL);
    }

    addProductDetail(data){     
        const formData = new FormData();
        formData.append('new_count', data.new_count);
        formData.append('price', data.price);
        formData.append('product_id', data.product_id);
        const res = axios.post(PRODUCT_DETAIL_API_BASE_URL, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    getProductDetailById(id){
        return axios.get(PRODUCT_DETAIL_API_BASE_URL +'/' +id);
    }

    deleteProductDetailsById(id){
        return axios.delete(PRODUCT_DETAIL_API_BASE_URL + '/' + id);
    }
}

export default new ProductDetailService();