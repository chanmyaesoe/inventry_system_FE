<template>
  <div class="container">
    <div class="col-md-8">
        <b-button variant="success" @click="openModal('')">Add Inventory</b-button>
        <b-button class="m-3 btn btn-sm export" variant="info">
          <a href="http://localhost:8080/api/inventories/export">Export</a>
        </b-button>
    </div>
    <div>
      <h4>Inventory Information</h4>
    </div>
    <div>
            <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
        <!-- Optional default data cell scoped slot -->
          <template #cell(action)="data">
            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(data.item)" > Edit </b-button>
            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteInventoryById(data.item.id)">Delete</b-button> 
          </template>
        </b-table>
        <b-pagination size="md" v-on:change="onPageChange" :total-rows="totalItems" v-model="currentPage" :per-page="pageInfo.pageSize"></b-pagination>
    </div>
  <AddComponent ref="inventoryForm" :getInventory="getInventory"/>
  </div>
</template>

<script>
import InventoryService from "../../services/InventoryService";
import AddComponent from "./add/index.vue";

export default {
  name: "Inventory",
  components: {
    AddComponent
  },
  data() {
    return {
      items: [],
      currentInventory: null,
      currentIndex: -1,
      title: "",
      currentPage: 1,
      totalItems: 0,
      pageInfo: {
          pageNum:1,
          pageSize:5
      },
      fields: [{
          key: 'product_name',
          label: 'Product Name'
        },
        {
          key: 'current_count',
          label: 'stocked Count'
        },
        {
          key: 'barcode',
          label: 'Barcode'
        },
        {
          key: 'last_stocked_at',
          label: 'stocked Time'
        },
        {
          key: 'created_at',
          label: 'Created Time'
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
          this.getInventory(this.pageInfo);
      },
    getInventory(pageInfo = null){ // get list
      if(pageInfo === null) {
          pageInfo = this.pageInfo
        }
        InventoryService.getInventory(pageInfo).then((response) => {
            this.items = response.data.data;
            this.totalItems  = response.data.pageInfo.pageSize
        });
    },

    deleteInventoryById(id) { // delete
      InventoryService.deleteInventoryById(id)
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
      this.$refs.inventoryForm.openModal(data)
    }
  },
  mounted() {
    this.getInventory(this.pageInfo);
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
