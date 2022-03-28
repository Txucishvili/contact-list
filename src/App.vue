<script setup>
import { inject, onMounted, provide, reactive } from "@vue/runtime-core";
import { START_LOCATION, RouterLink, RouterView, useRouter } from "vue-router";
import { appLoaderState, appState, userState } from "@/store";
const localToken = localStorage.getItem("token");

const router = useRouter();

provide("userState", userState);
provide("appState", appState);
provide("store", { someStore: "" });
provide("AppLoader", appLoaderState);

const checkUserTokenValidity = (token) => {
  return new Promise(async (resolve, reject) => {
    const tokenCheckData = await fetch("/authentication.json").then((r) =>
      r.json()
    );
    const isValid = token === tokenCheckData.token;

    if (!isValid) {
      localStorage.removeItem("token");
    }

    userState.setUser(isValid ? tokenCheckData : {});
    appLoaderState.state.isLoading = false;
    resolve(isValid);
  });
};

if (!!!localToken) {
  userState.setUser({});
  appLoaderState.state.isLoading = false;
}

router.beforeEach(async (to, from) => {
  // console.log(`from: ${from.name} - to ${to.name}`);

  const _token = localStorage.getItem("token");

  if (
    !!_token &&
    to.meta.requireAuth &&
    to.name !== "sign-in" &&
    START_LOCATION === from
  ) {
    const isValidToken = await checkUserTokenValidity(_token);
    if (!isValidToken) {
      return { name: "sign-in" };
    }
  }

  if (!!!_token && to.meta.requireAuth && to.name !== "sign-in") {
    return { name: "sign-in" };
  }
  return true;
});
</script>

<template>
  <div class="root-app">
    <div v-if="appLoaderState.state.isLoading" class="root-layout--loader">
      <div class="spinner-container">
        <div class="spinner spinner-1"></div>
        <div class="spinner spinner-2"></div>
        <div class="spinner spinner-3"></div>
        <div class="spinner spinner-4"></div>
        <div class="spinner spinner-5"></div>
        <div class="spinner spinner-6"></div>
        <div class="spinner spinner-7"></div>
        <div class="spinner spinner-8"></div>
        <div class="spinner spinner-9"></div>
        <div class="spinner spinner-10"></div>
        <div class="spinner spinner-11"></div>
        <div class="spinner spinner-12"></div>
      </div>
    </div>
    <!-- <div v-if="loadState.isLoading" class="root-layout--loader">
      Loading...
    </div> -->
    <!-- {{ userState.state.userName }} {{ userState.state.token }} -->
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/sass/base.scss";
@import "@/sass/layout.scss";
@import "@/sass/forms.scss";
</style>
