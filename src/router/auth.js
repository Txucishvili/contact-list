import AuthLayout from '@/views/Authorization/_AuthLayout.vue';

const AuthRoutes = {
  path: '/',
  name: "main",
  component: AuthLayout,
  children: [{
    path: '/',
    name: "sign-in",
    component: () => {
      return import("../views/Authorization/SignIn.vue");
    }
  },      {
    path: '/:pathMatch(.*)*',
    redirect: "/"
}
]
};

export default AuthRoutes;