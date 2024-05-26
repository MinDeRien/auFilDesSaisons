import { getCollectables } from '../collectables';
import k from '../kaboom'
import { music_volume } from '../params';
import { getSeeds } from '../seeds';
import { Collectable } from '../types';
import { addButton } from '../utils';

class QuizQuestion{
    constructor(name, months, icon){
        this.name = name;
        this.months = months;
        this.icon = icon;
        this.month_question = Math. floor(Math. random()*12) + 1;
        this.correct_answer = this.months.has(this.month_question);
        this.user_answer = null;
        this.user_bonus = 1;
    }
}

export function QuizScene({menuMusic, scoreP1, scoreP2}) {

    const months_labels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    var seeds = getSeeds();
    var seedsKeys = Object.keys(seeds);
    var selectedSeed = seedsKeys.sample();
    var seedName = selectedSeed;
    var seedMonths = new Set();
    for(let i=seeds[selectedSeed].start_month; i<=seeds[selectedSeed].end_month; i++){
        seedMonths.add(i);
    }
    if(selectedSeed.slice(-1)>='1' && selectedSeed.slice(-1)<=9){
        seedName = selectedSeed.slice(0,-1);
        seedMonths = new Set();
        for(let i=1; i<=9; i++){
            let tmpname = seedName+i;
            if(tmpname in seeds){
                for(let j=seeds[tmpname].start_month; j<=seeds[tmpname].end_month;j++){
                    seedMonths.add(j);
                }
            }
        }
    }
    if (seedName == "chouBruxelles"){
        seedName = "chou de bruxelles";
    }
    var questionP1 = new QuizQuestion(seedName, seedMonths);

    var collectables = getCollectables();
    var collectablesKeys = Object.keys(collectables);
    var selectedCollectable = collectablesKeys.sample();
    var collectableName = selectedCollectable;
    var collectableMonths = new Set();
    for(let i=collectables[selectedCollectable].start_month; i<=collectables[selectedCollectable].end_month;i++){
        collectableMonths.add(i);
    }
    if(selectedCollectable.slice(-1)>='1' && selectedCollectable.slice(-1)<=9){
        collectableName = selectedCollectable.slice(0,-1);
        collectableMonths = new Set();
        for(let i=1; i<=9; i++){
            let tmpname = collectableName+i;
            if(tmpname in collectables){
                for(let j=collectables[tmpname].start_month; j<=collectables[tmpname].end_month;j++){
                    collectableMonths.add(j);
                }
            }
        }
    }
    if (collectableName == "chouBruxelles"){
        collectableName = "chou de bruxelles";
    }
        
    var questionP2 = new QuizQuestion(collectableName, collectableMonths);

    user1_response = (response)=>{
        questionP1.user_answer = response;
        destroy(quizp1);
        if(questionP1.correct_answer == questionP1.user_answer){
            k.add([sprite("quiz_juste"), pos(960, 300), anchor("center"), z(2), scale(0.5)]);
            play("victoire")
            questionP1.user_bonus = 2;
        }else{
            k.add([sprite("quiz_faux"), pos(960, 300), anchor("center"), z(2), scale(0.5)]);
            play("defaite")
            questionP1.user_bonus = 0.5;
        }
        if(questionP2.user_answer!=null){
            wait(3, () => {
                k.go("end", {scoreP1: scoreP1*questionP1.user_bonus, scoreP2: scoreP2*questionP2.user_bonus, menuMusic: menuMusic});
            })
        }
    }

    user2_response = (response)=>{
        questionP2.user_answer = response;
        destroy(quizp2);
        if(questionP2.correct_answer == questionP2.user_answer){
            k.add([sprite("quiz_juste"), pos(960, 850), anchor("center"), z(2), scale(0.5)]);
            play("victoire")
            questionP2.user_bonus = 2;
        }else{
            k.add([sprite("quiz_faux"), pos(960, 850), anchor("center"), z(2), scale(0.5)]);
            questionP2.user_bonus = 0.5;
            play("defaite")
        }
        if(questionP1.user_answer!=null){
            wait(3, () => {
                k.go("end", {scoreP1: scoreP1*questionP1.user_bonus, scoreP2: scoreP2*questionP2.user_bonus, menuMusic: menuMusic});
            })
        }
    }



    if(menuMusic==null){
        menuMusic = play("all",  {loop: true, volume: music_volume})
    }
    k.add([sprite("quiz_screen")]);
    k.add([text(`Peut on planter ${questionP1.name} en ${months_labels[questionP1.month_question-1]} ?`, {font: "chalkboard", size: 54, lineSpacing: 30}), color(rgb(0,0,0)), pos(960, 125), anchor("center"), z(4)]);
    var quizp1 = k.add([sprite("player1_quiz"), pos(960, 300), anchor("center"), z(2)]);

    k.add([text(`Peut on recolter ${questionP2.name} en ${months_labels[questionP2.month_question-1]} ?`, {font: "chalkboard", size: 54}), color(rgb(0,0,0)), pos(960, 675), anchor("center"), z(4)]);
    var quizp2 = k.add([sprite("player2_quiz"), pos(960, 850), anchor("center"), z(2)]);

    onKeyDown("a", () => {
        if(questionP1.user_answer==null){
            user1_response(true);
        }
    });

    onKeyDown("d", () => {
        if(questionP1.user_answer==null){
            user1_response(false);
        }
    });

    onKeyDown("j", () => {
        if(questionP2.user_answer==null){
            user2_response(true);
        }
    });

    onKeyDown("l", () => {
        if(questionP2.user_answer==null){
            user2_response(false);
        }
    });
}