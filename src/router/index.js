import {
  defineComponent,
  h
} from "vue";
import {
  createRouter,
  createWebHistory,
  START_LOCATION
} from "vue-router";
import {appState} from "@/store";
import AppView from "../views/AppView.vue";
import _DashboardLayout from "../views/Dashboard/_DashboardLayout.vue";
import MainView from "../views/Dashboard/MainView.vue";
import ContactsPageView from "../views/Dashboard/ContactsPageView.vue";

const localToken = !!localStorage.getItem("token") ? localStorage.getItem("token") : "";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: "main",
      component: AppView,
      beforeEnter: (to, from) => {

        // if (START_LOCATION == from && !localToken && to.meta.requireAuth) {
        //   console.log("object")
        //   return {name: 'sign-in'};
        // }

        return true;
      },
      children: [{
          path: '/',
          name: "dashboard",
          meta: {
            requireAuth: true
          },
          exact: false,
          component: () => import("@/views/Dashboard/_DashboardLayout.vue"),
          children: [{
              path: "/",
              name: "dashboard-main",
              component: () => {
                return import("@/views/Dashboard/MainView.vue");
              }
            },
            
            {
              path: "/contacts",
              name: "Contacts",
              component: () => {
                return import("@/views/Dashboard/ContactsPageView.vue");
              },
              children: [
                {
                  path: "/contacts/:userId",
                  name: "contact-page",
                  component: () => {
                    return import("@/views/Dashboard/ContactView.vue");
                  },
                },
              {
                path: "child",
                name: "contacts-child",
                component: () => {
                  return import("@/views/Dashboard/ContactView.vue");
                },
                children: [{
                  path: '/:pathMatch(contacts/child.*)*',
                  name: "NestedNotFound",
                  component: () => import("@/views/404/NestedNotFound.vue"),
                }]
              },
                {
                  path: '/:pathMatch(contacts/.*)*',
                  name: "MainNotFound",
                  component: () => import("@/views/404/MainNotFound.vue"),
                }
              ]
            },
            {
              path: '/:pathMatch(.*)*',
              name: "DashboardNotFound",
              component: () => import("@/views/404/DashboardNotFound.vue"),
            }
          ],

        },
        {
          name: "auth",
          path: '/',
          meta: {
            requireAuth: false
          },
          component: () => import("@/views/Authorization/_AuthLayout.vue"),
          children: [{
            path: '/',
            name: "sign-in",
            component: () => {
              return import("../views/Authorization/SignIn.vue");
            },
          }, {
            path: '/:pathMatch(.*)*',
            name: "autNotFound",
            redirect: '/',
          }]
        },
      ]
    },

  ],
});

export default router;