import api from './axios';
import UserService from './UserService';
import {
    userState
} from '@/store';

class AuthSerice {
    async signIn(params) {
        try {
            const request = await UserService.signIn(params);
            return Promise.resolve(request);
        } catch (e) {
            if (e.response.status == 404) {
                return Promise.reject(new Error("Route not found"))
            }
            return Promise.reject(new Error(e))
        }
    }
    logOut() {
        window.localStorage.removeItem("token");
        userState.clearUser();
    }
}

export default new AuthSerice;