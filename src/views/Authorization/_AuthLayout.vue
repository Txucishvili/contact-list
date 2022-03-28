<script>

export default {
   methods: {
        async setToken() {
            window.localStorage.setItem("token", "value");
            const routes = await import("@/router/dashboard");
            routes.default.forEach((e) => {
                this.$router.addRoute(e);
            });
            console.log(this.$router.getRoutes())
            this.$router.push("/")
        },
        async deleteToken(e) {
            window.localStorage.removeItem("token");

            const routes = await import("@/router/auth");
            routes.default.forEach((e) => {
                this.$router.addRoute(e);
            });
            console.log(this.$router.getRoutes())
            this.$router.push({
                name: 'main'
            })
            // this.$router.removeRoute("dashboard");
            // this.$router.push({name: "auth"});
        }
    }
}
</script>

<template>
  <div class="auth-layout auth-layout--wrap">
    <router-view></router-view>
  </div>
</template>

<style lang="sass">
@import "@/sass/authorization.scss"
</style>
