<template>
  <div class="container">
    <div class="col-md-8">
        <b-button variant="success" @click="openModal('')">Add Calender</b-button>
        <!-- <b-button class="m-3 btn btn-sm export" variant="info">
          <a href="http://localhost:8080/api/calenders/export">Export</a>
        </b-button> -->
        <b-button class="m-3 btn btn-sm" variant="info"  @click="exportModal()" > Export </b-button>
    </div>
    <div>
      <h4>Inventory Calender</h4>
    </div>
    <div>
<table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Employee Name</th>
                        <th> inventory </th>
                        <th> Count </th>
                        <th> Remaning Stocked Count </th>
                        <th> DateTime</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="calender in calenders" v-bind:key="calender.id">
                        <td> {{calender.first_name }} {{calender.last_name }}</td>
                        <td> {{calender.product_name }}</td>
                        <td> {{calender.count}}</td>  
                        <td> {{calender.current_count}}</td>    
                        <td> <span @click="openDateTimeModal(calender.datetime)" class="data-link">{{calender.datetime}}</span></td>
                        <td>                              
                            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(calender)" > Edit </b-button>
                            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteEmployeeById(calender.id)">Delete</b-button> 
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
    <AddComponent ref="addForm" :getCalender="getCalender"/>
    <DateTimeComponent ref="openDateTimeModal"/>
    <ExportComponent ref="exportModal"/>
  </div>
</template>

<script>
import CalenderService from "../../services/CalenderService";
import AddComponent from "./add/index.vue";
import DateTimeComponent from "./datetime/index.vue";
import ExportComponent from "./export/index.vue";

export default {
  name: "Employee",
  components: {
    AddComponent,
    DateTimeComponent,
    ExportComponent
  },
  data() {
    return {
      calenders: [],
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
    },
    openDateTimeModal(datetime) { // open add/update form
      this.$refs.openDateTimeModal.openModal(datetime)
    },
    exportModal() { // open add/update form
      this.$refs.exportModal.openModal()
    },    
  },
  mounted() {
    this.getCalender();
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
