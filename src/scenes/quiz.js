import k from '../kaboom'
import { addButton } from '../utils';

export function QuizScene() {
    addButton("Retour au menu", vec2(960, 800), ()=>k.go("start"));
}