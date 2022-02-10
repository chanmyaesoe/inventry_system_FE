<template>
  <div class="container">
    <div>
      <b-modal id="calenderForm" title="Calender Export Form" ref="exportForm" hide-footer>
          <div v-if="validationError" class="validation-message">Please fill out all the date fields.</div>
      <div class="form-group">
        <label for="firstName">From </label>
        <datetime format="YYYY-MM-DD h:i:s"  v-model="calenderExport.from" class="form-control-datetimepicker"></datetime>
      </div>
      <div class="form-group">
        <label for="firstName">To </label>
        <datetime format="YYYY-MM-DD h:i:s"  v-model="calenderExport.to" class="form-control-datetimepicker"></datetime>
      </div>
       <div class="flexbox-center">
        <b-button class="mt-3 btn-style" variant="outline-danger" block @click="hideModal">Cancel</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="exportData">Export</b-button>
      </div>
      </b-modal>
    </div>    
  </div>
</template>

<script>
import CalenderService from "../../../services/CalenderService";
import datetime from 'vuejs-datetimepicker';
export default {
  name: "Export",
   props: [ 'getCalender' ],
   components: { datetime },
  data() {
    return {
        calenderExport: {
            from: '',
            to:''
        },
        validationError:false,
    };
  },
   methods: {
    hideModal() {
        this.$refs['exportForm'].hide()
    },
    openModal() {
      alert(4)
      this.$refs['exportForm'].show()
    },
    exportData() { // create
        if(this.calenderExport.from === '' | this.calenderExport.to === '') {
            this.validationError = true
        } else {
            this.validationError = false
            CalenderService.exportCalender(this.calenderExport)
        .then(response => {
            
          if(response.status === 200) {
            // this.hideModal();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calender.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
          }
        //   this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
        }
      
    },
    itemChange() {
      this.calender.count = 1
      this.max_current_count = this.currentItemValue.current_count
      console.log()
    }
  }
};
</script>

<style>

</style>
