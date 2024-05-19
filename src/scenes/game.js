import k from '../kaboom'

class Player {
    constructor(sprite, left_button, right_button, action_button, action) {
        this.sprite = sprite;
        this.left_button = left_button;
        this.right_button = right_button;
        this.action_button = action_button;
        this.action = action;
        this.can_move = true;
        this.score = 0;
    }
  }

class Colletable {
    constructor(sprite, parent_sprite, start_month, end_month, points, deltaY){
        this.sprite = sprite;
        this.parent_sprite = parent_sprite;
        this.start_month = start_month;
        this.end_month = end_month;
        this.points = points;
        this.deltaY = deltaY;
    }
}

export function GameScene() {
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

    // load top backgrounds
    for (var i = 1; i <= bg_nb; i++) {
        for (var part = 1; part <= part_by_bg; part++) {
            loadSprite(`bg_${i}_${part}`, `sprites/background/${i}_${part}.png`)
        }
        loadSprite(`arbre_${i}`, `sprites/arbre_saison/${i}.png`)
    }

    k.loadSprite("bandeau", "sprites/decor.png");
    k.loadSprite("panneau", "sprites/panneau.png");
    k.loadSprite("tonneaux", "sprites/tonneaux.png");
    k.loadSprite("silo", "sprites/silo.png");

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
        parent = add([pos(posX, 930+collectables[name].deltaY), sprite(collectables[name].parent_sprite), z(3), anchor("bot"), move(LEFT, time_speed), name]);
        parent.add([pos(0, 0), sprite(collectables[name].sprite), z(4), anchor("bot")]);
        to_collect.push({name: name, object: parent});
        collectables_spawned.push(parent);
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

    newMonth = (monthIdx)=>{
        // clear old month
        collectables_spawned.forEach(obj => {
            destroy(obj);
        });
        collectables_spawned.splice(0, collectables_spawned.length);
        to_collect.splice(0, to_collect.length);

        // generate new month
        arbre_saison1=k.add([
            pos(500,392),
            sprite(`arbre_${monthIdx+1}`),
            anchor('bot'),
            z(1),
            move(LEFT, time_speed),
        ]);
        arbre_saison2=k.add([
            pos(500,932),
            sprite(`arbre_${monthIdx+1}`),
            anchor('bot'),
            z(1),
            move(LEFT, time_speed),
        ]);
        arbre_saison1.flipX = true;
        arbre_saison2.flipX = true;

    };

    loadAseprite("player", "sprites/player1.png", "sprites/player1.json");

    loadSprite("arbre", "sprites/arbre/arbre.png");
    loadSprite("cerise", "sprites/arbre/cerise.png");
    loadSprite("pomme", "sprites/arbre/pomme.png");
    loadSprite("poire", "sprites/arbre/poire.png");
    loadSprite("prune", "sprites/arbre/prune.png");
    loadSprite("abricot", "sprites/arbre/abricot.png");
    
    loadSprite("buisson", "sprites/buisson/buisson.png");
    loadSprite("fraise", "sprites/buisson/fraise.png");
    loadSprite("framboise", "sprites/buisson/framboise.png");
    loadSprite("myrtille", "sprites/buisson/myrtille.png");
    loadSprite("tomate", "sprites/buisson/tomate.png");

    loadSprite("carotte", "sprites/racine/carotte.png");
    loadSprite("carotte_trou", "sprites/racine/carotte_trou.png");

    loadSprite("pousse", "sprites/pousse.png");

    collectables = {};
    collectables["cerise"] = new Colletable("cerise", "arbre", 6, 8, 2, 0); //M.DéBUT, M.FIN, SCORE, offsetSousTerre
    collectables["pomme"] = new Colletable("pomme", "arbre", 6, 8, 2, 0);
    collectables["poire"] = new Colletable("poire", "arbre", 6, 8, 2, 0);
    collectables["prune"] = new Colletable("prune", "arbre", 6, 8, 2, 0);
    collectables["abricot"] = new Colletable("abricot", "arbre", 6, 8, 2, 0);
    collectables["fraise"] = new Colletable("fraise", "buisson", 6, 8, 2, 0);
    collectables["framboise"] = new Colletable("framboise", "buisson", 6, 8, 2, 0);
    collectables["myrtille"] = new Colletable("myrtille", "buisson", 6, 8, 2, 0);
    collectables["tomate"] = new Colletable("tomate", "buisson", 6, 8, 2, 0);
    collectables["carotte"] = new Colletable("carotte", "carotte_trou",0,0,0,50);

    player1_sprite = add([pos(player_startX, 395), sprite("player"), z(5), anchor("bot")])
    player1_sprite.play("idle")
    player2_sprite = add([pos(player_startX, 935), sprite("player"), z(5), , anchor("bot")])
    player2_sprite.play("idle")

    player1 = new Player(player1_sprite, player1_left, player1_right, player1_action, "sow");
    player2 = new Player(player2_sprite, player2_left, player2_right, player2_action, "ramasse");
    players = [player1, player2]

    dateText = text("")
    player1ScoreText = text("0")
    player2ScoreText = text("0")
    k.add([dateText, pos(960, 540),  anchor("center"), z(8)])
    k.add([player1ScoreText, pos(85, 440), anchor("center"), z(8), color(0, 0, 0), rotate(-5)])
    k.add([player2ScoreText, pos(85, 980), anchor("center"), z(8), color(0, 0, 0), rotate(-5)])
    k.add([sprite("bandeau"), pos(960, 540), anchor("center"), z(7)])
    k.add([sprite("tonneaux"), pos(84, 530), anchor("bot"), z(6)])
    k.add([sprite("panneau"), pos(84, 395), anchor("bot"), z(5)])
    k.add([sprite("silo"), pos(84,1090), anchor("bot"), z(4)])

    players.forEach((player)=>{
        player.sprite.onUpdate(() => {
            if (player.sprite.pos.x < 20) { player.sprite.pos.x = 20 };
            if (player.sprite.pos.x > 1900) { player.sprite.pos.x = 1900 };
            if (player.sprite.curAnim()!="walk" && player.sprite.pos.x>150){player.sprite.move(-time_speed, 0)}
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

        onKeyDown(player.action_button, () => {
            if(player.can_move){
                itemToCollect = null;
                if(player.action=="ramasse"){
                    itemToCollect = canCollect(player.sprite.pos.x);
                    if(itemToCollect==null){return}
                }
                player.can_move = false;
                player.sprite.play(player.action, {
                    loop: false,
                    onEnd: () => {
                        player.sprite.play("idle");
                        if(player.action=="ramasse"){
                            collected_name = collect(itemToCollect);
                            player.score += collectables[collected_name].points;
                        }
                        player.can_move = true;
                    }
                })
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


    k.onUpdate(() => {
        var time_pos = (backgrounds_top[0].pos.x * -1)
        var month = Math.floor(time_pos / month_bg_width)
        var day = Math.floor((time_pos % month_bg_width) / (part_width / days_by_months[month])) + 1;
        dateText.text = `${day} ${months[month]}`
        player1ScoreText.text = `${player1.score}`
        player2ScoreText.text = `${player2.score}`

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

    addCollectable("cerise", 650);
    addCollectable("cerise", 1250);
    addCollectable("cerise", 1550);
    addCollectable("cerise", 1850);
    addCollectable("cerise", 2150);
    addCollectable("cerise", 2450);
    addCollectable("cerise", 2750);
    addCollectable("cerise", 3050);
    addCollectable("cerise", 3350);
    addCollectable("cerise", 3650);
    addCollectable("carotte", 900)
    //addCollectable("fraise", 950);

    newMonth(0);
}