import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    }
  ]
});

export default router;