<template>
  <div class="container">
    <div>
      <b-modal id="calenderForm" title="Calender Add Form" ref="addForm" hide-footer>
      <div class="form-group">
        <label for="firstName">Employee Name </label>
        <b-form-select 
          v-model="calender.employee_id" 
          :options="employees"
          value-field="id"
          text-field="first_name">
        </b-form-select>
      </div>
      <div class="form-group">
        <label for="firstName">Item Name </label>
        <b-form-select 
          v-model="calender.product_id"
          @change="itemChange">
          <option v-for="inventory in inventories" :key="inventory.id" :value="inventory.id">
            {{ inventory.product_name }} ({{ inventory.current_count }})
         </option>
        </b-form-select>
      </div>
      <div class="form-group">
        <label for="firstName">Count </label>
        <input
          type="number"
          class="form-control"
          id="firstName"
          v-model="calender.count"
          required
          name="title"
          min="1"
          :max="max_product_count"
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
import CalenderService from "../../../services/CalenderService";
import EmployeeService from "../../../services/EmployeeService";
import InventoryService from "../../../services/InventoryService";
export default {
  name: "AddEmployee",
   props: [ 'getCalender' ],
   computed: {
    currentItemValue() {
      return this.inventories.find(option => option.id === this.calender.product_id)
    }
  },
  data() {
    return {
        calender: {
            count: 0,
            employee_id:'',
            product_id:'',
            id:''
        },
        employees:[],
        inventories: [],
        isSave:true,
        max_product_count:100
    };
  },
   methods: {
     fillUpData() {  // fetch data for select boxes
        InventoryService.getInventory().then((response) => {          
          this.inventories = response.data.data; 
        });
        EmployeeService.getEmployees().then((response) => {
          this.employees = response.data.data; 
        });       
     },
    updateData() { // update
      var data = {
        count: this.calender.count,
        employee_id: this.calender.employee_id,
        product_id: this.calender.product_id,
        id: this.calender.id
      };
      CalenderService.updateCalender(data)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getCalender();
            this.$toastr.s(response.data.message);
          }
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    saveData() { // create
      CalenderService.addCalender(this.calender)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getCalender();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    hideModal() {
        this.$refs['addForm'].hide()
    },
    openModal(data) {
      this.fillUpData();
      if(data !== '') {
        this.isSave = false
        this.calender.count = data.count
        this.calender.employee_id = data.employee_id
        this.calender.product_id = data.product_id
        this.max_product_count = data.current_count
        this.calender.id = data.id
      } else {
        this.calender = {
            count: 0,
            employee_id:'',
            product_id:'',
            id:''
        }
        this.isSave = true
      }
     
      this.$refs['addForm'].show()
    },
    itemChange() {
      this.calender.count = 1
      this.max_product_count = this.currentItemValue.current_count
      console.log(this.currentItemValue)
    }
  }
};
</script>

<style>

</style>
