import axios from 'axios'
import {
    createApp, reactive
} from 'vue'
import App from './App.vue'
import router from './router'
import Button from '@/components/Button/Button.vue'
import FormInput from '@/components/Form/FormInput.vue'
import FormSelect from '@/components/Form/FormSelect.vue'
import Loader from '@/components/Loader.vue'
import FormBox from '@/components/Form/FormBox.vue'
import * as store from './store'
import setupInterceptors from './services/interceptors'
import VueGoodTablePlugin from 'vue-good-table-next';
import feather from 'feather-icons';
// // import the styles
// import 'vue-good-table-next/dist/vue-good-table-next.css'
feather.replace()

const app = createApp(App);

const token = localStorage.getItem("token");
const isTokenSet = !!token ? token : null;

const checkUserToken = async (key) => {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                userName: "someUser",
                token: "userToken"
            });
        }, 700);
    });
}


const setAuthenticationState = async (_app, _axios) => {
    console.log("[userAuthentication]");
}

const loadAuthRoutes = async () => {
    const authRoutes = await import("@/router/auth");
    router.addRoute(authRoutes.default);
}

const loadAppRoutes = async () => {
    const dashboardRoutes = await import("@/router/dashboard");
    router.addRoute(dashboardRoutes.default);
}

async function initApp() {
    const _router = router;
    app.config.globalProperties.appLoaderState = reactive({
        isLoading: true
    })

    if (!!isTokenSet) {
        const userDataInit = await checkUserToken();

        if (!!userDataInit.token.length) {
            await loadAppRoutes();
        } 

    } else {
        await loadAuthRoutes();
    }

    setupInterceptors(store);

    app.use(setAuthenticationState, {});
    app.use(router);

    app.mount('#app');
}


app.component('Button', Button)
app.component('FormBox', FormBox)
app.component('FormInput', FormInput)
app.component('Loader', Loader)
app.component('FormSelect', FormSelect)

setupInterceptors(store);
app.use(VueGoodTablePlugin);


app.use(router);

app.mount('#app');
// initApp();
