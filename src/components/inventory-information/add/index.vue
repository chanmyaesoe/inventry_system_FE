<template>
  <div class="container">
    <div>
      <b-modal id="inventoryForm" title="Inventory Add Form"  hide-footer ref="inventoryForm">
      <div class="form-group">
        <label for="firstName">Item Name </label>
        <input
          type="text"
          class="form-control"
          v-model="inventory.product_name"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="firstName">Barcode </label>
        <input
          type="text"
          class="form-control"
          v-model="inventory.barcode"
          required
          name="title"
        />
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
export default {
  name: "add-inventory",
  props: [ 'getInventory' ],
  data() {
   return {
      inventory: {
        id: '',
        product_name: '',
        barcode: ''
      },
      IsSaveInventory:true
    };
  },
  methods: {
    updateInventory() {
      var data = {
        product_name: this.inventory.product_name,
        barcode: this.inventory.barcode,
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
        product_name: this.inventory.product_name,
        barcode: this.inventory.barcode
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
        product_name: '',
        barcode: ''
      }
        this.IsSaveInventory = true
      }
     
      this.$refs['inventoryForm'].show()
    }
  }
};
</script>