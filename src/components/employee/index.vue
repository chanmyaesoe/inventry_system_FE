<template>
  <div class="container">
    <div class="col-md-8">
      <div class="input-group mb-3">
         <button class="m-3 btn btn-sm btn-success" @click="openModal('')">Add Employee</button>
      </div>
    </div>
    <div>
      <h4>Employees List</h4>
    </div>
    <div>
      <div v-if="currentEmployee">
        <h4>Employee</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentEmployee.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentEmployee.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentEmployee.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/employees/' + currentEmployee.id" class="badge badge-warning">Edit</router-link>
      </div>
    </div>
    <div>
<table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Employee Id</th>
                        <th> Employee First Name</th>
                        <th> Employee Last</th>
                        <th> Employee Email</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in employees" v-bind:key="employee.id">
                        <td> {{employee.id }}</td>
                        <td> {{employee.first_name }}</td>
                        <td> {{employee.last_name}}</td>    
                        <td> {{employee.email}}</td>
                        <td>  
                            
                            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(employee)" >Edit</b-button>
                            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteEmployeeById(employee.id)">Delete</b-button> 
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
    <AddComponent ref="addForm" :getEmployee="getEmployees"/>
  </div>
</template>

<script>
import EmployeeService from "../../services/EmployeeService";
import AddComponent from "./add/index.vue";

export default {
  name: "Employee",
  components:{AddComponent},
  data() {
    return {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    getEmployees(){ //get list
        EmployeeService.getEmployees().then((response) => {
            this.employees = response.data;   
        });
    },

    deleteEmployeeById(id) { // delete api
      EmployeeService.deleteEmployeeById(id)
        .then(response => {
          if(response.data.status === 200) {
            this.getEmployees();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          this.$toastr.e(e.data.message);
          console.log(e);
        });
    },    
    searchTitle() {
      EmployeeService.findByTitle(this.title)
        .then(response => {
          this.employees = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    openModal(data) { //open add/update form
      this.$refs.addForm.openModal(data)
    }
  },
  mounted() {
    this.getEmployees();
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
