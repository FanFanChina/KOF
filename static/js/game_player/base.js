import { GameObject } from "../game_object/base.js";

class GamePlayer extends GameObject {
  constructor(root, info) {
    super();
    this.root = root;

    this.id = info.id;
    this.x = info.x;
    this.y = info.y;
    this.width = info.width;
    this.height = info.height;
    this.color = info.color;

    this.vx = 0;
    this.vy = 0;

    this.speedx = 400; // 水平速度
    this.speedy = -1000; // 跳跃速度

    this.gravity = 50;
    this.direction = 1;
    this.status = 3; // 1: idle, 2: 向前, 3: 向后, 4: 平A, 5: 被A, 6: dead

    this.pressed_key = this.root.$game_map.controller.pressed_key;
    this.ctx = this.root.$game_map.ctx;

    this.animations = new Map(); // 存放角色动作
    this.frame_current_cnt = 0; // 当前记录了多少帧
    this.hp = 100;
  }

  start() {}

  update_control() {
    let w, a, d, space, enter;
    if (this.id === 0) {
      w = this.pressed_key.has("w");
      a = this.pressed_key.has("a");
      d = this.pressed_key.has("d");
      space = this.pressed_key.has(" ");
    } else {
      w = this.pressed_key.has("ArrowUp");
      a = this.pressed_key.has("ArrowLeft");
      d = this.pressed_key.has("ArrowRight");
      space = this.pressed_key.has("Enter");
    }
    if (this.status === 0 || this.status === 1) {
      if (space) {
        this.status = 4;
        this.vx = 0;
        this.frame_current_cnt = 0;
      } else if (w) {
        if (d) {
          this.vx = this.speedx;
        } else if (a) {
          this.vx = -this.speedx;
        } else {
          this.vx = 0;
        }
        this.vy = this.speedy;
        this.status = 3;
        this.frame_current_cnt = 0;
      } else if (d) {
        this.vx = this.speedx;
        this.status = 1;
      } else if (a) {
        this.vx = -this.speedx;
        this.status = 1;
      } else {
        this.vx = 0;
      }
    }
  }

  update_move() {
    this.vy += this.gravity;
    this.x += (this.vx * this.timedelta) / 1000;
    this.y += (this.vy * this.timedelta) / 1000;
    if (this.y > 450) {
      this.y = 450;
      this.vy = 0;
      if (this.status === 3) this.status = 0;
    }
    // 防止越界
    if (this.x < 0) this.x = 0;
    else if (this.x + this.width > this.root.$game_map.$canvas.width())
      this.x = this.root.$game_map.$canvas.width() - this.width;
  }

  update_direction() {
    if (this.status === 6) return;
    let player = this.root.$game_players;
    if (player[0] && player[1]) {
      let me = this,
        you = player[1 - this.id];
      if (me.x < you.x) me.direction = 1;
      else me.direction = -1;
    }
  }

  is_collision(r1, r2) {
    if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2)) return false;
    if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2)) return false;
    return true;
  }

  is_attack() {
    if (this.status === 6) return;
    this.status = 5;
    this.frame_current_cnt = 0;
    this.frame_current_cnt = 0;
    this.hp = Math.max(0, this.hp - 10);
    if (this.hp <= 0) {
      this.status = 6;
      this.frame_current_cnt = 0;
    }
  }

  update_attack() {
    if (this.status === 4 && this.frame_current_cnt === 16) {
      let me = this,
        you = this.root.$game_players[1 - this.id];
      let r1, r2;
      if (this.direction > 0) {
        r1 = {
          x1: me.x + 120,
          y1: me.y + 40,
          x2: me.x + 120 + 100,
          y2: me.y + 40 + 20,
        };
      } else {
        r1 = {
          x1: me.x + me.width - 120 - 100,
          y1: me.y + 40,
          x2: me.x + me.width - 120 - 100 + 100,
          y2: me.y + 40 + 20,
        };
      }
      r2 = {
        x1: you.x,
        y1: you.y,
        x2: you.x + you.width,
        y2: you.y + you.height,
      };

      if (this.is_collision(r1, r2)) {
        you.is_attack();
      }
    }
  }

  update() {
    this.update_control();
    this.update_move();
    this.update_direction();
    this.update_attack();
    this.render();
  }

  render() {
    let status = this.status;

    if (status === 1 && this.direction * this.vx < 0) status = 2;

    let obj = this.animations.get(status);
    if (obj && obj.loaded) {
      if (this.direction > 0) {
        let k =
          parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
        let image = obj.gif.frames[k].image;
        this.ctx.drawImage(
          image,
          this.x,
          this.y + obj.offset_y,
          image.width * obj.scale,
          obj.scale * image.height
        );
      } else {
        this.ctx.save();

        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.root.$game_map.$canvas.width(), 0);
        let k =
          parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
        let image = obj.gif.frames[k].image;
        this.ctx.drawImage(
          image,
          this.root.$game_map.$canvas.width() - this.x - this.width,
          this.y + obj.offset_y,
          image.width * obj.scale,
          obj.scale * image.height
        );

        this.ctx.restore();
      }
    }
    if (status === 4 || status === 5 || status === 6) {
      if (this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1)) {
        if (status === 6) {
          this.frame_current_cnt--;
        } else {
          this.status = 0;
        }
      }
    }
    this.frame_current_cnt++;
  }
}

export { GamePlayer };
