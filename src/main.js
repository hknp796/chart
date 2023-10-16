import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import CanvasJSChart from '@canvasjs/vue-charts';
 
const app = createApp(App);
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.use(router).mount('#app');  