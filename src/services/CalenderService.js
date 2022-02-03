import axios from 'axios';

const CALENDER_API_BASE_URL = 'http://localhost:8080/api/calenders';

class CalenderService {

    getCalender() {
        return axios.get(CALENDER_API_BASE_URL);
    }

    addCalender(data){     
        const formData = new FormData();
        formData.append('count', data.count);
        formData.append('employee_id', data.employee_id);
        formData.append('inventory_id', data.inventory_id);
        
        const res = axios.post(CALENDER_API_BASE_URL, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    getCalenderById(id){
        return axios.get(CALENDER_API_BASE_URL +'/' +id);
    }

    updateCalender(data){
        const formData = new FormData();
        formData.append('count', data.count);
        formData.append('employee_id', data.employee_id);
        formData.append('inventory_id', data.inventory_id);
        formData.append('id', data.id);
        const url = CALENDER_API_BASE_URL + '/' + data.id;
        const res = axios.put(url, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    deleteCalenderById(id){
        return axios.delete(CALENDER_API_BASE_URL + '/' + id);
    }
}

export default new CalenderService();