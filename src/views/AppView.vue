<script>
import Navigation from "@/components/Navigation.vue";
import { useRoute, useRouter } from 'vue-router';

export default {
  inject: ["userState", "AppLoader"],
  setup() {
  },
  mounted() {
  }
}
</script>

<template>
  <!-- {{ userState.state.userName }} {{ userState.state.token }} -->
  <router-view></router-view>
</template>

<style>
</style>
