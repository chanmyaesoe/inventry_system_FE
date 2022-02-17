import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees';

class EmployeeService{

    getEmployees(data){
        let formData = null
        if(data != null) {
            formData = {
                'pageNum': data.pageNum,
                'pageSize': data.pageSize
            }
        }
        const res = axios.get(EMPLOYEE_API_BASE_URL, {params:formData}, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    addEmployee(data){     
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        
        const res = axios.post(EMPLOYEE_API_BASE_URL, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL +'/' +id);
    }

    updateEmployee(data){
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('id', data.id);
        const url = EMPLOYEE_API_BASE_URL + '/' + data.id;
        const res = axios.put(url, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    }

    deleteEmployeeById(id){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }
}

export default new EmployeeService();