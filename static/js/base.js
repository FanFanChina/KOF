// 引入地图模块
import { GameMap } from "/static/js/game_map/base.js";
// 引入Koy游戏角色模块
import { Kyo } from "/static/js/game_player/kyo.js";

// KOF游戏模块
class KOF {
  // 使用存放游戏的标签id初始化游戏模块
  constructor(id) {
    // 索引div的标签id为$kof
    this.$kof = $("#" + id);
    // 新建游戏地图模块
    this.$game_map = new GameMap(this);
    // 新建游戏角色模块
    this.$game_players = [
      new Kyo(this, {
        id: 0,
        x: 150,
        y: 0,
        width: 120,
        height: 200,
        color: "lightblue",
      }),
      new Kyo(this, {
        id: 1,
        x: 950,
        y: 0,
        width: 120,
        height: 200,
        color: "red",
      }),
    ];
  }
}

export { KOF };
