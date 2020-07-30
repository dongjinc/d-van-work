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

class HistoryRoute {
    routes = {}
    getPath(){
        const path = window.location.pathname
        return path || '/'
    }
    initPath(path){
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
            const path = this.getPath()
            this.routes[path] && this.routes[path]()
        })
    }
}

const Router = new HistoryRoute()
