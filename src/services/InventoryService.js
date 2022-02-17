import axios from 'axios';

const INVENTORY_API_BASE_URL = 'http://localhost:8080/api/products';

class InventoryService{

    getInventory(data = null){
        let formData = null
        if(data != null) {
            formData = {
                'pageNum': data.pageNum,
                'pageSize': data.pageSize
            }
        }        
        const res = axios.get(INVENTORY_API_BASE_URL, {params:formData}, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    addInventory(data){     
        const formData = new FormData();
        formData.append('barcode', data.barcode);
        formData.append('product_name', data.product_name );
        const res = axios.post(INVENTORY_API_BASE_URL, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    getInventoryById(id){
        return axios.get(INVENTORY_API_BASE_URL +'/' +id);
    }

    updateInventory(data){ 
        const formData = new FormData();
        formData.append('product_name', data.product_name);
        formData.append('barcode', data.barcode);
        formData.append('id', data.id);
        const url = INVENTORY_API_BASE_URL + '/' + data.id;
        const res = axios.put(url, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    deleteInventoryById(id){
        return axios.delete(INVENTORY_API_BASE_URL + '/' + id);
    }
}

export default new InventoryService();