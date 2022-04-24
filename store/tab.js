import Cookie from 'js-cookie'

export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 当前面包屑高亮显示
        currentMenu: null,
        // 权限控制
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 每次点击菜单时，改变tabsList的数据
        selectMenu(state, val) {
            if(val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1) {
                    state.tabsList.push(val)
                }
            }else{
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val){
            state.menu=val
            Cookie.set('menu', JSON.stringify(val))

        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
         /**
             * 路由组件中的配置不在是写死的  而是根据每个用户访问权限的不同  动态的添加
             * 每个用户登录后可以得到菜单权限列表  对应api\mockServerData\permission.js 中的menu属性但是和
             * 路由配置相比缺少component配置，所以下面的做法是设置component属性
             * 
             */
        addMenu(state, router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray= []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由动态添加
            menuArray.forEach(item=>{
                router.addRoute('Main', item)
            })
        }
    }
}