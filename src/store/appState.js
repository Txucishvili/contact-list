import { reactive } from 'vue'

export const state = reactive({
  isAuthenticated: null,
  sessionStartTime: new Date().getTime(),
  isLoading: true
});

export const setState = (obj) => {
  Object.assign(state, obj);
}