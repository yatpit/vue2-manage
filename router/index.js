import Vue from 'vue'
import VueRouter  from 'vue-router'
// import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: ()=>import('../views/MainPage.vue'),
        redirect:'home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/home/homeIndex.vue')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/user/userIndex.vue')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/mall/mallIndex.vue')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../views/other/pageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../views/other/pageTwo.vue')
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component: () => import('../views/login/loginIndex')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router