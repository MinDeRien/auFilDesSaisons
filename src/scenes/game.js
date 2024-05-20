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
    k.loadSprite("tunnel_back","sprites/tunnel_back.png");
    k.loadSprite("tunnel_front","sprites/tunnel_front.png");

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
            pos(900,392),
            sprite(`arbre_${monthIdx+1}`),
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]);
        arbre_saison2=k.add([
            pos(900,932),
            sprite(`arbre_${monthIdx+1}`),
            anchor('bot'),
            scale(0.8),
            z(1),
            move(LEFT, time_speed),
        ]);
        tunnel_b_1=k.add([
            pos(1800,392),
            sprite('tunnel_back'),
            anchor('bot'),
            z(0),
            move(LEFT,time_speed),
        ]);
        tunnel_f_1=k.add([
            pos(1800,392),
            sprite('tunnel_front'),
            anchor('bot'),
            z(5),
            move(LEFT,time_speed),
        ]);
        tunnel_b_2=k.add([
            pos(1800,932),
            sprite('tunnel_back'),
            anchor('bot'),
            z(0),
            move(LEFT,time_speed),
        ]);
        tunnel_f_2=k.add([
            pos(1800,932),
            sprite('tunnel_front'),
            anchor('bot'),
            z(6),
            move(LEFT,time_speed),
        ]);

        arbre_saison1.flipX = true;
        arbre_saison2.flipX = true;

    };

    loadAseprite("player", "sprites/player1.png", "sprites/player1.json");
    //on charge les arbres
    loadSprite("arbre", "sprites/arbre/arbre.png");
    loadSprite("cerise", "sprites/arbre/cerise.png");
    loadSprite("pomme", "sprites/arbre/pomme.png");
    loadSprite("poire", "sprites/arbre/poire.png");
    loadSprite("prune", "sprites/arbre/prune.png");
    loadSprite("abricot", "sprites/arbre/abricot.png");
    loadSprite("kiwi", "sprites/arbre/kiwi.png");
    loadSprite("nectarine","sprites/arbre/nectarine.png");
    loadSprite("figue", "sprites/arbre/figue.png");
    loadSprite("peche", "sprites/arbre/peche.png");

    //on charge les buissons
    loadSprite("buisson", "sprites/buisson/buisson.png");
    loadSprite("buisson_cucurb", "sprites/buisson/buisson_cucurb.png");
    loadSprite("fraise", "sprites/buisson/fraise.png");
    loadSprite("framboise", "sprites/buisson/framboise.png");
    loadSprite("myrtille", "sprites/buisson/myrtille.png");
    loadSprite("tomate", "sprites/buisson/tomate.png");
    loadSprite("cassis", "sprites/buisson/cassis.png");
    loadSprite("mure", "sprites/buisson/mure.png");
    loadSprite("raisin", "sprites/buisson/raisin.png");
    loadSprite("raisinet", "sprites/buisson/raisinet.png");
    loadSprite("poivron", "sprites/buisson/poivron.png");
    loadSprite("haricot", "sprites/buisson/haricot.png");
    loadSprite("aubergine", "sprites/buisson/aubergine.png");
    loadSprite("courgette", "sprites/buisson/courgette.png");
    loadSprite("courge", "sprites/buisson/courge.png");
    loadSprite("concombre", "sprites/buisson/concombre.png");

    //on charge les racines
    loadSprite("carotte", "sprites/racine/carotte.png");
    loadSprite("carotte_trou", "sprites/racine/carotte_trou.png");
    loadSprite("oignon","sprites/racine/oignon.png");
    loadSprite("oignon_trou", "sprites/racine/oignon_trou.png");
    loadSprite("endive","sprites/racine/endive.png");
    loadSprite("endive_trou", "sprites/racine/endive_trou.png");
    loadSprite("ail","sprites/racine/ail.png");
    loadSprite("ail_trou","sprites/racine/ail_trou.png");
    loadSprite("betterave","sprites/racine/betterave.png");
    loadSprite("betterave_trou","sprites/racine/betterave_trou.png");
    loadSprite("brocoli","sprites/racine/brocoli.png");
    loadSprite("brocoli_trou","sprites/racine/brocoli_trou.png");
    loadSprite("chouFleur","sprites/racine/chouFleur.png");
    loadSprite("chouFleur_trou","sprites/racine/chouFleur_trou.png");
    loadSprite("chou","sprites/racine/chou.png");
    loadSprite("chou_trou","sprites/racine/chou_trou.png");
    loadSprite("epinard","sprites/racine/epinard.png");
    loadSprite("epinard_trou","sprites/racine/epinard_trou.png");
    loadSprite("fenouil","sprites/racine/fenouil.png");
    loadSprite("fenouil_trou","sprites/racine/fenouil_trou.png");
    
    //on charge les pousses
    loadSprite("pousse", "sprites/pousse.png");
    loadSprite("arbre_pousse", "sprites/arbre_pousse.png");
    loadSprite("buisson_pousse","sprites/buisson_pousse.png");

    collectables = {};
    //arbres
    collectables["cerise"] = new Colletable("cerise", "arbre", 6, 8, 14, 0); //rappel: "fruit", "parent", start, end, score, offset
    collectables["pomme"] = new Colletable("pomme", "arbre", 6, 10, 4, 0);
    collectables["poire"] = new Colletable("poire", "arbre", 6, 11, 4, 0);
    collectables["prune"] = new Colletable("prune", "arbre", 8, 9, 6, 0);
    collectables["abricot"] = new Colletable("abricot", "arbre", 6, 9, 10, 0);
    collectables["kiwi"] = new Colletable("kiwi", "arbre", 9, 11, 8, 0);
    collectables["nectarine"] =new Colletable("nectarine", "arbre", 7, 8, 10, 0);
    collectables["figue"] =new Colletable("figue","arbre",7, 9, 45,0);
    collectables["peche"] =new Colletable("peche","arbre", 7, 8, 6, 0);

    //buissons
    collectables["fraise"] = new Colletable("fraise", "buisson", 5, 9, 18, 0);
    collectables["framboise"] = new Colletable("framboise", "buisson", 6, 9, 27, 0);
    collectables["myrtille"] = new Colletable("myrtille", "buisson", 7, 8, 24, 0);
    collectables["tomate"] = new Colletable("tomate", "buisson", 6, 10, 5, 0);
    collectables["cassis"] =new Colletable("cassis","buisson",7,8,19,0);
    collectables["mure"] =new Colletable("mure","buisson", 7, 9, 20, 0);
    collectables["raisin"] =new Colletable("raisin","buisson", 8, 9, 7, 0);
    collectables["raisinet"] =new Colletable("raisinet","buisson", 7, 8, 20, 0);
    collectables["aubergine"] =new Colletable("aubergine","buisson", 7, 10, 6, 0);
    collectables["haricot"] =new Colletable("haricot","buisson", 6, 10, 9, 0);
    collectables["poivron"] =new Colletable("poivron","buisson", 6, 10, 3, 0);
    collectables["concombre"] =new Colletable("concombre","buisson_cucurb", 5, 10, 5, 0);
    collectables["courge"] =new Colletable("courge","buisson_cucurb", 8, 10, 5, 0);
    collectables["courgette"] =new Colletable("courgette","buisson_cucurb", 6, 10, 5, 0);

    //racines
    collectables["carotte"] = new Colletable("carotte", "carotte_trou",5,11,3,50);
    collectables["oignon"]= new Colletable("oignon","oignon_trou", 6,10,2,50);//on verra si l'offset fonctionne, à voir
    collectables["endive"] =new Colletable("endive","endive_trou", 11, 12, 5, 0);
    collectables["endive2"] =new Colletable("endive","endive_trou", 1, 4, 5, 0);
    collectables["ail"] =new Colletable("ail","ail_trou", 4, 5, 13, 0);
    collectables["ail2"] =new Colletable("ail","ail_trou", 7, 8, 13, 0);
    collectables["betterave"] =new Colletable("betterave","betterave_trou", 7, 11, 4, 0);
    collectables["brocoli"] =new Colletable("brocoli","brocoli_trou", 5, 11, 7, 0);
    collectables["chouFleur"] =new Colletable("chouFleur","chouFleur_trou", 5, 11, 5, 0);
    collectables["chou"] =new Colletable("chou","chou_trou", 4, 12, 4, 0);
    collectables["epinard"] =new Colletable("epinard","epinard_trou", 3, 6, 8, 0);
    collectables["epinard2"] =new Colletable("epinard","epinard_trou", 10, 12, 8, 0);
    collectables["fenouil"] =new Colletable("fenouil","fenouil_trou", 5, 11, 6, 0);

    //todo collectables
    
    
    collectables["laitue"] =new Colletable("laitue","laitue_trou", 4, 11, 6, 0);
    collectables["poireau"] =new Colletable("poireau","poireau_trou", 1, 12, 5, 0);
    collectables["patate"] =new Colletable("patate","patate_trou", 6, 10, 2, 0);
    collectables["salade"] =new Colletable("salade","salade_trou", 4, 11, 3, 0);
    collectables["chouBruxelles3"] =new Colletable("chouBruxelles","chouBruxelles_trou", 12, 12, 8, 0);
    

    collectables["maisDoux"] =new Colletable("maisDoux","maisDoux_base", 8, 10, 6, 0);
    
    collectables["asperge"] =new Colletable("asperge","asperge_racine", 4, 6, 22, 0);
    collectables["chouBruxelles2"] =new Colletable("chouBruxelles","chouBruxelles_base", 9, 11, 7, 0);
    collectables["chouBruxelles1"] =new Colletable("chouBruxelles","chouBruxelles_base", 1, 3, 8, 0);

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
    k.add([dateText, pos(960, 540),  anchor("center"), z(9)])
    k.add([player1ScoreText, pos(85, 440), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([player2ScoreText, pos(85, 980), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([sprite("bandeau"), pos(960, 540), anchor("center"), z(8)])
    k.add([sprite("tonneaux"), pos(84, 530), anchor("bot"), z(7)])
    k.add([sprite("panneau"), pos(84, 395), anchor("bot"), z(6)])
    k.add([sprite("silo"), pos(84,1090), anchor("bot"), z(7)])

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