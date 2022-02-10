<template>
  <div class="container">
    <div>
      <b-modal id="productDetailForm" title="ProductDetail Add Form"  hide-footer ref="productDetailForm">
      <div class="form-group">
        <label for="firstName">Item Name </label>
        <b-form-select 
          v-model="productDetail.product_id">
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.product_name }}
        </option>
        </b-form-select>
      </div>
      <div class="form-group">
        <label for="firstName">Stocked Count </label>
        <input
          type="text"
          class="form-control"
          v-model="productDetail.new_count"
          required
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="firstName">Price </label>
        <input
          type="text"
          class="form-control"
          v-model="productDetail.price"
          required
          name="title"
        />
      </div>
      <div class="flexbox-center">
        <b-button class="mt-3 btn-style" variant="outline-danger" block @click="hideModal">Cancel</b-button>
        <b-button class="mt-3 btn-style" variant="outline-warning" block @click="saveProductDetail">Save</b-button>
      </div>
      </b-modal>
    </div>    
  </div>
</template>

<script>
import InventoryService from "../../../services/InventoryService";
import ProductDetailService from "../../../services/ProductDetailService";

export default {
  name: "add-productDetail",
  props: [ 'getProductDetail' ],
  data() {
   return {
      productDetail: {
        id: '',
        product_id: '',
        new_count: '',
        price: ''
      },
      products:[]
    };
  },
  methods: {
    fillUpData() {  // fetch data for select boxes
        InventoryService.getInventory().then((response) => {          
          this.products = response.data; 
        });      
    },
    saveProductDetail() {
      var data = {
        product_id: this.productDetail.product_id,
        price: this.productDetail.price,
        new_count: this.productDetail.new_count
      };
      ProductDetailService.addProductDetail(data)
        .then(response => {
          if(response.data.status === 200) {
            this.hideModal();
            this.getProductDetail();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.s(e.data.message);
        });
    },
    hideModal() {
        this.$refs['productDetailForm'].hide()
    },
    openModal(data) {
      this.fillUpData();
      if(data !== '') {
        this.productDetail = data
      } else {
        this.productDetail = {
        id: '',
        product_name: '',
        barcode: '',
        stocked_at: ''
      }
      }
     
      this.$refs['productDetailForm'].show()
    }
  }
};
</script>