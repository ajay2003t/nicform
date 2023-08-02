import { createRouter, createWebHistory } from "vue-router";
import register from "../login/register.vue";
import login from "../login/login.vue";
import page1 from "../nicform/page1.vue";
import page2 from "../nicform/page2.vue";
import page3 from "../nicform/page3.vue";
import page4 from "../nicform/page4.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "register",
      component: register,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/page1",
      name: "page1",
      component: page1,
    },
    {
      path: "/page2",
      name: "page2",
      component: page2,
    },
    {
      path: "/page3",
      name: "page3",
      component: page3,
    },
    {
      path: "/page4",
      name: "page4",
      component: page4,
    },
  ],
});
export default router;
