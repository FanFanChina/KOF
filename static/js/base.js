import { GameMap } from "/static/js/game_map/base.js";
import { Kyo } from "/static/js/game_player/kyo.js";

class KOF {
  constructor(id) {
    this.$kof = $("#" + id);
    this.$game_map = new GameMap(this);
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
