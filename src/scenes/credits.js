import k from '../kaboom'
import { music_volume } from '../params';
import { addButton } from '../utils';

export function CreditsScene({menuMusic}) {
    if(menuMusic==null){
        menuMusic = play("all",  {loop: true, volume: music_volume})
    }

    k.add([sprite("credits_screen")]);

    var creditText = `
    Game design: Gwenäelle Barillon

    Programmation: Damien Goetschi 
                    et Gwenäelle Barillon
    
    Game Art: Gwenäelle Barillon

    Animation: Gwenäelle Barillon
    
    Image du début, de fin, et paysan de profil basés
    sur des images générées par Midjourney
    
    Icones: Freepik via flaticon.com
    
    Musiques: pack Season Cycle par Steve Base Music sur itch.io

    Effets sonores: pixabay.com et opengameart.com,
                        puis édités par Gwenäelle Barillon
    
    Informations arbres fruitiers: Arbothévoz
    
    Tout mon amour à la Swiss Game Academy, sans qui je n'aurais
    jamais commencé à créer des jeux <3
    
    Jeu réalisé durant le cours "Développement de Jeu vidéo 2D"
    Encadré par Isaac Pante et Johan Cuda

    Unil (Université de Lausanne), semestre de printemps 2024`

    k.add([text(creditText, {size: 32, font: "indieflower"}), color(rgb(0,0,0)), pos(980, 80), anchor("top")])

    addButton("Menu", 1, vec2(225, 900), ()=>k.go("start", {menuMusic: menuMusic}));
}