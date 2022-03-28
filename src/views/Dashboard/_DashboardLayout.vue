<script>
import Navigation from "@/components/Navigation.vue";
import Header from "@/components/Header/Header.vue";
import Button from "@/components/Button/Button.vue";
import Modal from "@/components/Modal/Modal.vue";
import { useRouter } from "vue-router";
export default {
  components: { Header, Navigation, Button, Modal },
  inject: ["userState"],
  setup() {},
  beforeRouteUpdate(to, from) {
  const _token = localStorage.getItem("token");

    // if (!!!_token && to.meta.requireAuth) {
    //   return { name: "sign-in" };
    // }
    
    // return true;
  },
};
</script>
<template>
  <div class="dashboard-layout">
    <div class="dashboard-layout--wrap">
      <!-- <p>Welcome: {{ userState.state.userName }}</p>
      <p>token: {{ userState.state.token }}</p> -->
      <Header />
      <Navigation />
      <div class="dashboard-layout--content">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/sass/dashboard-base";
.dashboard-layout {
  width: 100%;

  &--wrap {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }

  &--content {
    background-color: var(--theme-dark2);
    flex: 1;
  }
}
</style>