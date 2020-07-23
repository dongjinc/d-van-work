function Dep(){
    this.subs = []
}
Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub)
    },
    notify(){
        this.subs.forEach(sub => sub.update())
    }
}