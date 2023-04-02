import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Qcm from '../components/Qcm.vue'
import Textarea from '../components/Textarea.vue'
import TextTrou from '../components/TextTrou.vue'
import Triage from '../components/Triage.vue'
import chronologie from '../components/chronologie.vue'
import Qcm2 from '../components/Qcm2.vue'

import Settings from '../views/Settings.vue'

const router = createRouter ({
    history : createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },

        {
            path: '/QCM',
            component: Qcm
        },

        {
            path: '/QCM2',
            component: Qcm2
        },

        {
            path : '/QuestionReponse',
            component: Textarea
        },

        {
            path : '/chronologie',
            component : chronologie
        },

        {
            path : '/TextTrou',
            component : TextTrou
        },

        {
            path :'/triage',
            component: Triage
        },

        {
            path :'/TextArea',
            component: Textarea
        },
    ]
})
export default router 