import k from '../kaboom'
import { music_volume } from '../params';
import { addButton } from '../utils';

export function EndScene({menuMusic, scoreP1, scoreP2}) {
    if(menuMusic==null){
        menuMusic = play("all",  {loop: true, volume: music_volume})
    }
    k.add([sprite("end_screen")]);
    addButton("Rejouer", 1, vec2(760, 950), ()=>k.go("level_select", {menuMusic: menuMusic}));
    addButton("Menu", 2, vec2(1160, 950), ()=>k.go("start", {menuMusic: menuMusic}));

    k.add([text("Score:", {size: 96, font: "Chalkduster"}), color(rgb(0,0,0)), pos(100, 200), z(3), anchor("left")]);
    k.add([text(`${Math.round(scoreP1+scoreP2)}`, {size: 72, font: "indieflower"}), scale(2), color(rgb(0,0,0)), pos(1300, 600), z(3), anchor("right")])
}