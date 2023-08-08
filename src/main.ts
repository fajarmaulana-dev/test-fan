import {createApp} from '@vue/runtime-dom';
import App from './App.vue';
import router from './router';
import './style.css';
import '@fontsource/be-vietnam-pro/100.css';
import '@fontsource/be-vietnam-pro/200.css';
import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/be-vietnam-pro/900.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
