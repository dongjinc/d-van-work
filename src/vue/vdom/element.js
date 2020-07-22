// compiler => optimizer => vdom => dom diff => patch
// dowm parse => optimize => codegen
// prepack
// 1:38:00
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
