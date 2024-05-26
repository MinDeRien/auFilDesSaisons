import k from '../kaboom'
import { music_volume } from '../params';
import { addButton } from '../utils';
export function StartScene({menuMusic}) {
    if(menuMusic==null){
        menuMusic = play("all", {loop: true, volume: music_volume})
    }

    k.add([sprite("title_screen")]);

    addButton("Jouer", 1, vec2(1700, 675), ()=>{
        if(menuMusic!=null){
            menuMusic.stop();
            menuMusic=null;
        }
        k.go("game", {year: 1, scoreP1: 0, scoreP2: 0, music: null});
    });

    k.onUpdate(()=>{
        if(menuMusic!=null && menuMusic.time()==0){
            menuMusic.stop();
            menuMusic.play();
        }
    });

    addButton("Crédits", 2, vec2(1700, 900), ()=>{
        k.go("credits", {menuMusic: menuMusic});
    });
}