<template>
  <Teleport v-if="$props.show" ref="modalOverlay" to="#modal-root">
    <div id="modals">
      <Transition duration="750" name="nested">
        <div v-if="$props.show" class="modal--wrap">
          <div @click="closeModal" class="modal--overlay outer"></div>

          <div
            class="modal--item inner"
            :style="{ width: $props.width, height: $props.height }"
          >
            <div class="modal--item-head">
              <div class="title-area">{{ $props.title }}</div>
              <div class="right-area">
                <button @click="closeModal" class="close-modal">X</button>
              </div>
            </div>
            <div class="modal--item-content">
              <slot />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["show", "width", "title", "height"],
  emits: ["update:show", "onModalClose"],
  data() {
    return {
      _show: false,
      portalShow: false,
      init_show: null,
    };
  },
  beforeMount() {
    const modalTarget = document.getElementById("modal-root");
    if (!modalTarget) {
      const _modalRoot = document.createElement("div");
      _modalRoot.id = "modal-root";
      document.body.appendChild(_modalRoot);
    }
    return {};
  },
  methods: {
    async closeModal() {
      this.$emit("update:show", false);
      this.$emit("onModalClose", false);
    },
  },
};
</script>

<style scoped lang="scss">
$modal-default-color: var(--theme-dark2);
.close-modal {
  width: 30px;
  height: 30px;
  background: var(--theme-ligth);
  @include reset-button;
  //   position: absolute;
  //   top: -30px;
  //   right: 2px;
}
.modal {
  &--wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--overlay {
    width: inherit;
    height: inherit;
    background-color: rgba(#000, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    @extend %flex;
  }

  &--item {
    box-shadow: 3px 3px 0 0 #000;
    width: 350px;
    // height: 250px;
    position: relative;
    overflow: auto;
    max-height: 90vh;
    margin: auto;

    &-head {
      @extend %flex;

      .title-area {
        background-color: $modal-default-color;
        padding: 6px 20px;
        @include FontCairo(16, 600);
        line-height: em(16);
      }
    }

    &-content {
      background: $modal-default-color;
      width: 100%;
    }

    .right-area {
      margin-left: auto;
      margin-top: auto;
    }
  }
}

.outer,
.inner {
  // background: #eee;
  // padding: 30px;
  // min-height: 100px;
}

.inner {
  // background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  // transform: translateX(30px);
  // animation: bounce-in ease-in-out;
  transform: scale(0.5);

  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>