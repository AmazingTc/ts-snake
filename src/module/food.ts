// 定义foot类
class Food{
    private _element:HTMLElement;//食物所表示的元素
    constructor() {
        // 获取页面中的食物且赋值给element
        this._element=document.getElementById('food')!
    }
    //获取食物x坐标
    get x(){
        return this._element.offsetLeft
    }
    // 获取食物y轴坐标
    get y(){
        return this._element.offsetTop
    }
    change(){
        // 生成随机位置
        // x轴范围：0-290 y轴范围：0-290 ,且一次移动 10,所以必须为10的整数
        let x=Math.round(Math.random()*29)*10
        let y=Math.round(Math.random()*29)*10
        // Math.floor(Math.random()*30)*10
        this._element.style.left=`${x}px`
        this._element.style.top=`${y}px`
        setInterval(()=>{
            this.change()
        },6000)
    }
}
export default Food