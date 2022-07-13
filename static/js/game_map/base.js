import { GameObject } from "/static/js/game_object/base.js";
import {GameController} from "/static/js/game_controller/base.js"

class GameMap extends GameObject {
  constructor(root) {
    super();
    this.root = root;
    // 创建canvas，并使其可以聚焦，便于读取键盘输入
    this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
    this.ctx = this.$canvas[0].getContext("2d");
    this.root.$kof.append(this.$canvas);
    this.$canvas.focus();
    this.controller = new GameController(this.$canvas)
  }
  start() {}
  update() {
    this.render();
  }
  // 渲染函数
  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export { GameMap };
