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
<table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Item </th>
                        <th> Stocked Count</th>
                        <th> Barcode</th>
                        <th> Last Stocked Time </th>
                        <th> Updated Time</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="inventory in inventorys" v-bind:key="inventory.id">
                        <td> {{inventory.product_name }}</td>
                        <td> {{inventory.current_count }}</td>
                        <td> {{inventory.barcode }}</td>
                        <td> {{inventory.last_stocked_at}}</td>    
                        <td> {{inventory.created_at}}</td>
                        <td>  
                            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(inventory)" >Edit</b-button>
                            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteInventoryById(inventory.id)">Delete</b-button> 
                        </td>
                    </tr>
                </tbody>
            </table>
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
      inventorys: [],
      currentInventory: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    getInventory(){ // get list
        InventoryService.getInventory().then((response) => {
            this.inventorys = response.data;   
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
    this.getInventory();
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
