import { reactive } from 'vue'

export const state = reactive({
    isLoading: !true,
  });

export const setState = (obj) => {
  Object.assign(state, obj);
}