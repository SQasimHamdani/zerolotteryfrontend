import { createApp } from "vue";
import App from "@/app.vue";

document.addEventListener("DOMContentLoaded", async ()=>{

	const app = createApp(App);

	app.mount("#App");

}, { once: true });
