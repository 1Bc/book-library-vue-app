import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import $authorData from '@/data/authors'
import $bus from "./utils/events";

const app = createApp(App);

app.use(router)
// app.config.globalProperties.$bus = $bus;
// app.config.globalProperties.$pages = $pages;

app.provide('$authorData',$authorData)
app.provide('$bus',$bus)

app.mount('#app')
