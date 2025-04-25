import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Error404 from "@/views/ErrorPage.vue";
import TeamMembersList from "@/views/TeamMembers/List.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: (to) => {
      return "/team-members";
    },
    children: [
      {
        path: "/team-members",
        name: "TeamMembersList",
        component: TeamMembersList,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
