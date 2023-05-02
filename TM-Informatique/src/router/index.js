import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Qcm from '../components/Qcm.vue'
import Textarea from '../components/Textarea.vue'
import TextTrou from '../components/TextTrou.vue'
import Triage from '../components/Triage.vue'
import Qcm2 from '../components/Qcm2.vue'
import Quiz from '../components/Quiz.vue'
import Dragdrop from '../components/DragDropQuiz.vue'
import quizform from '../components/QuizForm.vue'
const router = createRouter ({
    history : createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },

        {
            path: '/quiz',
            component: Quiz
        },

        {
            path: '/Dragdrop',
            components: quizform, Dragdrop
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