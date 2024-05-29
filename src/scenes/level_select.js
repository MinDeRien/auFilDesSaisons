import k from '../kaboom'
import { music_volume } from '../params';
import { addButton } from '../utils';
export function LevelSelectScene({menuMusic}) {
    if(menuMusic==null){
        menuMusic = play("all", {loop: true, volume: music_volume})
    }

    k.add([sprite("level_select_screen")]);

    seasons = [[12,1,2], [3,4,5], [6,7,8], [9,10,11]]

    addButton("", "hiver", vec2(1720,275), ()=>{startGame(seasons[0])});
    addButton("", "printemps", vec2(1720,425), ()=>{startGame(seasons[1])});
    addButton("", "ete", vec2(1720,575), ()=>{startGame(seasons[2])});
    addButton("", "automne", vec2(1720,725), ()=>{startGame(seasons[3])});
    addButton("", "random", vec2(1720,875), ()=>{startGame(seasons.sample())});

    startGame = (months) => {
        if(menuMusic!=null){
            menuMusic.stop();
            menuMusic=null;
        }
        k.go("game", {scoreP1: 0, scoreP2: 0, music: null, all_months: [...months], remaining_months: [...months]});
    }

    addButton("", 3, vec2(1825, 1025), ()=>{
        k.go("start", {menuMusic: menuMusic});
    });
}