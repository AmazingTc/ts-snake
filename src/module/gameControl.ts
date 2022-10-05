import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";
class GameControl{
    snake:Snake//蛇
    food:Food//食物
    scorePanel:ScorePanel//记分牌
    direction:string=''//按键方向
    isLive:Boolean=true //是否存活
    constructor() {
        this.snake=new Snake()
        this.food=new Food()
        this.scorePanel=new ScorePanel(10,2)
        this.init()//游戏开始
    }
    init(){//游戏开始
        // 绑定键盘事件,回调函数需要改变this指向为当前键盘事件对象
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
    }
    // 键盘事件回调
    keydownHandler(event:KeyboardEvent){
        // 此处this指向键盘事件e
        this.direction=event.key
    }
    // 控制蛇移动
    run(){
        // 蛇当前位置
        let x=this.snake.X
        let y=this.snake.Y
        // 根据方向修改坐标
        switch (this.direction){
            case "ArrowUp":y-=10
                break;
            case "ArrowDown":y+=10
                break;
            case "ArrowLeft":x-=10
                break;
            case "ArrowRight":x+=10
                break;
        }
        this.checkEat(x,y) //调用方法判断是否吃到食物
            // 修改蛇头坐标
       try{
           this.snake.X=x
           this.snake.Y=y
       }catch (e){//捕获撞墙错误
            // 说明撞墙或者碰撞自己身体
            this.gameOver()
       }
       this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
    }
    // 判断是否吃到食物
    checkEat(x:number,y:number){
        if(x===this.food.x&&y===this.food.y){
            this.food.change()//食物位置改变
            this.scorePanel.addScore()//加分
            this.snake.addBody()//增加长度
        }
    }
    // 游戏结束
    gameOver(){
        this.isLive=false
        let over=document.querySelector('.over')!
        over.innerHTML='GAME OVER'
    }
}
export default GameControl