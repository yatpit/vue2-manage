//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
// 引入Element-UI
import ElementUI, { MessageBox, Message } from 'element-ui';
// 引入Element-UI样式文件
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'


import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock.js'

//关闭Vue的生产提示
Vue.config.productionTip = false
Vue.use(ElementUI)
// axios不是插件，想在全局使用，只能绑定在Vue的prototype中
Vue.prototype.$http = http
Vue.prototype.$comfirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导航守卫
router.beforeEach((to, from, next) => {
	//防止页面刷新 token不存在
	store.commit('getToken')
	const token = store.state.user.token
	if(!token && to.name !== 'login'){
		next({name:'login'})
	}else if(token && to.name==='login'){
		next({name:'home'})
	}else{
		next()
	}
})

//创建vm
new Vue({
	el:'#app',
	router,
	store, 
	render: h => h(App),
	created(){
		store.commit('addMenu', router)
	}
})
