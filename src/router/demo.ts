// @ts-nocheck
// https://www.cnblogs.com/tugenhua0707/p/10859214.html
// class HashRouter {
//     routes = {}
//     currentHash = ''
//     route(path, callback){
//         this.routes[path] = callback || function(){}
//     }
//     hashChangeUrl(){
//         this.currentHash = location.hash.slice(1) || '/'
//         this.routes[this.currentHash]()
//     }
//     constructor(){
//         // this.hashChangeUrl = this.hashChangeUrl.bind(this)
//         console.log(this)
//         window.addEventListener('load', this.hashChangeUrl.bind(this), false)
//         window.addEventListener('hashchange', this.hashChangeUrl.bind(this), false)
//     }
// }
// const Router = new HashRouter()
// const body = document.getElementById('app')
// const changeTitle = (title) => {
//     body.innerHTML = title
// }
// Router.route('/', () => {
//     changeTitle('首页')
// })
// Router.route('/b', () => {
//     console.log(Router.routes)
//     changeTitle('b')
// })

class History{
    routes = {}
    getRouter(){
        const path = window.location.pathname
        return path || '/'
    }
    initRouter(path){
        history.replaceState('', '', path)
        this.routes[path] && this.routes[path]()
    }
    go(path){
        history.pushState('', '', path)
        this.routes[path] && this.routes[path]()
    }
    route(path, callback){
        this.routes[path] = callback || function(){}
    }
    constructor(){
        window.addEventListener('popstate', () => {
            const path = this.getRouter()
            this.routes[path] && this.routes[path]()
        })
    }
}
const router = new History()
const dom = document.getElementById('app')
function changeTitle(title){
    dom.innerHTML = title
}
router.route('/', () => {
    changeTitle('首页')
})
router.route('/one', () => {
    changeTitle('第一页')
})
router.route('/two', () => {
    changeTitle('第二页')
})
router.initRouter(window.location.pathname)
const ul = document.querySelector('ul')
ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
        e.preventDefault()
        router.go(e.target.getAttribute('href'))
    }
})
