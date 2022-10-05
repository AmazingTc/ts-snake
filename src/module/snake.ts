class Snake{
    element:HTMLElement
    head:HTMLElement//头部
    body:HTMLCollection//身体（所有）
    constructor() {
        this.element=document.querySelector("#snake")!
        this.head=document.querySelector('#snake>div')!//获取蛇头
        this.body=this.element.getElementsByTagName('div')//获取整个蛇
    }
    get X(){//获取蛇头x坐标
        return this.head.offsetLeft
    }
    get Y(){//获取蛇头Y坐标
        return this.head.offsetTop
    }
    set X(value){
        if(this.X===value) return
        if(value<0||value>290){//判断x坐标是否在合法范围
            throw new Error('你G了')
            // 撞墙
        }
        if(this.body[1]&&(this.body[1] as HTMLElement).offsetLeft===value){
            if(value>this.X){
               // 新值大于旧值,说明在往右走,此时发生了掉头,应该让他继续向左
                value=this.X-10
            }else{
                value=this.X+10
            }
        }
        this.moveBody()
        this.head.style.left=value+'px'
        this.checkHeadBody()
    }
    set Y(value){
        if(this.Y===value) return
        if(value<0||value>290){ //判断y坐标是否在合法范围
            throw new Error('你G了')
            // 撞墙
        }
        if(this.body[1]&&(this.body[1] as HTMLElement).offsetTop===value){
            if(value>this.Y){
                // 新值大于旧值,说明在往右走,此时发生了掉头,应该让他继续向左
                value=this.Y-10
            }else{
                value=this.Y+10
            }
        }
        this.moveBody()
        this.head.style.top=value+'px'
        this.checkHeadBody()
    }
    // 增加长度
    addBody(){
        // 向element中添加div
        this.element.insertAdjacentHTML("beforeend",'<div></div>')//结束标签之前位置插入
    }
    // 身体移动
    moveBody(){
        // 将后面的身体设置为前面身体的位置
        // 遍历获取所有身体
        for(let i=this.body.length-1;i>0;i--){ //从后往前设置(蛇头除外)
            // 获取前面的身体
            let X=(this.body[i-1]as HTMLElement).offsetLeft;
            let Y=(this.body[i-1]as HTMLElement).offsetTop;
            // 将前面的身体坐标赋值到当前设置的身体
            (this.body[i]as HTMLElement).style.left=X+'px';
            (this.body[i]as HTMLElement).style.top=Y+'px';
        }
    }
    // 检查自身是否碰撞
    checkHeadBody(){
        // 获取所有身体,检查是否和蛇头坐标发生重叠
        for(let i=1;i<this.body.length;i++){
            let bd=this.body[i]as HTMLElement
            if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
                // 蛇头碰撞身体
                throw new Error('撞到自己了')
            }
        }
    }


}
export default Snake