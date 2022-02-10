import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/employees",
      name: "employees",
      component: () => import("./components/employee/index")
    },
    {
      path: "/inventory-information",
      name: "inventory-information",
      component: () => import("./components/inventory-information/index")
    },
    {
      path: "/calender",
      alias: "/calender",
      name: "calender",
      component: () => import("./components/calender/index")
    },
    {
      path: "/product-detials",
      alias: "/product-detials",
      name: "productDetails",
      component: () => import("./components/product-details/index")
    }
  ]
});
