import { getCollectables } from '../collectables';
import k from '../kaboom'
import { music_volume } from '../params';
import { getSeeds } from '../seeds';
import { addButton } from '../utils';

class Player {
    constructor(sprite, left_button, right_button, action_button, action, score) {
        this.sprite = sprite;
        this.left_button = left_button;
        this.right_button = right_button;
        this.action_button = action_button;
        this.action = action;
        this.can_move = true;
        this.score = score;
        this.seed = ""; 
        this.counter = 0;
        this.textCounter = "";
        this.icon = null;
        this.pas = play("pas", {paused: true});
        this.harvested = "";
    }
  }


class Tonneau {
    constructor(x){
        this.sprite = null;
        this.seed == "";
        this.x = x;
        this.y = 360;
    }
    newSeed(seed){
        var oldSeed = this.seed;
        if(this.sprite!=null){
            destroy(this.sprite);
            this.sprite = null;
        }
        this.seed = seed;
        this.sprite = k.add([sprite(seeds[this.seed].icon_sprite), pos(this.x, this.y), z(8), scale(0.4), anchor('center')]);
        return oldSeed;
    }
}

export function GameScene({scoreP1, scoreP2, music, music_name, all_months, remaining_months}) {
    const crt_month = remaining_months.shift();
    const crt_month_idx = crt_month-1;
    const part_by_bg = 2;
    const part_width = 1920;
    const time_speed = 100;
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const days_by_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const season_by_months = ["hiver", "hiver", "printemps", "printemps", "printemps", "ete", "ete", "ete", "automne", "automne", "automne", "hiver"];
    const player_speed = 300;
    const player1_left = "q";
    const player1_right = "e";
    const player1_action = "w";
    const player2_left = "j";
    const player2_right = "l";
    const player2_action = "k";
    const player_startX = 130;

    const backgrounds_top = [];
    const backgrounds_bottom = [];

    const to_collect = [];
    const seeds_spawned = [];

    const monthCollectableIcons = [];
    const monthSeedIcons = [];

    var monthSeedChoices = [];

    var tonneau1 = new Tonneau(25);
    var tonneau2 = new Tonneau(75);
    var tonneau3 = new Tonneau(125);

    var sowed_finished = false;
    var do_animation_sow = false;
    var anim_sow_timestamp = 0;
    var anim_harvest_timestamp = 0;


    // add top and bottom background
    for (var part = 1; part <= part_by_bg; part++) {
        backgrounds_top.push(k.add([
            pos((part - 1) * 1920, 0),
            sprite(`bg_${crt_month}_${part}`),
            z(0),
            move(LEFT, time_speed),
        ]));
        backgrounds_bottom.push(k.add([
            pos((part - 1) * 1920, 540),
            sprite(`bg_${crt_month}_${part}`),
            z(0),
            move(LEFT, time_speed)
        ]));
    }
    backgrounds_top[1].flipX=true;
    backgrounds_bottom[1].flipX=true;


    addCollectable = (name, posX) => {
        parent_sprite = collectables[name].parent_sprite
        if (parent_sprite == "arbre"){
            parent_sprite = `arbre_${crt_month_idx+1}`;
        }
        parent = add([pos(posX, 930+collectables[name].deltaY), sprite(parent_sprite), z(3), anchor("bot"), move(LEFT, time_speed)]);
        parent.add([pos(0, 0), sprite(collectables[name].sprite), z(4), anchor("bot")]);
        to_collect.push({name: name, object: parent});
    };

    addSeed = (name, posX) => {
        parent = add([pos(posX, 390+seeds[name].deltaY), sprite(seeds[name].sprite), z(3), anchor("bot"), move(LEFT, time_speed)]);
        seeds_spawned.push(parent);
    };

    collect = (item_to_collect) => {
        idx = to_collect.indexOf(item_to_collect);
        to_collect.splice(idx, 1);
        item_to_collect.object.removeAll();
        return item_to_collect.name;
    }

    canCollect = (posX) => {
        res = null;
        to_collect.forEach((to_collect_item)=>{
            if(posX>to_collect_item.object.pos.x-to_collect_item.object.width/2 && posX<to_collect_item.object.pos.x+to_collect_item.object.width/2){
                res = to_collect_item;
            }
        });
        return res;
    }

    canSow = (posX) => {
        ok = true
        seeds_spawned.forEach((sowed_item)=>{
            if(posX<sowed_item.pos.x+50 && posX>sowed_item.pos.x-50){
                ok = false;
            }
        });
        return ok;
    }

    addTunnel = (x, y, zFront)=>{
        k.add([
            pos(x,y),
            sprite('tunnel_back'),
            anchor('bot'),
            z(0),
            move(LEFT,time_speed),
        ]);
        k.add([
            pos(x,y),
            sprite('tunnel_front'),
            anchor('bot'),
            z(zFront),
            move(LEFT,time_speed),
        ]);
    }

    endOfMonth = ()=>{
        if(remaining_months.length==0){
            music.stop();
            music=null;
            k.go("quiz", {menuMusic: null, scoreP1: player1.score, scoreP2: player2.score, all_months: all_months});
        }else{
            k.go("game", {
                scoreP1: player1.score,
                scoreP2: player2.score,
                music: music,
                music_name: music_name,
                all_months: all_months,
                remaining_months: remaining_months
            });
        }
    }

    loadMonth = ()=>{
        k.add([
            pos(900,392),
            sprite(`arbre_saison_${crt_month}`),
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]).flipX=true;
        k.add([
            pos(900,932),
            sprite(`arbre_saison_${crt_month}`),
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]).flipX = true;
        addTunnel(1800, 392, 5);
        addTunnel(1800, 932, 6);

        if(crt_month>=11 || crt_month <=2){
            addTunnel(2900, 392, 5);
            if(crt_month!=11){
                addTunnel(2900, 932, 6);
            }
        }

        // show icons
        var seedKeys = Object.keys(seeds);
        var nbIcon = 0;
        seedKeys.forEach(key => {
            if(crt_month>=seeds[key].start_month && crt_month<=seeds[key].end_month){
                monthSeedIcons.push(k.add([sprite(seeds[key].icon_sprite), pos(770-Math.floor(nbIcon/2)*45, nbIcon%2==0?510:570), anchor('center'), z(8), scale(0.65)]));
                nbIcon++;
            }
        });
        var collectableKeys = Object.keys(collectables);
        var nbIcon = 0;
        collectableKeys.forEach(key => {
            if(crt_month>=collectables[key].start_month && crt_month<=collectables[key].end_month){
                monthCollectableIcons.push(k.add([sprite(collectables[key].icon_sprite), pos(1150+Math.floor(nbIcon/2)*45, nbIcon%2==0?510:570), anchor('center'), z(8), scale(0.65)]));
                nbIcon++;
            }
        });

        // put collectables
        var arbreCollectables = collectableKeys.filter(key => crt_month>=collectables[key].start_month && crt_month<=collectables[key].end_month && (collectables[key].parent_sprite=="arbre" || collectables[key].parent_sprite=="mais_trou"))
        var otherCollectables = collectableKeys.filter(key => crt_month>=collectables[key].start_month && crt_month<=collectables[key].end_month && collectables[key].parent_sprite!="arbre"  && collectables[key].parent_sprite!="mais_trou")
        if(arbreCollectables.length==0){
            var x = 550;
            while(x<3840){
                addCollectable(otherCollectables.sample(), x);
                x+=100+Math.random()*100;
            }
        }else{
            var x = 550;
            while(x<2300){
                addCollectable(otherCollectables.sample(), x);
                x+=100+Math.random()*100;
            }
            var x = 2400;
            while(x<3840){
                addCollectable(arbreCollectables.sample(), x);
                x+=300+Math.random()*150;
            }
        }

        // put seed icons on tonneaux
        monthSeedChoices = seedKeys.filter(key => crt_month>=seeds[key].start_month && crt_month<=seeds[key].end_month);
        tonneau1.newSeed(monthSeedChoices.sample());
        tonneau2.newSeed(monthSeedChoices.sample());
        tonneau3.newSeed(monthSeedChoices.sample());
        player1.counter = 0;
        player1.seed = "";
    };

    collectables = getCollectables();
    seeds = getSeeds();
 
    player1_sprite = add([pos(player_startX, 395), sprite("player"), z(5), anchor("bot")])
    player1_sprite.play("idle")
    player2_sprite = add([pos(player_startX, 935), sprite("player"), z(5), , anchor("bot")])
    player2_sprite.play("idle")

    player1 = new Player(player1_sprite, player1_left, player1_right, player1_action, "sow",scoreP1);
    player2 = new Player(player2_sprite, player2_left, player2_right, player2_action, "ramasse", scoreP2);
    players = [player1, player2]

    dateText = text("", {font: "Chalkduster"})
    player1ScoreText = text("0", {font: "Chalkduster"})
    player2ScoreText = text("0", {font: "Chalkduster"})
    k.add([dateText, pos(960, 540),  anchor("center"), z(9)])
    k.add([player1ScoreText, pos(85, 440), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([player2ScoreText, pos(85, 980), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([sprite("bandeau"), pos(960, 540), anchor("center"), z(8)])
    k.add([sprite("tonneaux"), pos(84, 530), anchor("bot"), z(7)])
    k.add([sprite("panneau"), pos(84, 350), anchor("bot"), z(6)])
    k.add([sprite("silo"), pos(84,1090), anchor("bot"), z(7)])
    k.add([sprite("recoltes"), pos(1500,590), anchor("top"), z(8)])
    k.add([sprite("semailles"), pos(10,540), anchor("left"), z(8)])

    players.forEach((player)=>{
        player.sprite.onUpdate(() => {
            if(player.sprite.curAnim()=="walk" && player.pas.time()==0){
                player.pas.play();
            }
            if (player.sprite.pos.x < 20) { player.sprite.pos.x = 20 };
            if (player.sprite.pos.x > 1900) { player.sprite.pos.x = 1900 };
            if (player.sprite.curAnim()!="walk" && player.sprite.pos.x>150){player.sprite.move(-time_speed, 0)}
            // destroy all children
            player.sprite.removeAll();
            // create text and icon
            if(player.counter>0){
                player.sprite.add([sprite(seeds[player.seed].icon_sprite), z(18), pos(-15,-150), anchor('bot'), scale(0.5)]);
                var sinVal = (-10)*Math.sin((new Date().getTime()-anim_sow_timestamp)/50);
                player.sprite.add([text("x"+player.counter, {size: 32+(do_animation_sow?sinVal:0), font: "Chalkduster"}),color(0, 0, 0), z(18), pos(10,-150), anchor('botleft')])
                // si on est en train de planter, on change la taille de la font
                if(do_animation_sow && !sowed_finished){
                    if(Math.abs(sinVal)<1){
                        do_animation_sow = false;
                    }
                }
            }
            if(player.action=="ramasse"){
                if(player.harvested!=""){
                    anim_percent = (new Date().getTime()-anim_harvest_timestamp)/800;
                    tmp = player.sprite.add([sprite(collectables[player.harvested].icon_sprite), z(18), pos(0,-150-(40*anim_percent*anim_percent*anim_percent)), anchor('bot'), scale(0.75), opacity(2-anim_percent*anim_percent*2)]);
                }
            }
        });

        onKeyDown(player.left_button, () => {
            if(player.can_move){
                player.sprite.move(-player_speed, 0)
                player.sprite.flipX = true;
                if (player.sprite.curAnim() !== "walk") {
                    player.sprite.play("walk")
                }
            }
        });

        onKeyDown(player.right_button, () => {
            if(player.can_move){
                player.sprite.move(player_speed, 0)
                player.sprite.flipX = false;
                if (player.sprite.curAnim() !== "walk") {
                    player.sprite.play("walk")
                }
            }
        });

        [player.left_button, player.right_button].forEach((key) => {
            onKeyRelease(key, () => {
                if(player.can_move){
                    // Only reset to "idle" if player is not holding any of these keys
                    if (!isKeyDown(player.left_button) && !isKeyDown(player.right_button)) {
                        player.sprite.play("idle")
                    }
                }
            })
        });
    });

    onKeyDown(player1.action_button, () => {
        if(player1.can_move){
            var player_sow = false;
            // check tonneau
            if(player1.sprite.pos.x<50){
                player1.seed = tonneau1.newSeed(monthSeedChoices.sample())
                player1.counter = 5;
            }else if(player1.sprite.pos.x<100){
                player1.seed = tonneau2.newSeed(monthSeedChoices.sample())
                player1.counter = 5;
            }else if(player1.sprite.pos.x<150){
                player1.seed = tonneau3.newSeed(monthSeedChoices.sample())
                player1.counter = 5;
            }else{
                if(player1.counter==0){return}
                if(canSow(player1.sprite.pos.x)==false){return}
                player_sow = true;
            }
            play("graines");
            player1.can_move = false;
            player1.sprite.play(player1.action, {
                loop: false,
                onEnd: () => {
                    player1.sprite.play("idle");
                    if(player_sow){
                        if(player1.seed!=""){
                            player1.counter--;
                            addSeed(player1.seed, player1.sprite.pos.x);
                            player1.score += seeds[player1.seed].points;
                            sowed_finished = true;
                            do_animation_sow = true;
                            anim_sow_timestamp = new Date().getTime();
                            wait(0.2, () => {
                                sowed_finished = false;
                            })
                        }
                    }
                    player1.can_move = true;
                    
                }
            })
        }
    });

    onKeyDown(player2.action_button, () => {
        if(player2.can_move){
            itemToCollect = null;
            itemToCollect = canCollect(player2.sprite.pos.x);
            if(itemToCollect==null){return}
            player2.can_move = false;
            play("pop");
            player2.sprite.play(player2.action, {
                loop: false,
                onEnd: () => {
                    play("swish");
                    player2.sprite.play("idle");
                    collected_name = collect(itemToCollect);
                    player2.score += collectables[collected_name].points;
                    player2.can_move = true;
                    player2.harvested = collected_name;
                    anim_harvest_timestamp = new Date().getTime();
                    wait(0.8, () => {
                        player2.harvested = "";
                    })
                }
            })
        }
    });


    k.onUpdate(() => {
        var time_pos = (backgrounds_top[0].pos.x * -1)
        var day = Math.floor(time_pos / (part_width / days_by_months[crt_month_idx])) + 1;
        dateText.text = `${day} ${months[crt_month_idx]}`
        player1ScoreText.text = `${player1.score}`
        player2ScoreText.text = `${player2.score}`

        if (day > days_by_months[crt_month_idx]) {
            endOfMonth();
        }
    })

    loadMonth();
    if(music!=null && music_name!=season_by_months[crt_month_idx]){
        music.stop();
        music = null;
    }
    if(music==null){
        music = play(season_by_months[crt_month_idx], {
            loop: true, volume: music_volume
        });
        music_name = season_by_months[crt_month_idx];
    }

    addButton("", 3, vec2(1850, 50), ()=>{
        music.stop();
        k.go("start", {menuMusic: null});
    });
}