// 按键控制模块
class GameController{
    // 使用画布jquary对象初始化控制模块（一般都是父亲初始化儿子）
    constructor($canvas){
        this.$canvas = $canvas;
        // 定义存储按键的Set
        this.pressed_key = new Set();

        this.start();
    }
    start(){
        let outer = this;
        // 存储按键
        this.$canvas.keydown(function(e){
            outer.pressed_key.add(e.key);
        });
        // 删除按键
        this.$canvas.keyup(function(e){
            outer.pressed_key.delete(e.key);
        });
    }

}

export {
    GameController
}