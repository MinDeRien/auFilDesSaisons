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

export function GameScene({year, scoreP1, scoreP2, music}) {
    const nb_years = 1;
    const bg_nb = 12;
    const part_by_bg = 2;
    const part_width = 1920;
    const time_speed = 100;
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const days_by_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const player_speed = 300;
    const month_bg_width = part_by_bg * part_width;
    const player1_left = "a";
    const player1_right = "d";
    const player1_action = "f";
    const player2_left = "j";
    const player2_right = "l";
    const player2_action = "h";
    const player_startX = 130;

    const backgrounds_top = [];
    const backgrounds_bottom = [];

    const to_collect = [];
    const collectables_spawned = [];
    const seeds_spawned = [];

    const arbres_saison = [];
    const tunnels = []

    const monthCollectableIcons = [];
    const monthSeedIcons = [];

    var monthSeedChoices = [];

    var tonneau1 = new Tonneau(25);
    var tonneau2 = new Tonneau(75);
    var tonneau3 = new Tonneau(125);

    var crtMonthIdx = 0;

    // add top and bottom background
    for (var i = 1; i <= bg_nb; i++) {
        for (var part = 1; part <= part_by_bg; part++) {
            backgrounds_top.push(k.add([
                pos((i - 1) * 3840 + (part - 1) * 1920, 0),
                sprite(`bg_${i}_${part}`),
                z(0),
                move(LEFT, time_speed),
            ]));
            backgrounds_bottom.push(k.add([
                pos((i - 1) * 3840 + (part - 1) * 1920, 540),
                sprite(`bg_${i}_${part}`),
                z(0),
                move(LEFT, time_speed)
            ]));
        }
    }
    for(var i = 1; i<= bg_nb*2; i+=2){
        backgrounds_top[i].flipX=true;
        backgrounds_bottom[i].flipX=true;
    }


    addCollectable = (name, posX) => {
        parent_sprite = collectables[name].parent_sprite
        if (parent_sprite == "arbre"){
            parent_sprite = `arbre_${crtMonthIdx+1}`;
        }
        parent = add([pos(posX, 930+collectables[name].deltaY), sprite(parent_sprite), z(3), anchor("bot"), move(LEFT, time_speed)]);
        parent.add([pos(0, 0), sprite(collectables[name].sprite), z(4), anchor("bot")]);
        to_collect.push({name: name, object: parent});
        collectables_spawned.push(parent);
    };

    addSeed = (name, posX) => {
        parent = add([pos(posX, 390+seeds[name].deltaY), sprite(seeds[name].sprite), z(3), anchor("bot"), move(LEFT, time_speed)]);
        seeds_spawned.push(parent);
    };

    collect = (item_to_collect) => {
        idx = to_collect.indexOf(item_to_collect);
        console.log(idx);
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

    addTunnel = (x, y, zFront)=>{
        tunnels.push(k.add([
            pos(x,y),
            sprite('tunnel_back'),
            anchor('bot'),
            z(0),
            move(LEFT,time_speed),
        ]));
        tunnels.push(k.add([
            pos(x,y),
            sprite('tunnel_front'),
            anchor('bot'),
            z(zFront),
            move(LEFT,time_speed),
        ]));
    }

    newMonth = (monthIdx)=>{ // monthIdx from 0 to 11
        if(monthIdx==12){
            if(year<nb_years){
                k.go("game", {
                    year: year+1,
                    scoreP1: player1.score,
                    scoreP2: player2.score,
                    music: music
                });
            }else{
                music.stop();
                music=null;
                k.go("quiz", {menuMusic: null, scoreP1: player1.score, scoreP2: player2.score});
            }
            return;
        };
        // clear old month
        crtMonthIdx = monthIdx;
        collectables_spawned.forEach(obj => {
            destroy(obj);
        });
        collectables_spawned.splice(0, collectables_spawned.length);
        seeds_spawned.forEach(obj => {
            destroy(obj);
        });
        seeds_spawned.splice(0, seeds_spawned.length);
        to_collect.splice(0, to_collect.length);
        arbres_saison.forEach(obj => {
            destroy(obj);
        });
        arbres_saison.splice(0, arbres_saison.length);
        tunnels.forEach(obj => {
            destroy(obj);
        });
        tunnels.splice(0, tunnels.length);
        monthSeedIcons.forEach(obj=>{
            destroy(obj);
        });
        monthSeedIcons.splice(0, monthSeedIcons.length);
        monthCollectableIcons.forEach(obj=>{
            destroy(obj);
        });
        monthCollectableIcons.splice(0, monthCollectableIcons.length);
        
        // generate new month
        arbre_saison1=k.add([
            pos(900,392),
            sprite(`arbre_saison_${monthIdx+1}`), // +1 to have month from 1 to 12
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]);
        arbre_saison1.flipX = true;
        arbres_saison.push(arbre_saison1);
        arbre_saison2=k.add([
            pos(900,932),
            sprite(`arbre_saison_${monthIdx+1}`),
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]);
        arbre_saison2.flipX = true;
        arbres_saison.push(arbre_saison2);
        addTunnel(1800, 392, 5);
        addTunnel(1800, 932, 6);

        if(monthIdx>=10 || monthIdx <=1){
            addTunnel(2900, 392, 5);
            if(monthIdx!=10){
                addTunnel(2900, 932, 6);
            }
        }

        // show icons
        var seedKeys = Object.keys(seeds);
        var nbIcon = 0;
        seedKeys.forEach(key => {
            if(monthIdx+1>=seeds[key].start_month && monthIdx+1<=seeds[key].end_month){
                monthSeedIcons.push(k.add([sprite(seeds[key].icon_sprite), pos(770-Math.floor(nbIcon/2)*45, nbIcon%2==0?510:570), anchor('center'), z(8), scale(0.65)]));
                nbIcon++;
            }
        });
        var collectableKeys = Object.keys(collectables);
        var nbIcon = 0;
        collectableKeys.forEach(key => {
            if(monthIdx+1>=collectables[key].start_month && monthIdx+1<=collectables[key].end_month){
                monthCollectableIcons.push(k.add([sprite(collectables[key].icon_sprite), pos(1150+Math.floor(nbIcon/2)*45, nbIcon%2==0?510:570), anchor('center'), z(8), scale(0.65)]));
                nbIcon++;
            }
        });

        // put collectables
        var arbreCollectables = collectableKeys.filter(key => monthIdx+1>=collectables[key].start_month && monthIdx+1<=collectables[key].end_month && (collectables[key].parent_sprite=="arbre" || collectables[key].parent_sprite=="mais_trou"))
        var otherCollectables = collectableKeys.filter(key => monthIdx+1>=collectables[key].start_month && monthIdx+1<=collectables[key].end_month && collectables[key].parent_sprite!="arbre"  && collectables[key].parent_sprite!="mais_trou")
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
        monthSeedChoices = seedKeys.filter(key => monthIdx+1>=seeds[key].start_month && monthIdx+1<=seeds[key].end_month);
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
    yearText = text("", {size: 24, font: "Chalkduster"})
    player1ScoreText = text("0", {font: "Chalkduster"})
    player2ScoreText = text("0", {font: "Chalkduster"})
    k.add([dateText, pos(960, 520),  anchor("center"), z(9)])
    k.add([yearText, pos(960, 560),  anchor("center"), z(9)])
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
                player.sprite.add([sprite(seeds[player.seed].icon_sprite), z(18), pos(15,-150), anchor('bot'), scale(0.5)]);
                player.sprite.add([text(player.counter, {size: 32, font: "Chalkduster"}),color(0, 0, 0), z(18), pos(-15,-150), anchor('bot')])
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
            play("pop");
            player2.can_move = false;
            player2.sprite.play(player2.action, {
                loop: false,
                onEnd: () => {
                    player2.sprite.play("idle");
                    collected_name = collect(itemToCollect);
                    player2.score += collectables[collected_name].points;
                    player2.can_move = true;
                }
            })
        }
    });


    k.onUpdate(() => {
        var time_pos = (backgrounds_top[0].pos.x * -1)
        var month = Math.floor(time_pos / month_bg_width)
        var day = Math.floor((time_pos % month_bg_width) / (part_width / days_by_months[month])) + 1;
        dateText.text = `${day} ${months[month]}`
        yearText.text = `Année ${year} sur ${nb_years}`
        player1ScoreText.text = `${player1.score}`
        player2ScoreText.text = `${player2.score}`

        if (day==21 && month==2){ // 21 mars -> printemps
            music.stop();
            music = play("printemps",  {loop: true, volume: music_volume});
        }
        if (day==21 && month==5){ // 21 juin -> été
            music.stop();
            music = play("ete",  {loop: true, volume: music_volume});
        }
        if (day==21 && month==8){ // 21 septembre -> automne
            music.stop();
            music = play("automne",  {loop: true, volume: music_volume});
        }
        if (day==21 && month==11){ // 21 decembre -> hiver
            music.stop();
            music = play("hiver",  {loop: true, volume: music_volume});
        }
        

        if (day > days_by_months[month]) {
            backgrounds_top.forEach(element => {
                element.pos.x -= part_width;
            });
            backgrounds_bottom.forEach(element => {
                element.pos.x -= part_width; 
            });
            player1.sprite.pos.x = player_startX;
            player2.sprite.pos.x = player_startX;

            newMonth(month+1);
        }
    })

    newMonth(0);
    if(music==null){
        music = play("hiver", {
            loop: true, volume: music_volume
        })
    }

    addButton("", 3, vec2(1850, 50), ()=>{
        music.stop();
        k.go("start", {menuMusic: null});
    });

}