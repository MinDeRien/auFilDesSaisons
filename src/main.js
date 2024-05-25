import k from './kaboom'
import { GameScene } from "./scenes/game";
import { StartScene } from './scenes/start';
import { LoadAssets } from './assets_load';
import { QuizScene } from './scenes/quiz';

LoadAssets();

k.scene("game", GameScene);
k.scene("start", StartScene);
k.scene("quiz", QuizScene);

k.go("start")