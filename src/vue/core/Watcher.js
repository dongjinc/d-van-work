let uid = 0;
function Watcher(vm, node, name, type){
    Dep.target = this
    this.name = name
    this.id = ++uid
    this.node = node // 当前节点
    this.vm = vm // vm
    this.type = type // nodeValue
    this.update()
    Dep.target = null
}
Watcher.prototype = {
    update(){
        this.get()
        /**
         * 节点的值进行修改
         */
        this.node[this.type] = this.value
        /**
         * Batcher是异步批量处理任务队列，三个方法 push - 进入队列 flush - 批量出队列，批量执行 reset - 重置队列
         */
        // if(!batcher){
        //     batcher = new Batcher()
        // }
        
    },
    get(){
        this.value = this.vm[this.name]
    }
}