import k from '../kaboom'

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}



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
    }
  }

class Collectable {
    constructor(sprite, parent_sprite, icon_sprite, start_month, end_month, points, deltaY){
        this.sprite = sprite;
        this.parent_sprite = parent_sprite;
        this.icon_sprite = icon_sprite;
        this.start_month = start_month;
        this.end_month = end_month;
        this.points = points;
        this.deltaY = deltaY;
    }
}

class Seed {
    constructor(sprite, icon_sprite, start_month, end_month, points, deltaY){
        this.sprite = sprite;
        this.icon_sprite = icon_sprite;
        this.start_month = start_month;
        this.end_month = end_month;
        this.points = points;
        this.deltaY = deltaY;
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
    const nb_years = 2;
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
                k.go("quiz");
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

    

    //////////// P2 stuff (collect)
    collectables = {};
    //arbres
    collectables["cerise"] = new Collectable("cerise", "arbre", "tt_cerise", 6, 8, 14, 0); //rappel: "fruit", "parent", "icon", start, end, score (CHF/kg), offset
    collectables["pomme"] = new Collectable("pomme", "arbre", "tt_pomme", 6, 10, 4, 0);
    collectables["poire"] = new Collectable("poire", "arbre", "tt_poire", 6, 11, 4, 0);
    collectables["prune"] = new Collectable("prune", "arbre", "tt_prune", 8, 9, 6, 0);
    collectables["abricot"] = new Collectable("abricot", "arbre", "tt_abricot", 6, 9, 10, 0);
    collectables["kiwi"] = new Collectable("kiwi", "arbre", "tt_kiwi", 9, 11, 8, 0);
    collectables["nectarine"] = new Collectable("nectarine", "arbre", "tt_nectarine", 7, 8, 10, 0);
    collectables["figue"] = new Collectable("figue","arbre", "tt_figue",7, 9, 45,0);
    collectables["peche"] = new Collectable("peche","arbre", "tt_peche", 7, 8, 6, 0);

    //buissons
    collectables["fraise"] = new Collectable("fraise", "buisson", "tt_fraise", 5, 9, 18, 0);
    collectables["framboise"] = new Collectable("framboise", "buisson", "tt_framboise", 6, 9, 27, 0);
    collectables["myrtille"] = new Collectable("myrtille", "buisson", "tt_myrtille", 7, 8, 24, 0);
    collectables["tomate"] = new Collectable("tomate", "buisson", "tt_tomate", 7, 10, 5, 0);
    collectables["cassis"] = new Collectable("cassis","buisson", "tt_cassis",7,8,19,0);
    collectables["mure"] = new Collectable("mure","buisson", "tt_mure", 7, 9, 20, 0);
    collectables["raisin"] = new Collectable("raisin","buisson", "tt_raisin", 8, 9, 7, 0);
    collectables["raisinet"] = new Collectable("raisinet","buisson", "tt_raisinet", 7, 8, 20, 0);
    collectables["aubergine"] = new Collectable("aubergine","buisson", "tt_aubergine", 7, 10, 6, 0);
    collectables["haricot"] = new Collectable("haricot","buisson", "tt_haricot", 6, 10, 9, 0);
    collectables["poivron"] = new Collectable("poivron","buisson", "tt_poivron", 6, 10, 3, 0);
    collectables["concombre"] = new Collectable("concombre","buisson_cucurb", "tt_concombre", 5, 9, 5, 4);
    collectables["courge"] = new Collectable("courge","buisson_cucurb", "tt_courge", 8, 10, 5, 4);
    collectables["courgette"] = new Collectable("courgette","buisson_cucurb", "tt_courgette", 6, 10, 5, 4);

    //racines
    collectables["carotte"] = new Collectable("carotte", "carotte_trou", "tt_carotte", 5,11,3,50);
    collectables["onion"] = new Collectable("onion","onion_trou", "tt_onion",  6,10,2,50);
    collectables["endive"] = new Collectable("endive","endive_trou", "tt_endive",  11, 12, 5, 50);
    collectables["endive2"] = new Collectable("endive","endive_trou", "tt_endive",  1, 4, 5, 50);
    collectables["ail"] = new Collectable("ail","ail_trou", "tt_ail",  4, 5, 13, 50);
    collectables["ail2"] = new Collectable("ail","ail_trou", "tt_ail",  7, 8, 13, 50);
    collectables["betterave"] = new Collectable("betterave","betterave_trou", "tt_betterave",  7, 11, 4, 50);
    collectables["brocoli"] = new Collectable("brocoli","brocoli_trou", "tt_brocoli",  7, 11, 7, 50);
    collectables["chouFleur"] = new Collectable("chouFleur","chouFleur_trou", "tt_chouFleur",  5, 11, 5, 50);
    collectables["chou"] = new Collectable("chou","chou_trou", "tt_chou",  4, 12, 4, 50);
    collectables["epinard"] = new Collectable("epinard","epinard_trou", "tt_epinard",  3, 6, 8, 50);
    collectables["epinard2"] = new Collectable("epinard","epinard_trou", "tt_epinard",  10, 12, 8, 50);
    collectables["fenouil"] = new Collectable("fenouil","fenouil_trou", "tt_fenouil",  5, 10, 6, 50);
    collectables["laitue"] = new Collectable("laitue","laitue_trou", "tt_laitue",  4, 11, 6, 50);
    collectables["poireau"] = new Collectable("poireau","poireau_trou", "tt_poireau",  1, 12, 5, 50);
    collectables["salade"] = new Collectable("salade","salade_trou", "tt_salade",  4, 11, 3, 50);
    collectables["asperge"] = new Collectable("asperge","asperge_racine", "tt_asperge",  4, 6, 22, 50);
    collectables["patate"] = new Collectable("patate","patate_trou", "tt_patate",  6, 10, 2, 50);
    collectables["mais"] = new Collectable("mais","mais_trou", "tt_mais",  8, 10, 6, 50);
    //brusselSprout Insanity
    collectables["chouBruxelles1"] = new Collectable("chouBruxellesPetit","chouBruxellesPetit_base", "tt_chouBruxelles", 9, 10, 7, 50);
    collectables["chouBruxelles2"] = new Collectable("chouBruxellesMoyen","chouBruxellesMoyen_base", "tt_chouBruxelles", 11, 12, 8, 50);
    collectables["chouBruxelles3"] = new Collectable("chouBruxellesGrand","chouBruxellesGrand_base", "tt_chouBruxelles", 1, 2, 8, 50);
    collectables["chouBruxelles4"] = new Collectable("chouBruxellesGrandFin","chouBruxellesGrandFin_trou", "tt_chouBruxelles", 3, 3, 8, 50);

    /// P1 stuff: LES GRAINES
    seeds = {}
    //par ordre alphabétique cette fois...
    var pousse_delta = 1;
    var arbre_delta = 10;
    seeds["abricot"] = new Seed("arbre_pousse", "tt_abricot", 11, 12, 12, arbre_delta);
    seeds["abricot2"] = new Seed("arbre_pousse", "tt_abricot", 1, 3, 12, arbre_delta); //rappel: "pousse_fruit", "icon", start, end, score (bit random), offset
    seeds["ail"] = new Seed("pousse", "tt_ail", 10, 11, 13, pousse_delta);
    seeds["ail2"] = new Seed("pousse", "tt_ail", 2, 3, 13, pousse_delta);
    seeds["asperge"] = new Seed("pousse", "tt_asperge", 3, 6, 22, pousse_delta);
    seeds["aubergine"] = new Seed("buisson_pousse", "tt_aubergine", 5, 5, 7, pousse_delta);
    seeds["betterave"] = new Seed("pousse", "tt_betterave", 4, 6, 4, pousse_delta);
    seeds["brocoli"] = new Seed("pousse", "tt_brocoli", 4, 6, 7, pousse_delta);
    seeds["carotte"] = new Seed("pousse", "tt_carotte", 2, 7, 3, pousse_delta);
    seeds["cassis"] = new Seed("buisson_pousse", "tt_cassis", 11, 12, 15, 0);
    seeds["cassis2"] = new Seed("buisson_pousse", "tt_cassis", 1, 3, 15, 0);
    seeds["cerise"] = new Seed("arbre_pousse", "tt_cerise", 11, 12, 14, arbre_delta);
    seeds["cerise2"] = new Seed("arbre_pousse", "tt_cerise", 1, 3, 14, arbre_delta);
    seeds["chou"] = new Seed("pousse", "tt_chou", 5, 6, 4, pousse_delta);
    seeds["chouBruxelles"] = new Seed("pousse", "tt_chouBruxelles", 5, 6, 7, pousse_delta);
    seeds["concombre"] = new Seed("buisson_pousse", "tt_concombre", 3, 5, 6, 0);
    seeds["courge"] = new Seed("buisson_pousse", "tt_courge", 4, 5, 4, 0);
    seeds["courgette"] = new Seed("buisson_pousse", "tt_courgette", 4, 5, 4, 0);
    seeds["endive"] = new Seed("pousse", "tt_endive", 4, 6, 5, pousse_delta);
    seeds["epinard"] = new Seed("pousse", "tt_epinard", 3, 4, 8, pousse_delta);
    seeds["epinard2"] = new Seed("pousse", "tt_epinard", 7, 8, 8, pousse_delta);
    seeds["fenouil"] = new Seed("pousse", "tt_fenouil", 2, 7, 7, pousse_delta);
    seeds["figue"] = new Seed("arbre_pousse", "tt_figue", 11, 12, 45, arbre_delta);
    seeds["figue2"] = new Seed("arbre_pousse", "tt_figue", 1, 3, 45, arbre_delta);
    seeds["fraise"] = new Seed("buisson_pousse", "tt_fraise", 8, 12, 18, 0);
    seeds["fraise2"] = new Seed("buisson_pousse", "tt_fraise", 1, 3, 18, 0);
    seeds["framboise"] = new Seed("buisson_pousse", "tt_framboise", 11, 12, 25, 0);
    seeds["framboise2"] = new Seed("buisson_pousse", "tt_framboise", 1, 3, 25, 0);
    seeds["haricot"] = new Seed("buisson_pousse", "tt_haricot", 5, 7, 9, 0);
    seeds["kiwi"] = new Seed("arbre_pousse", "tt_kiwi", 11, 12, 8, arbre_delta);
    seeds["kiwi2"] = new Seed("arbre_pousse", "tt_kiwi", 1, 3, 8, arbre_delta);
    seeds["laitue"] = new Seed("pousse", "tt_laitue", 3, 8, 6, pousse_delta);
    seeds["mais"] = new Seed("pousse", "tt_mais", 4, 5, 5, pousse_delta);
    seeds["mure"] = new Seed("buisson_pousse", "tt_mure", 11, 12, 20, 0);
    seeds["mure2"] = new Seed("buisson_pousse", "tt_mure", 1, 3, 20, 0);
    seeds["myrtille"] = new Seed("buisson_pousse", "tt_myrtille", 11, 12, 24, 0);
    seeds["myrtille2"] = new Seed("buisson_pousse", "tt_myrtille", 1, 3, 24, 0);
    seeds["nectarine"] = new Seed("arbre_pousse", "tt_nectarine", 11, 12, 5, arbre_delta);
    seeds["nectarine2"] = new Seed("arbre_pousse", "tt_nectarine", 1, 3, 5, arbre_delta);
    seeds["onion"] = new Seed("pousse", "tt_onion", 3, 4, 2, pousse_delta);
    seeds["patate"] = new Seed("pousse", "tt_patate", 4, 5, 1, pousse_delta);
    seeds["peche"] = new Seed("arbre_pousse", "tt_peche", 11, 12, 4, arbre_delta);
    seeds["peche2"] = new Seed("arbre_pousse", "tt_peche", 1, 3, 4, arbre_delta);
    seeds["poire"] = new Seed("arbre_pousse", "tt_poire", 11, 12, 4, arbre_delta);
    seeds["poire2"] = new Seed("arbre_pousse", "tt_poire", 1, 3, 4, arbre_delta);
    seeds["poireau"] = new Seed("pousse", "tt_poireau", 3, 4, 5, pousse_delta);
    seeds["poireau2"] = new Seed("pousse", "tt_poireau", 6, 6, 5, pousse_delta);
    seeds["poivron"] = new Seed("pousse", "tt_poivron", 2, 3, 3, pousse_delta);
    seeds["poivron2"] = new Seed("buisson_pousse", "tt_poivron", 5, 5, 3, 0);
    seeds["pomme"] = new Seed("arbre_pousse", "tt_pomme", 11, 12, 4, arbre_delta);
    seeds["pomme2"] = new Seed("arbre_pousse", "tt_pomme", 1, 3, 4, arbre_delta);
    seeds["prune"] = new Seed("arbre_pousse", "tt_prune", 1, 3, 5, arbre_delta);
    seeds["prune2"] = new Seed("arbre_pousse", "tt_prune", 11, 12, 5, arbre_delta);
    seeds["raisin"] = new Seed("buisson_pousse", "tt_raisin", 11, 12, 7, 0);
    seeds["raisin2"] = new Seed("buisson_pousse", "tt_raisin", 1, 3, 7, 0);
    seeds["raisinet"] = new Seed("buisson_pousse", "tt_raisinet", 11, 12, 20, 0);
    seeds["raisinet2"] = new Seed("buisson_pousse", "tt_raisinet", 1, 3, 20, 0);
    seeds["salade"] = new Seed("pousse", "tt_salade", 3, 9, 2, pousse_delta);
    seeds["tomate"] = new Seed("pousse", "tt_tomate", 3, 3, 5, pousse_delta);
    seeds["tomate2"] = new Seed("buisson_pousse", "tt_tomate", 5, 5, 5, 0);
 
    player1_sprite = add([pos(player_startX, 395), sprite("player"), z(5), anchor("bot")])
    player1_sprite.play("idle")
    player2_sprite = add([pos(player_startX, 935), sprite("player"), z(5), , anchor("bot")])
    player2_sprite.play("idle")

    player1 = new Player(player1_sprite, player1_left, player1_right, player1_action, "sow",scoreP1);
    player2 = new Player(player2_sprite, player2_left, player2_right, player2_action, "ramasse", scoreP2);
    players = [player1, player2]

    dateText = text("")
    yearText = text("", {size: 24})
    player1ScoreText = text("0")
    player2ScoreText = text("0")
    k.add([dateText, pos(960, 520),  anchor("center"), z(9)])
    k.add([yearText, pos(960, 560),  anchor("center"), z(9)])
    k.add([player1ScoreText, pos(85, 440), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([player2ScoreText, pos(85, 980), anchor("center"), z(9), color(0, 0, 0), rotate(-5)])
    k.add([sprite("bandeau"), pos(960, 540), anchor("center"), z(8)])
    k.add([sprite("tonneaux"), pos(84, 530), anchor("bot"), z(7)])
    k.add([sprite("panneau"), pos(84, 350), anchor("bot"), z(6)])
    k.add([sprite("silo"), pos(84,1090), anchor("bot"), z(7)])

    players.forEach((player)=>{
        player.sprite.onUpdate(() => {
            if (player.sprite.pos.x < 20) { player.sprite.pos.x = 20 };
            if (player.sprite.pos.x > 1900) { player.sprite.pos.x = 1900 };
            if (player.sprite.curAnim()!="walk" && player.sprite.pos.x>150){player.sprite.move(-time_speed, 0)}
            // destroy all children
            player.sprite.removeAll();
            // create text and icon
            if(player.counter>0){
                player.sprite.add([sprite(seeds[player.seed].icon_sprite), z(18), pos(15,-150), anchor('bot'), scale(0.5)]);
                player.sprite.add([text(player.counter, {size: 32}),color(0, 0, 0), z(18), pos(-15,-150), anchor('bot')])
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

        onKeyDown(player.action_button, () => {
            if(player.can_move){
                itemToCollect = null;
                var player_sow = false;
                if(player.action=="ramasse"){
                    itemToCollect = canCollect(player.sprite.pos.x);
                    if(itemToCollect==null){return}
                }else {
                    // check tonneau
                    if(player.sprite.pos.x<50){
                        player.seed = tonneau1.newSeed(monthSeedChoices.sample())
                        player.counter = 5;
                    }else if(player.sprite.pos.x<100){
                        player.seed = tonneau2.newSeed(monthSeedChoices.sample())
                        player.counter = 5;
                    }else if(player.sprite.pos.x<150){
                        player.seed = tonneau3.newSeed(monthSeedChoices.sample())
                        player.counter = 5;
                    }else{
                        if(player.counter==0){return}
                        player_sow = true;
                    }
                }
                player.can_move = false;
                player.sprite.play(player.action, {
                    loop: false,
                    onEnd: () => {
                        player.sprite.play("idle");
                        if(player.action=="ramasse"){
                            collected_name = collect(itemToCollect);
                            player.score += collectables[collected_name].points;
                        }else if(player_sow){
                            if(player.seed!=""){
                                player.counter--;
                                addSeed(player.seed, player.sprite.pos.x);
                                player.score += seeds[player.seed].points;
                            }
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
        yearText.text = `Année ${year} sur ${nb_years}`
        player1ScoreText.text = `${player1.score}`
        player2ScoreText.text = `${player2.score}`

        if (day==21 && month==2){ // 21 mars -> printemps
            music.stop();
            music = play("printemps", {loop: true});
        }
        if (day==21 && month==5){ // 21 juin -> été
            music.stop();
            music = play("ete", {loop: true});
        }
        if (day==21 && month==8){ // 21 septembre -> automne
            music.stop();
            music = play("automne", {loop: true});
        }
        if (day==21 && month==11){ // 21 decembre -> hiver
            music.stop();
            music = play("hiver", {loop: true});
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
            loop: true
        })
    }
}