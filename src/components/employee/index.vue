<template>
  <div class="container">    
    <div>
      <h4>Employees Information</h4>
    </div>
    <div class="col-md-8">
        <b-button variant="success" @click="openModal('')">Add Employee</b-button>
    </div>
    <div>
        <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
        <!-- Optional default data cell scoped slot -->
          <template #cell(action)="data">
            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(data.item)" > Edit </b-button>
            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteEmployeeById(data.item.id)">Delete</b-button> 
          </template>
        </b-table>
        <b-pagination size="md" v-on:change="onPageChange" :total-rows="totalItems" v-model="currentPage" :per-page="pageInfo.pageSize"></b-pagination>
    </div>
    <AddComponent ref="addForm" :getEmployee="getEmployees" />
  </div>
</template>
<!--


 -->
<script>
import EmployeeService from "../../services/EmployeeService";
import AddComponent from "./add/index.vue";

export default {
  name: "Employee",
  components: { AddComponent },
  data() {
    return {
      items: [],
      currentIndex: -1,
      title: "",
      currentPage: 1,
      totalItems: 0,
      pageInfo: {
          pageNum:1,
          pageSize:5
      },
      fields: [{
          key: 'first_name',
          label: 'First Name'
        },
        {
          key: 'last_name',
          label: 'Last Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'action',
          label: 'Actions'
        }
      ]
    };
  },
  methods: {
      onPageChange(data) {
          this.pageInfo.pageNum = data;
          this.getEmployees(this.pageInfo);
      },
    getEmployees(pageInfo = null) {
      //get list
      if(pageInfo === null) {
        pageInfo = this.pageInfo
      }
      EmployeeService.getEmployees(pageInfo).then((response) => {
        this.items = response.data.data;
        this.totalItems  = response.data.pageInfo.pageSize
      });
    },

    deleteEmployeeById(id) {
      // delete api
      EmployeeService.deleteEmployeeById(id)
        .then((response) => {
          // console.log(response.data.message)
          if (response.data.status === 200) {
            this.getEmployees();
          }
          this.$toastr.s(response.data.message);
        })
        .catch((e) => {
          console.log("hwerwer")
          console.log(e)
          // this.$toastr.e(e.data.message);
          console.log(e);
        });
    },
    searchTitle() {
      EmployeeService.findByTitle(this.title)
        .then((response) => {
          this.employees = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openModal(data) {
      //open add/update form
      console.log("here")
      console.log(data)
      this.$refs.addForm.openModal(data);
    },
  },
  mounted() {
    this.getEmployees(this.pageInfo);
  },
};
</script>

<style>
@import "../../assets/css/common.css";
</style>
