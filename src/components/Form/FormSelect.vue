<template>
  <div class="form-box form-input form-input--wrap">
    <label class="form-input--label">
      <slot name="label"></slot>
    </label>
    <div class="form-input--control">
      <select @change="$emit('change', $event)" v-model="model" v-bind="attrs">
        <slot name="options" />
      </select>
      <!-- <input
        v-bind="attrs"
        :value="modelValue ?? modelValue"
        @keypress="onKeyPress"
        @input="handleInput"
      /> -->
    </div>
    <div class="form-input--errors">
      <slot name="errors"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["model", "items"],
  emits: ["update:model", "blur", "change"],
  data() {
    return {
      insideValue: "",
    };
  },
  computed: {
    attrs() {
      const { value, ...newAttrs } = this.$attrs;
      return newAttrs;
    },
    models() {
      return this.model;
    },
  },
  methods: {
    onKeyPress(e) {},
    handleInput(e) {
      this.$emit("update:model", e.target.value);
    },
    handleBlur(e) {},
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
select {
  padding: 11px;
  color: #cfcfcf;
  font-size: 18px;
  background-color: var(--theme-dark);
  border: none;
  width: 100%;
  outline: none;
  height: $base-form-input-height;
}
</style>