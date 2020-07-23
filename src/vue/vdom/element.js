// compiler => optimizer => vdom => dom diff => patch
// dowm parse => optimize => codegen
// prepack
// 1:38:00
//tepmlate => ast => 优化 => 生成 => vdom => diff => patch
class Element  {
    constructor(tagName, attr, childrens){
        this.tagName = tagName;
        this.attr = attr;
        this.childrens = childrens || []
    }
    render(){
        let element = document.createElement(this.tagName)
        element.attribute = this.attr
        this.childrens.forEach(child => {
            let childElement = (child instanceof Element)?child.render() : document.createTextNode(child)
            element.appendChild(childElement)
        })
        return element
    }
}
function createElement(tagName, attr, childrens){
    return new Element(tagName, attr, childrens)
}

/**
 * keep-live
 * 1.抽象组件
 * 2.Object.create(null)
 * 3.自定义实现的组合
 * 4.this.max负责清理组件
 * 5.lru算法清除 prunt oldest entry
 */

 /**
  * Vue.use
  * vue-ts-ioc Vue实现依赖注入
  * 状态机的深入运用
  * 缓存机制 异步队列
  */

  /**
   * core 
   * 数据驱动、组件化、响应式原理
   * 编译
   * parse、optimize、codegen
   * 扩展
   * event、v-model   slot、keep-live   transition
   * 生态
   * vue-router、Vuex
   */
  /**
   * moon库
   */