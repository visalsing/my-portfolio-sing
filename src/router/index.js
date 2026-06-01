import { createRouter, createWebHistory } from "vue-router";

// ✅ different variable names
// 1. Import your Home/Landing component (Adjust path if yours is named differently)
// import Home from "../components/pages/Home.vue";
import Details from "../components/pages/Details.vue";
import Forward from "../components/pages/dir/Forward.vue";
import AllProjects from "../components/pages/AllProjects.vue";
import Settings from "../components/pages/Settings.vue";
import EachProject from "../components/pages/EachProject.vue";
import AllServices from "../components/pages/AllServices.vue";
import ServiceDetail from "../components/pages/ServiceDetail.vue";
import TechStack from "../components/pages/TechStack.vue";
import SoftSkills from "../components/pages/SoftSkills.vue";
import PrivacyPolicy from "../components/pages/PrivacyPolicy.vue";
import TermsServices from "../components/pages/TermsServices.vue";
import FAQs from "../components/pages/FAQ.vue";
import PortfolioMap from "../components/pages/PortfolioMap.vue";
import ReadMore from "../components/pages/ReadMore.vue";

const routes = [
  // ✅ 2. Add the Root Route here so the home screen has something to show!
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
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
    path: "/services/detail/:id",
    name: "ServiceDetail",
    component: ServiceDetail,
  },
  {
    path: "/techstack",
    name: "TechStack",
    component: TechStack,
  },
  {
    path: "/softskills",
    name: "SoftSkills",
    component: SoftSkills,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/terms-of-services",
    name: "TermsServices",
    component: TermsServices,
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: FAQs,
  },
  {
    path: "/portfolio-map",
    name: "PortfolioMap",
    component: PortfolioMap,
  },
  {
    path: "/read-more",
    name: "ReadMore",
    component: ReadMore,
  },
  // 💡 Optional: Add a 404 catch-all redirect to prevent blank pages on typos
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/",
  // },
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
