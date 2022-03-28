export default [{
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
                children: [{
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