import { createRouter, createWebHistory } from "vue-router";

// ✅ different variable names
import Details from "../components/pages/Details.vue";
import Forward from "../components/pages/dir/Forward.vue";
import AllProjects from "../components/pages/AllProjects.vue";
import Settings from "../components/pages/Settings.vue";
import EachProject from "../components/pages/EachProject.vue";
import AllServices from "../components/pages/AllServices.vue";
import ServiceDetail from "../components/pages/ServiceDetail.vue";
import TechStack from "../components/pages/TechStack.vue";

const routes = [
  {
    path: "/details",
    name: "Details",
    component: Details,
  },
  {
    path: "/forward",
    name: "Forward",
    component: Forward,
  },
  {
    path: "/projects",
    name: "AllProjects",
    component: AllProjects,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/project/:id",
    // path: "/project",
    name: "EachProject",
    component: EachProject,
  },
  {
    path: "/services",
    name: "AllServices",
    component: AllServices,
  },
    {
    path: "/services/detail",
    name: "ServiceDetail",
    component: ServiceDetail,
  },
      {
    path: "/techstack",
    name: "TechStack",
    component: TechStack,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

export default router;
