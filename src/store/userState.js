import { reactive } from 'vue';

const initialState = {
  userName: "",
  userEmail: "",
  token: "",
  tokenValidityChecked: false
};

export const state = reactive(initialState);

export const setUser = (obj) => {
  Object.assign(state, obj);
}

export const clearUser = () => {
  Object.assign(state, initialState);
}