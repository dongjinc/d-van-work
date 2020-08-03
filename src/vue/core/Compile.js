function Compile(node, vm){
    if(node){
        this.$frag = this.nodeToFragment(node, vm)
        return this.$frag
    }
}
Compile.prototype = {
    nodeToFragment(node, vm){
        var frag = document.createDocumentFragment()
        var child;
        while(child = node.firstChild){
            this.compileElement(child, vm)
            frag.append(child)
        }
        return frag
    },
    compileElement(node, vm){
        const reg = /\{\{(.*)\}\}/
        /**
         * input
         */
        if(node.nodeType === 1){
            const attr = node.attributes; // NameNodeMap
            for(let i = 0;i < attr.length; i++){
                /**
                 * attr[i] type="text"
                 * attr[i].nodeName = type
                 * attr[i].nodeValue = "text"
                 */
                if(attr[i].nodeName === 'v-model'){
                    // console.log(attr[i].nodeValue, 'attr')
                    const nodeValue = attr[i].nodeValue // 获取v-model绑定的属性值
                    node.addEventListener('input', (e) => {
                        // 给响应的data属性赋值，触发该属性set方法
                        vm[nodeValue] = e.target.value
                    })
                    new Watcher(vm, node, nodeValue, 'value')
                }
            }
        }
        /**
         * 节点类型 text
         */
        if(node.nodeType === 3){
            if(reg.test(node.nodeValue)){
                let name = RegExp.$1
                name = name.trim()
                new Watcher(vm, node, name, 'nodeValue')
            }
        }
    }
}