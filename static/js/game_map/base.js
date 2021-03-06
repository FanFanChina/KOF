import { GameObject } from "/static/js/game_object/base.js";
import { GameController } from "/static/js/game_controller/base.js";

class GameMap extends GameObject {
  constructor(root) {
    // 使用父类初始化函数
    super();
    // 记录根模块的信息
    this.root = root;
    // 创建canvas画布的jquary对象，并使其可以聚焦，便于读取键盘输入
    this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
    // 获取canvas的上下文context -- ctx
    this.ctx = this.$canvas[0].getContext("2d");
    // 追加到根模块的标签索引$kof中去
    this.root.$kof.append(this.$canvas);
    // 为画布添加焦点事件即focus函数
    this.$canvas.focus();
    // 创建按键存储删除模块
    this.controller = new GameController(this.$canvas);
    // 添加头部html代码
    this.root.$kof.append(
      $(`<div class="kof-head">
        <div class="kof-head-hp-0"><div><div></div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div><div></div></div></div>
    </div>`)
    );

    this.time_left = 30000; // 剩余时间、单位：毫秒
    this.$timer = this.root.$kof.find(".kof-head-timer");
  }
  start() {}
  update() {
    this.time_left -= this.timedelta;
    if (this.time_left < 0) {
      this.time_left = 0;
      let [a, b] = this.root.players;
      if (a.status !== 6 && b.status !== 6) {
        a.status = b.status = 6;
        a.frame_current_cnt = b.frame_current_cnt = 0;
        a.vx = b.vx = 0;
      }
    }
    this.$timer.text(parseInt(this.time_left / 1000));
    this.render();
  }
  // 渲染函数
  render() {
    // 清空所画矩形
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export { GameMap };
