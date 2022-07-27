import Vue from "vue";
import VueRouter from "vue-router";
import HomePagina from '../views/Home.vue'
import Tocador from '../views/TocadoraVideo.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePagina
        },
        {
            path: '/tocador',
            name: 'TocadoraVideo',
            component: Tocador
        }
    ]
})