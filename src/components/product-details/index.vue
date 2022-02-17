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
            <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
        <!-- Optional default data cell scoped slot -->
          <template #cell(action)="data">
            <b-button class="m-3 btn btn-sm" variant="primary"  @click="openModal(data.item)" > Edit </b-button>
            <b-button class="m-3 btn btn-sm" variant="danger" @click="deleteEmployeeById(data.item.id)">Delete</b-button> 
          </template>
        </b-table>
        <b-pagination size="md" v-on:change="onPageChange" :total-rows="totalItems" v-model="currentPage" :per-page="pageInfo.pageSize"></b-pagination>
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
      items: [],
      currentproductDetails: null,
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
          key: 'new_count',
          label: 'New Count'
        },
        {
          key: 'remaining_count',
          label: 'Remaining Count'
        },
        {
          key: 'price',
          label: 'Price'
        },
        {
          key: 'updated_at',
          label: 'Updated Time'
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
          this.getproductDetails(this.pageInfo);
      },
    getproductDetails(pageInfo = null){ // get list
    if(pageInfo === null) {
        pageInfo = this.pageInfo
      }
        ProductDetailService.getproductDetails(pageInfo).then((response) => {
            this.items = response.data.data;
            this.totalItems  = response.data.pageInfo.pageSize
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
    this.getproductDetails(this.pageInfo);
  }
};
</script>

<style>
  @import '../../assets/css/common.css';
</style>
