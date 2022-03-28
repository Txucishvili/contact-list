import DashboardNotFound from '@/views/404/DashboardNotFound.vue';
import MainNotFound from '@/views/404/MainNotFound.vue';
import NestedNotFound from '@/views/404/NestedNotFound.vue';
import DashboardLayout from "@/views/Dashboard/_DashboardLayout.vue";
import DashboardMainView from "@/views/Dashboard/MainView.vue";

const DashboardRoutes = {
    path: '/',
    name: "main",
    meta: {
        requireAuth: true
    },
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
            children: []
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
    
    ],

};

export default DashboardRoutes;