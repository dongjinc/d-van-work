function defineReactive(vm, key, val){
    var dep = new Dep()
    Object.defineProperty(vm, key, {
        get(){
            console.log(Dep.target)
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val
        },
        set(newVal){
            if(newVal === val) return false
            val = newVal
            console.log('通知')
            dep.notify()
        }
    })
} 
function observe(obj, vm){
    Object.keys(obj).forEach(key => {
        defineReactive(vm, key,obj[key]);
    })
}