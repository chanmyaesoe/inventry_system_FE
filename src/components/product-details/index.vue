<template>
  <div class="container">
    <div class="col-md-8">
        <b-button variant="success" @click="openModal('')">Add Details</b-button>
        <b-button class="m-3 btn btn-sm export" variant="info">
          <a href="http://localhost:8080/api/productDetails/export">Export</a>
        </b-button>
    </div>
    <div>
      <h4>productDetails Information</h4>
    </div>
    <div>
<table class = "table table-striped">
                <thead>
                    <tr>
                        <th> Item Name</th>
                        <th> Count</th>
                        <th> Remaining Count </th>
                        <th> Price </th>
                        <th> Last Stocked Time</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="productDetail in productDetails" v-bind:key="productDetail.id">
                        <td> {{productDetail.product_name }}</td>
                        <td> {{productDetail.new_count }}</td>
                        <td> {{productDetail.remaining_count}}</td>  
                        <td> {{productDetail.price}}</td>    
                        <td> {{productDetail.updated_at}}</td>
                        <td>  
                            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteProductDetailsById(productDetail.id)">Delete</b-button> 
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
  <AddComponent ref="productDetailForm" :getProductDetail="getproductDetails"/>
  </div>
</template>

<script>
import ProductDetailService from "../../services/ProductDetailService";
import AddComponent from "./add/index.vue";

export default {
  name: "productDetails",
  components: {
    AddComponent
  },
  data() {
    return {
      productDetails: [],
      currentproductDetails: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    getproductDetails(){ // get list
        ProductDetailService.getproductDetails().then((response) => {
            this.productDetails = response.data;   
        });
    },
    deleteProductDetailsById(id) { // delete
      ProductDetailService.deleteProductDetailsById(id)
        .then(response => {
          if(response.data.status === 200) {
            this.getproductDetails();
          }
          this.$toastr.s(response.data.message);
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(e.data.message);
        });
    },
    openModal(data) { // open add/update form
      this.$refs.productDetailForm.openModal(data)
    }
  },
  mounted() {
    this.getproductDetails();
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
