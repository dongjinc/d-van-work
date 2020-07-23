function Compile(node, vm){
    if(node){
        this.$frag = this.nodeToFragment(node, vm)
    }
}
Compile.prototype = {
    nodeToFragment(node, vm){
        var frag = document.createDocumentFragment()
        var child;
        while(child = node.firstChild){
            frag.append(child)
        }
        console.log(frag)
    }
}