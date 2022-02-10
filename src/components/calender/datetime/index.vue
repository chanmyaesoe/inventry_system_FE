<template>
  <div class="container">
    <div>
      <b-modal id="calenderForm" :title="datetime" ref="detailForm" hide-footer>
      <table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Employee Name</th>
                        <th> inventory </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="calender in calendersByDate" v-bind:key="calender.id">
                        <td> {{calender.first_name }} {{calender.last_name }}</td>
                        <td> {{calender.product_name }}</td>
                    </tr>
                </tbody>
            </table>
      </b-modal>
    </div>    
  </div>
</template>

<script>
import CalenderService from "../../../services/CalenderService";
export default {
  name: "AddEmployee",
  data() {
    return {
        calendersByDate: {
            first_name:'',
            last_name:'',
            product_name:'',
            datetime:''
        },
        datetime:''
    };
  },
   methods: {
    hideModal() {
        this.$refs['detailForm'].hide()
    },
    getCalenderByDate(datetime) { // get calender by date
    this.datetime = "Data for " + datetime;
      CalenderService.getCalenderByDate(datetime)
        .then(response => {
          if(response.status === 200) {
             this.calendersByDate = response.data;  
             console.log('hwerwe')
             console.log(this.calendersByDate)
          }
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    openModal(datetime) {
      this.getCalenderByDate(datetime);          
      this.$refs['detailForm'].show()
    }
  }
};
</script>

<style>

</style>
