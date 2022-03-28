import api from './axios';


const _signIn = () => {
    return fetch("/authentication.json").then((r) => r.json());
}

 class AuthSerice {
    signIn(params) {
        return _signIn();
    }

    refreshToken()  {

    }
}

export default new AuthSerice;