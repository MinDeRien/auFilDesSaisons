import k from '../kaboom'
import { addButton } from '../utils';

export function StartScene() {


    addButton("Start", vec2(960, 800), ()=>k.go("game", {year: 1, scoreP1: 0, scoreP2: 0, music: null}));
}