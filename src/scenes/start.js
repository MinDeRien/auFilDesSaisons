import k from '../kaboom'
import { music_volume } from '../params';
import { addButton } from '../utils';
export function StartScene({menuMusic}) {
    if(menuMusic==null){
        menuMusic = play("all", {loop: true, volume: music_volume})
    }

    k.add([sprite("start_screen")]);

    addButton("Jouer", 1, vec2(1200, 950), ()=>{
        k.go("level_select", {menuMusic: menuMusic});
    });

    k.onUpdate(()=>{
        if(menuMusic!=null && menuMusic.time()==0){
            menuMusic.stop();
            menuMusic.play();
        }
    });

    addButton("Crédits", 2, vec2(1650, 950), ()=>{
        k.go("credits", {menuMusic: menuMusic});
    });
}