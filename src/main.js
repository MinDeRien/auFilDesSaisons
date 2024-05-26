import k from './kaboom'
import { GameScene } from "./scenes/game";
import { StartScene } from './scenes/start';
import { LoadAssets } from './assets_load';
import { QuizScene } from './scenes/quiz';
import { CreditsScene } from './scenes/credits';
import { EndScene } from './scenes/end';

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

LoadAssets();

k.scene("game", GameScene);
k.scene("start", StartScene);
k.scene("quiz", QuizScene);
k.scene("credits", CreditsScene);
k.scene("end", EndScene);

k.go("start", {menuMusic: null})