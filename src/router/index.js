import { createRouter, createWebHistory } from "vue-router"
import CurrencyConverter from "@/components/CurrencyCalculator.vue";

const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_URL),
    routes: [
        {
            path: '/currency-converter',
            name: 'currency-converter',
            component: CurrencyConverter,
        },
    ],
});

export default router;