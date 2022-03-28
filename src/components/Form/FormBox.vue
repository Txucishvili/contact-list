 <template>
  <div class="form-box form-box--wrap">
    <form autocomplete="off" id="app" @submit="checkForm">
			<!-- {{loginForm.userEmail}} -->
      <slot></slot>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";

export default {
	props: ["form"],
  emits: ["submit:Form", "submit:Input"],
	data() {
		return {
			fields: this.form ? this.form.form : {}
		}
	},
	setup() {
		return {
			v$: useVuelidate()
		}
	},
	validations() {
    return {
      fields: this.form ? this.form.validations : {}
    };
  },
  // provide() {
  //   return {
  //     formFields: this.form
  //   }
  // },
  methods: {
    checkForm(e) {
			// console.log(this.fields);

			// this.v$.$validate();
			// console.log('[errors]', this.v$.$errors);
      this.$emit("submit:Form", e);
			e.preventDefault();
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>