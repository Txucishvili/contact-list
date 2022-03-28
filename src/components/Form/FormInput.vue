<template>
  <div class="form-box form-input form-input--wrap">
    <label class="form-input--label">
       <slot name="label"></slot>
    </label>
    <div class="form-input--control">
      <input
      v-bind="attrs"
      :value="modelValue ?? modelValue"
      @keypress="onKeyPress"
      @input="handleInput"
    />
    </div>
    <div class="form-input--errors">
       <slot name="errors"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  computed: {
    attrs() {
      const {value, ...newAttrs} = this.$attrs;
      return newAttrs;
    }
  },
  methods: {
    onKeyPress(e) {},
    handleInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    handleBlur(e) {},
  },
  mounted() {
  }
};
</script>

<style>
</style>