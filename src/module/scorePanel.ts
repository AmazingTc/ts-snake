class ScorePanel{
    score:number=0
    level:number=1
    scoreEle:HTMLElement //分数元素
    levelEle:HTMLElement//等级元素
    maxLevel:number//最高等级
    levelScore:number //升级需要分数
    constructor(maxLevel:number=10,levelScore:number=10) {
        this.scoreEle=document.getElementById('score')!
        this.levelEle=document.getElementById('level')!
        this.maxLevel=maxLevel
        this.levelScore=levelScore
    }
    // 加分
    addScore(){
        this.score++
        this.scoreEle.innerHTML=this.score+''
        // 判断分数
        if(this.score%this.levelScore===0){
            this.levelUp()
        }
    }
    // 升级
    levelUp(){
        if(this.level<this.maxLevel){ //等级限制
            this.level++
            this.levelEle.innerHTML=this.level+''
        }
    }
}
export default ScorePanel