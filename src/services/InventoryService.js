import axios from 'axios';

const INVENTORY_API_BASE_URL = 'http://localhost:8080/api/inventories';

class InventoryService{

    getInventory(){
        return axios.get(INVENTORY_API_BASE_URL);
    }

    addInventory(data){     
        const formData = new FormData();
        formData.append('item_count', data.item_count);
        formData.append('item_name', data.item_name);
        formData.append('stocked_at', data.stocked_at);
        
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
        formData.append('item_count', data.item_count);
        formData.append('item_name', data.item_name);
        formData.append('stocked_at', data.stocked_at);
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