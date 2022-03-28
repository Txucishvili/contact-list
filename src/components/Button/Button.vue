<template>
  <button :type="type" :class="'btn' + ` btn--${type ?? 'primary'} ${!!wide ? 'wide' : ''}`">
    <slot />
  </button>
</template>

<script>
export default {
  props: ["type", "size", "wide"],
};
</script>

<style lang="scss">
.btn {
  border: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  font-family: var(--main-font-Cairo);
    transition: all 0.125s ease-in-out;

  &--light {
    background-color: var(--button-light-color);

    &:hover {
      background-color: var(--button-light-color-hover);
    }

    &:active {
      // background-color: #fff;
      box-shadow: 0 0 0 2px $main-theme-color;
    }
  }

  &--primary {
    background-color: var(--button-primary-color);

    &:hover {
      background-color: var(--button-primary-color-hover);
    }
  }

  
  &--danger {
    background-color: var(--button-danger-color);

    &:hover {
      background-color: var(--button-danger-color-hover);
    }
  }


  &--small {
    padding: 6px 11px;
  }

  &--big {
    padding: 16px 20px;
  }

  &.wide {
    width: 100%;
  }
}
</style>