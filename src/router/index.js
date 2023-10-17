import { createWebHistory, createRouter } from "vue-router";
import dynamic from '../components/dynamic.vue'
import home from '../components/home.vue'
import newComp from '../components/new.vue'
import chartjs from '../components/chartjs.vue'
import line from '../components/line.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "About",
    component: dynamic,
  },
  {
    path: "/new",
    name: "New",
    component: newComp,
  },
  {
    path: "/chartjs",
    name: "chartjs",
    component: chartjs,
  },
  {
    path: "/line",
    name: "line",
    component: line,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;