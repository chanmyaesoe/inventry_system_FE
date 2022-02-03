<template>
  <div class="container">
    <div>
      <b-modal id="employeeForm" title="Employee Add Form" ref="addForm" hide-footer>
      <div class="form-group">
        <label for="firstName">First Name </label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="employee.first_name"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name </label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="employee.last_name"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="email">Email </label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="employee.email"
          required
          name="title"
        />
      </div>
       <div class="flexbox-center">
        <b-button class="mt-3 btn-style" variant="outline-danger" block @click="hideModal">Cancel</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="saveData" v-if="isSave">Save</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="updateData" v-else> Update </b-button>
      </div>
      </b-modal>
    </div>    
  </div>
</template>

<script>
import EmployeeService from "../../../services/EmployeeService";

export default {
  name: "AddEmployee",
   props: [ 'getEmployee' ],
  data() {
    return {
        employee: {
            first_name: '',
            last_name:'',
            email:'',
            id:''
        },
        employees:[],
        inventories: [],
        isSave:true
    };
  },
   methods: {
    updateData() { //update
      EmployeeService.updateEmployee(this.employee)
        .then(response => {
          if(response.data.status === 200) {
            // alert(1)
            this.hideModal();
            this.getEmployee();
            // setTimeout
            this.$toastr.s(response.data.message);
          }
          console.log(response)
          //  alert("here" + response.data.message)
          
        })
        .catch(e => {
          //  alert(e.data.message)
          this.$toastr.e(e.data.message);
          console.log(e);
        });
    },
    saveData() { //create
      EmployeeService.addEmployee(this.employee)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getEmployee();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          this.$toastr.e(e.data.message);
          console.log(e);
        });
    },
    hideModal() {
        this.$refs['addForm'].hide()
    },
    openModal(data) {
      if(data !== '') {
        this.isSave = false
        this.employee.first_name = data.first_name
        this.employee.email = data.email
        this.employee.last_name = data.last_name
        this.employee.id = data.id
      } else {
        this.employee = {
            first_name: '',
            last_name:'',
            email:'',
            id:''
        }
        this.isSave = true
      }
     
      this.$refs['addForm'].show()
    }
  }
};
</script>
