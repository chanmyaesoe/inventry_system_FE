<template>
  <div class="container">
    <div class="col-md-8">
      <b-button variant="success" @click="openModal('')">Add Calender</b-button>
      <b-button class="m-3 btn btn-sm" variant="info" @click="exportModal()">
        Export
      </b-button>
    </div>
    <div>
      <h4>Inventory Calender</h4>
    </div>
    <div>
      <b-table
        show-empty
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0">
        <template #cell(first_name)="data">
          {{ data.item.first_name }} {{ data.item.last_name }}
        </template>
        <template #cell(datetime)="data">
          <span @click="openDateTimeModal(data.item.datetime)" class="data-link"> {{ data.item.datetime }} </span>
        </template>
        <!-- Optional default data cell scoped slot -->
        <template #cell(action)="data">
          <b-button
            class="m-3 btn btn-sm"
            variant="primary"
            @click="openModal(data.item)"
          >
            Edit
          </b-button>
          <b-button
            class="m-3 btn btn-sm"
            variant="danger"
            @click="deleteEmployeeById(data.item.id)"
            >Delete</b-button
          >
        </template>
      </b-table>
      <b-pagination
        size="md"
        v-on:change="onPageChange"
        :total-rows="totalItems"
        v-model="currentPage"
        :per-page="pageInfo.pageSize"
      ></b-pagination>
    </div>
    <AddComponent ref="addForm" :getCalender="getCalender" />
    <DateTimeComponent ref="openDateTimeModal" />
    <ExportComponent ref="exportModal" />
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
    ExportComponent,
  },
  data() {
    return {
      items: [],
      currentIndex: -1,
      title: "",
      currentPage: 1,
      totalItems: 0,
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      fields: [
        {
          key: "first_name",
          label: "First Name",
        },
        {
          key: "product_name",
          label: "Product Name",
        },
        {
          key: "count",
          label: "Added Count",
        },
        {
          key: "current_count",
          label: "Remaining Stocked Count",
        },
        {
          key: "datetime",
          label: "Datetime",
        },
        {
          key: "action",
          label: "Actions",
        },
      ],
    };
  },
  methods: {
    onPageChange(data) {
      this.pageInfo.pageNum = data;
      this.getCalender(this.pageInfo);
    },
    getCalender(pageInfo = null) {
      // get list
      if (pageInfo === null) {
        pageInfo = this.pageInfo;
      }
      CalenderService.getCalender(pageInfo).then((response) => {
        this.items = response.data.data;
        this.totalItems = response.data.pageInfo.pageSize;
      });
    },
    deleteEmployeeById(id) {
      // delete
      CalenderService.deleteEmployeeById(id)
        .then((response) => {
          if (response.data.status === 200) {
            this.getInventory();
          }
          this.$toastr.s(response.data.message);
        })
        .catch((e) => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    openModal(data) {
      // open add/update form
      this.$refs.addForm.openModal(data);
    },
    openDateTimeModal(datetime) {
      // open add/update form
      this.$refs.openDateTimeModal.openModal(datetime);
    },
    exportModal() {
      // open add/update form
      this.$refs.exportModal.openModal();
    },
  },
  mounted() {
    this.getCalender(this.pageInfo);
  },
};
</script>

<style>
@import "../../assets/css/common.css";
</style>
