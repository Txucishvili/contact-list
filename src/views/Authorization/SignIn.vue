<script>
import FormBox from "@/components/Form/FormBox.vue";
import FormInput from "@/components/Form/FormInput.vue";
import Button from "@/components/Button/Button.vue";
import SomeComponent from "@/components/SomeComponent.vue";
import useVuelidate from "@vuelidate/core";
import { minLength, helpers, required, email } from "@vuelidate/validators";
import { computed, ref } from "vue";
import AuthSerice from "@/services/AuthService";
import { API } from "@/mixins";

export default {
  inject: ["userState", "store"],
  mixins: [API],
  extends: [SomeComponent],
  components: {
    FormBox,
    FormInput,
    Button,
  },
  setup(e) {
    console.log("this", this, e);
    const rules = {
      signInForm: {
        userEmail: {
          required: helpers.withMessage("This field cannot be empty", required),
          email: helpers.withMessage("Invalid email address", email),
          $lazy: true,
        },
        passwordHash: {
          required: helpers.withMessage("This field cannot be empty", required),
          minLength: helpers.withMessage(
            ({ $pending, $invalid, $params, $model }) =>
              `Password must be more then ${$params.min} characters`,
            minLength(8)
          ),
        },
      },
    };
    return {
      validation$: useVuelidate({ $rewardEarly: !false }),
    };
  },
  data() {
    return {
      signInForm: {
        email: "",
        passwordHash: "",
      },
    };
  },
  validations() {
    return {
      signInForm: {
        email: {
          required: helpers.withMessage("This field cannot be empty", required),
          email: helpers.withMessage("Invalid email address", email),
        },
        passwordHash: {
          required: helpers.withMessage("This field cannot be empty", required),
          minLength: helpers.withMessage(
            ({ $pending, $invalid, $params, $model }) =>
              `Password must be more then ${$params.min} characters`,
            minLength(8)
          ),
        },
      },
    };
  },
  mounted(e) {},
  methods: {
    async submitForm(e) {
      this.validation$.$validate();

      if (this.validation$.$invalid) {
        return;
      }

      const { email, passwordHash } = this.signInForm;

      try {
        const userResp = await AuthSerice.signIn({ email, passwordHash });
        console.log("userResp", userResp);
        this.setUser(userResp);
      } catch (error) {
        console.log("[SignInError]", error);
      }
    },
    setUser(user) {
      window.localStorage.setItem("token", user.token);
      this.$router.replace("");

      this.userState.setUser(user);
    },
  },
  mounted() {
    // ContactsService.addContact()
  },
};
</script>

<template>
  <div class="auth-form--wrap auth-form--box">
    <div class="auth-form--title">
      <h1 class="heading">authentication</h1>
    </div>
    <div class="form-area">
      <FormBox ref="formRef" @submit="submitForm">
        <FormInput
          @blur="validation$.signInForm.email.$commit"
          type="text"
          name="email"
          v-model="validation$.signInForm.$model.email"
          placeholder="example@mail.com"
        >
          {{ this.validation$.signInForm.$model.email }}
          <template #label><p>Email:</p></template>
          <template v-if="this.validation$.signInForm.email.$errors" #errors>
            <p
              v-for="error of validation$.signInForm.email.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </template>
        </FormInput>

        <FormInput
          type="password"
          name="password"
          v-model="signInForm.passwordHash"
          placeholder="*******"
        >
          <template #label><p>Password:</p></template>
          <template v-if="validation$.signInForm.passwordHash.$invalid" #errors>
            <p
              v-for="error of validation$.signInForm.passwordHash.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </template>
        </FormInput>
        <div class="c-8"></div>
        <Button class="btn--big" type="light" v-bind:wide="true">
          Sign In
        </Button>
      </FormBox>
    </div>
  </div>
</template>

<style lang="sass">
</style>
