<template>
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink><br />
    <RouterLink to="/about">Abot</RouterLink><br />
    <RouterLink to="/list">List</RouterLink><br />
    <button @click="deleteToken">delete</button>
  </nav> -->
  <div class="head-navigation">
    <div class="head-navigation--wrap">
      <ul class="nav head-nav">
        <li>
          <RouterLink
            active-class="main-active"
            :to="'/'"
            >Home</RouterLink
          >
        </li>
        <li><RouterLink :to="{ name: 'Contacts' }">Contacts</RouterLink></li>
      </ul>
      <div class="right-area">
        <Button class="btn--small" type="primary" @click="deleteToken">Sign out</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import AuthSerice from "@/services/AuthService";
import Button from "@/components/Button/Button.vue";
export default {
  inject: ["store", "userState"],
  components: {Button},
  mounted() {
  },
  setup(props, { attrs, slots, emit, expose }) {
  },
  methods: {
    async deleteToken(e) {
      AuthSerice.logOut();
      this.$router.replace({ name: "sign-in" });
    },
  },
};
</script>

<style lang="scss">
.head-navigation {
  &--wrap {
    display: flex;
    width: 100%;
    // padding: 0 0 20px 0;
  }
  .right-area {
    margin: 0 auto;
  }
  ul.nav {
    margin: 0;
    padding: 0;
    flex: 1;
    &.head-nav {
      display: flex;
      li {
        list-style: none;
        margin-right: 10px;
        display: flex;

        &:last-child {
          margin-right: 0;
        }
        a {
          padding: 10px 15px;
          color: gray;
          text-decoration: none;
          @include FontCairo(18, 600);
          text-transform: uppercase;
          letter-spacing: 1.1px;
          font-variant: all-small-caps;

          &.router-link-active,
          .router-link-exact-active {
            color: #fff;
            background-color: var(--theme-dark2);
            // background-color: var(--header-bg);
          }

          &.main-active.router-link-exact-active {
            color: #fff;
            background-color: var(--theme-dark2);
            // background-color: var(--header-bg);
          }
        }
      }
    }
  }
}
</style>