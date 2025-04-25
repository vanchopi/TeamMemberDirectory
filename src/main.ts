import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import settings from "./utils/axios/settings";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import "@/assets/scss/index.scss";

settings();

const app = createApp(App).use(Quasar, quasarUserOptions).use(router);

router.isReady().then(() => {
  app.use(store);
  app.mount("#app");
});
