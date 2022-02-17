import axios from 'axios';

const CALENDER_API_BASE_URL = 'http://localhost:8080/api/calenders';
const CALENDER_DATETIME_URL = 'http://localhost:8080/api/calenders-by-date';
const CALENDER_EXPORT_URL = 'http://localhost:8080/api/calenders/export';


class CalenderService {

    getCalender(data) {
        const formData = {
            'pageNum': data.pageNum,
            'pageSize': data.pageSize
        }
        const res = axios.get(CALENDER_API_BASE_URL, {params:formData}, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }
    getCalenderByDate(datetime) {
        const temp = datetime.split(" ")
        const from = temp[0] + " 00:00:00"
        const to = temp[0] + " 23:59:59"
        const formData = new FormData();
        formData.append('date', from);
        formData.append('to', to);
        const res = axios.post(CALENDER_DATETIME_URL, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }
    exportCalender(data) {
        const formData = new FormData();
        formData.append('from', data.from);
        formData.append('to', data.to);
        const res = axios.post(CALENDER_EXPORT_URL, formData, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res;
    }
    addCalender(data){     
        const formData = new FormData();
        formData.append('count', data.count);
        formData.append('employee_id', data.employee_id);
        formData.append('product_id', data.product_id);
        
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
        formData.append('product_id', data.product_id);
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