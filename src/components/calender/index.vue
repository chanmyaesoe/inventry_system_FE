<template>
  <div class="container">
    <div>
      
    </div>  
    <div class="col-md-8">
        <b-button v-b-modal.calenderForm variant="success" @click="openModal('')">Add Calender</b-button>
        <b-button class="m-3 btn btn-sm export" variant="info">
          <a href="http://localhost:8080/api/calenders/export">Export</a>
        </b-button>
    </div>
    <div>
      <h4>Inventory Calender</h4>
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

        <router-link :to="'/calenders/' + currentEmployee.id" class="badge badge-warning">Edit</router-link>
      </div>
    </div>
    <div>
<table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Employee Name</th>
                        <th> inventory </th>
                        <th> Count </th>
                        <th> Total Count </th>
                        <th> DateTime</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="calender in calenders" v-bind:key="calender.id">
                        <td> {{calender.first_name }} {{calender.last_name }}</td>
                        <td> {{calender.item_name }}</td>
                        <td> {{calender.count}}</td>  
                        <td> {{calender.item_count}}</td>    
                        <td> {{calender.datetime}}</td>
                        <td>  
                            
                            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(calender)" > Edit </b-button>
                            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteEmployeeById(calender.id)">Delete</b-button> 
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
    <AddComponent ref="addForm" :getCalender="getCalender"/>
  </div>
</template>

<script>
import CalenderService from "../../services/CalenderService";
import AddComponent from "./add/index.vue";

export default {
  name: "Employee",
  components: {
    AddComponent
  },
  data() {
    return {
      calenders: [],
      currentEmployee: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    getCalender() { // get list
        CalenderService.getCalender().then((response) => {
            this.calenders = response.data;   
        });
    },

    deleteEmployeeById(id) { // delete
      CalenderService.deleteEmployeeById(id)
        .then(response => {
          if(response.data.status === 200) {
            this.getInventory();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    openModal(data) { // open add/update form
      this.$refs.addForm.openModal(data)
    }
  },
  mounted() {
    this.getCalender();
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
