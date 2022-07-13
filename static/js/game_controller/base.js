class GameController{
    constructor($canvas){
        this.$canvas = $canvas;
        this.pressed_key = new Set();
        this.start();
    }
    start(){
        let outer = this;
        this.$canvas.keydown(function(e){
            outer.pressed_key.add(e.key);
            // console.log(outer.pressed_key);
        });
        this.$canvas.keyup(function(e){
            outer.pressed_key.delete(e.key);
        });
    }

}

export {
    GameController
}