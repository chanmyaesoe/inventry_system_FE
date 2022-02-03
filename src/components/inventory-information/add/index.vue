<template>
  <div class="container">
    <div>
      <b-modal id="inventoryForm" title="Inventory Add Form"  hide-footer ref="inventoryForm">
      <div class="form-group">
        <label for="firstName">Item Name </label>
        <input
          type="text"
          class="form-control"
          v-model="inventory.item_name"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="firstName">Stocked Count </label>
        <input
          type="text"
          class="form-control"
          v-model="inventory.item_count"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="firstName">Last Stocked DateTime </label>
        <datetime format="YYYY-MM-DD h:i:s"  v-model="inventory.stocked_at" class="form-control-datetimepicker"></datetime>
      </div>
      <div class="flexbox-center">
        <b-button class="mt-3 btn-style" variant="outline-danger" block @click="hideModal">Cancel</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="saveInventory" v-if="IsSaveInventory">Save</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="updateInventory" v-else> Update </b-button>
      </div>
      </b-modal>
    </div>    
  </div>
</template>

<script>
import InventoryService from "../../../services/InventoryService";
import datetime from 'vuejs-datetimepicker';
export default {
  name: "add-inventory",
  components: { datetime },
  props: [ 'getInventory' ],
  data() {
   return {
      inventory: {
        id: '',
        item_name: '',
        item_count: '',
        stocked_at: ''
      },
      IsSaveInventory:true
    };
  },
  methods: {
    updateInventory() {
      var data = {
        item_name: this.inventory.item_name,
        item_count: this.inventory.item_count,
        stocked_at: this.inventory.stocked_at,
        id: this.inventory.id
      };
      InventoryService.updateInventory(data)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getInventory();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    saveInventory() {
      var data = {
        item_name: this.inventory.item_name,
        item_count: this.inventory.item_count,
        stocked_at: this.inventory.stocked_at
      };
      InventoryService.addInventory(data)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getInventory();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.s(e.data.message);
        });
    },
    hideModal() {
        this.$refs['inventoryForm'].hide()
    },
    openModal(data) {
      if(data !== '') {
        this.IsSaveInventory = false
        this.inventory = data
      } else {
        this.inventory = {
        id: '',
        item_name: '',
        item_count: '',
        stocked_at: ''
      }
        this.IsSaveInventory = true
      }
     
      this.$refs['inventoryForm'].show()
    }
  }
};
</script>