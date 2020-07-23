function Vue(option){
    this.data = option.data
    var data = this.data
    observe(data, this)
    this.id = option.el
    var dom = new Compile(document.getElementById(this.id), this)
}