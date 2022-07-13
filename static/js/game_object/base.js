let GAME_OBJECTS = []
class GameObject{
    constructor(){
        GAME_OBJECTS.push(this);
        this.timedelta = 0;           // 两帧之间的时间间隔
        this.has_call_start = false;  // 记录是否初始化
    }
    start(){ // 初始执行一次

    }
    update(){ // 每一帧执行一次，除了第一帧

    }
    destroy(){
        for(let i in GAME_OBJECTS){
            if(GAME_OBJECTS[i] === this)
            GAME_OBJECTS.splice(i, 1);
            break;
        }
    }
}

let last_timestamp; // 上一帧的时间
function GAME_OBJECTS_FRAME(timestamp)
{
    for(let obj of GAME_OBJECTS){
        if(!obj.has_call_start) {
            obj.has_call_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(GAME_OBJECTS_FRAME);
}

requestAnimationFrame(GAME_OBJECTS_FRAME);

export {
    GameObject
}