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
    //CHARGEMENT DES PLANTES
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
    loadSprite("onion","sprites/racine/oignon.png");
    loadSprite("onion_trou", "sprites/racine/oignon_trou.png");
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
    loadSprite("laitue","sprites/racine/laitue.png");
    loadSprite("laitue_trou","sprites/racine/laitue_trou.png");
    loadSprite("salade","sprites/racine/salade.png");
    loadSprite("salade_trou","sprites/racine/salade_trou.png");
    loadSprite("poireau","sprites/racine/poireau.png");
    loadSprite("poireau_trou","sprites/racine/poireau_trou.png");
    loadSprite("asperge","sprites/racine/asperge.png");
    loadSprite("asperge_racine","sprites/racine/asperge_racine.png");
    loadSprite("patate","sprites/racine/patate.png");
    loadSprite("patate_trou","sprites/racine/patate_trou.png");
    loadSprite("mais","sprites/racine/mais.png");
    loadSprite("mais_trou","sprites/racine/mais_trou.png");
    //brusselSproutHell
    loadSprite("chouBruxellesPetit","sprites/racine/chouBruxPetit.png");
    loadSprite("chouBruxellesPetit_base","sprites/racine/chouBruxPetit_base.png");
    loadSprite("chouBruxellesMoyen","sprites/racine/chouBruxMoyen.png");
    loadSprite("chouBruxellesMoyen_base","sprites/racine/chouBruxMoyen_base.png");
    loadSprite("chouBruxellesGrand","sprites/racine/chouBruxGrand.png");
    loadSprite("chouBruxellesGrand_base","sprites/racine/chouBruxGrand_base.png");
    loadSprite("chouBruxellesGrandFin","sprites/racine/chouBruxGrandFin.png");
    loadSprite("chouBruxellesGrandFin_trou","sprites/racine/chouBruxGrandFin_trou.png");
    //on charge les pousses
    loadSprite("pousse", "sprites/pousse.png");
    loadSprite("arbre_pousse", "sprites/arbre_pousse.png");
    loadSprite("buisson_pousse","sprites/buisson_pousse.png");

    //charger les tooltip
    loadSprite("tt_abricot","sprites/icones/tt_abricot.png");
    loadSprite("tt_ail","sprites/icones/tt_ail.png");
    loadSprite("tt_asperge","sprites/icones/tt_asperge.png");
    loadSprite("tt_aubergine","sprites/icones/tt_aubergine.png");
    loadSprite("tt_betterave","sprites/icones/tt_betterave.png");
    loadSprite("tt_brocoli","sprites/icones/tt_brocoli.png");
    loadSprite("tt_carotte","sprites/icones/tt_carotte.png");
    loadSprite("tt_cassis","sprites/icones/tt_cassis.png");
    loadSprite("tt_cerise","sprites/icones/tt_cerise.png");
    loadSprite("tt_chou","sprites/icones/tt_chou.png");
    loadSprite("tt_chouBruxelles","sprites/icones/tt_chouBruxelles.png");
    loadSprite("tt_concombre","sprites/icones/tt_concombre.png");
    loadSprite("tt_courge","sprites/icones/tt_courge.png");
    loadSprite("tt_courgette","sprites/icones/tt_courgette.png");
    loadSprite("tt_endive","sprites/icones/tt_endive.png");
    loadSprite("tt_epinard","sprites/icones/tt_epinard.png");
    loadSprite("tt_fenouil","sprites/icones/tt_fenouil.png");
    loadSprite("tt_figue","sprites/icones/tt_figue.png");
    loadSprite("tt_fraise","sprites/icones/tt_fraise.png");
    loadSprite("tt_framboise","sprites/icones/tt_framboise.png");
    loadSprite("tt_haricot","sprites/icones/tt_haricot.png");
    loadSprite("tt_kiwi","sprites/icones/tt_kiwi.png");
    loadSprite("tt_laitue","sprites/icones/tt_laitue.png");
    loadSprite("tt_mais","sprites/icones/tt_mais.png");
    loadSprite("tt_mure","sprites/icones/tt_mure.png");
    loadSprite("tt_myrtille","sprites/icones/tt_myrtille.png");
    loadSprite("tt_nectarine","sprites/icones/tt_nectarine.png");
    loadSprite("tt_onion","sprites/icones/tt_onion.png");
    loadSprite("tt_patate","sprites/icones/tt_patate.png");
    loadSprite("tt_peche","sprites/icones/tt_peche.png");
    loadSprite("tt_poire","sprites/icones/tt_poire.png");
    loadSprite("tt_poireau","sprites/icones/tt_poireau.png");
    loadSprite("tt_poivron","sprites/icones/tt_poivron.png");
    loadSprite("tt_pomme","sprites/icones/tt_pomme.png");
    loadSprite("tt_prune","sprites/icones/tt_prune.png");
    loadSprite("tt_raisin","sprites/icones/tt_raisin.png");
    loadSprite("tt_raisinet","sprites/icones/tt_raisinet.png");
    loadSprite("tt_salade","sprites/icones/tt_salade.png");
    loadSprite("tt_tomate","sprites/icones/tt_tomate.png");
    loadSprite("tt_test","sprites/icones/tt_test.png");
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
    collectables["concombre"] = new Collectable("concombre","buisson_cucurb", "tt_concombre", 5, 9, 5, 0);
    collectables["courge"] = new Collectable("courge","buisson_cucurb", "tt_courge", 8, 10, 5, 0);
    collectables["courgette"] = new Collectable("courgette","buisson_cucurb", "tt_courgette", 6, 10, 5, 0);

    //racines
    collectables["carotte"] = new Collectable("carotte", "carotte_trou", "tt_carotte", 5,11,3,50);
    collectables["oinion"] = new Collectable("onion","onion_trou", "tt_oignon",  6,10,2,50);
    collectables["endive"] = new Collectable("endive","endive_trou", "tt_endive",  11, 12, 5, 0);
    collectables["endive2"] = new Collectable("endive","endive_trou", "tt_endive",  1, 4, 5, 0);
    collectables["ail"] = new Collectable("ail","ail_trou", "tt_ail",  4, 5, 13, 0);
    collectables["ail2"] = new Collectable("ail","ail_trou", "tt_ail",  7, 8, 13, 0);
    collectables["betterave"] = new Collectable("betterave","betterave_trou", "tt_betterave",  7, 11, 4, 0);
    collectables["brocoli"] = new Collectable("brocoli","brocoli_trou", "tt_brocoli",  7, 11, 7, 0);
    collectables["chouFleur"] = new Collectable("chouFleur","chouFleur_trou", "tt_chouFleur",  5, 11, 5, 0);
    collectables["chou"] = new Collectable("chou","chou_trou", "tt_chou",  4, 12, 4, 0);
    collectables["epinard"] = new Collectable("epinard","epinard_trou", "tt_epinard",  3, 6, 8, 0);
    collectables["epinard2"] = new Collectable("epinard","epinard_trou", "tt_epinard",  10, 12, 8, 0);
    collectables["fenouil"] = new Collectable("fenouil","fenouil_trou", "tt_fenouil",  5, 10, 6, 0);
    collectables["laitue"] = new Collectable("laitue","laitue_trou", "tt_laitue",  4, 11, 6, 0);
    collectables["poireau"] = new Collectable("poireau","poireau_trou", "tt_poireau",  1, 12, 5, 0);
    collectables["salade"] = new Collectable("salade","salade_trou", "tt_salade",  4, 11, 3, 0);
    collectables["asperge"] = new Collectable("asperge","asperge_racine", "tt_asperge",  4, 6, 22, 0);
    collectables["patate"] = new Collectable("patate","patate_trou", "tt_patate",  6, 10, 2, 0);
    collectables["maisDoux"] = new Collectable("mais","mais_trou", "tt_mais",  8, 10, 6, 0);
    //brusselSprout Insanity
    collectables["chouBruxelles1"] = new Collectable("chouBruxellesPetit","chouBruxellesPetit_base", "tt_chouBruxelles", 9, 10, 7, 0);
    collectables["chouBruxelles2"] = new Collectable("chouBruxellesMoyen","chouBruxellesMoyen_base", "tt_chouBruxelles", 11, 12, 8, 0);
    collectables["chouBruxelles3"] = new Collectable("chouBruxellesGrand","chouBruxellesGrand_base", "tt_chouBruxelles", 1, 2, 8, 0);
    collectables["chouBruxelles4"] = new Collectable("chouBruxellesGrandFin","chouBruxellesGrandFin_trou", "tt_chouBruxelles", 3, 3, 8, 0);

    /// LES GRAINES
    seeds = {}
    seeds["abricot"] = new Seed("arbre_pousse", "tt_abricot", 11, 12, 12, 0);
    seeds["abricot2"] = new Seed("arbre_pousse", "tt_abricot", 1, 3, 12, 0); //rappel: "pousse_fruit", "icon", start, end, score (bit random), offset
    seeds["ail"] = new Seed("pousse", "tt_ail", 10, 11, 13, 0);
    seeds["ail2"] = new Seed("pousse", "tt_ail", 2, 3, 13, 0);
    seeds["asperge"] = new Seed("pousse", "tt_asperge", 3, 6, 22, 0);
    seeds["aubergine"] = new Seed("buisson_pousse", "tt_aubergine", 5, 5, 7, 0);
    seeds["betterave"] = new Seed("pousse", "tt_betterave", 4, 6, 4, 0);
    seeds["brocoli"] = new Seed("pousse", "tt_brocoli", 4, 6, 7, 0);
    seeds["carotte"] = new Seed("pousse", "tt_carotte", 2, 7, 3, 0);
    seeds["cassis"] = new Seed("buisson_pousse", "tt_cassis", 11, 12, 15, 0);
    seeds["cassis2"] = new Seed("buisson_pousse", "tt_cassis", 1, 3, 15, 0);
    seeds["cerise"] = new Seed("arbre_pousse", "tt_cerise", 11, 12, 14, 0);
    seeds["cerise2"] = new Seed("arbre_pousse", "tt_cerise", 1, 3, 14, 0);
    seeds["chou"] = new Seed("pousse", "tt_chou", 5, 6, 4, 0);
    seeds["chouBruxelles"] = new Seed("pousse", "tt_chouBruxelles", 5, 6, 7, 0);
    seeds["concombre"] = new Seed("buisson_pousse", "tt_concombre", 3, 5, 6, 0);
    seeds["courge"] = new Seed("buisson_pousse", "tt_courge", 4, 5, 4, 0);
    seeds["courgette"] = new Seed("buisson_pousse", "tt_courgette", 4, 5, 4, 0);
    seeds["endive"] = new Seed("pousse", "tt_endive", 4, 6, 5, 0);
    seeds["epinard"] = new Seed("pousse", "tt_epinard", 3, 4, 8, 0);
    seeds["epinard2"] = new Seed("pousse", "tt_epinard", 7, 8, 8, 0);
    seeds["fenouil"] = new Seed("pousse", "tt_fenouil", 2, 7, 7, 0);
    seeds["figue"] = new Seed("arbre_pousse", "tt_figue", 11, 12, 45, 0);
    seeds["figue2"] = new Seed("arbre_pousse", "tt_figue", 1, 3, 45, 0);
    seeds["fraise"] = new Seed("buisson_pousse", "tt_fraise", 8, 12, 18, 0);
    seeds["fraise2"] = new Seed("buisson_pousse", "tt_fraise", 1, 3, 18, 0);
    seeds["framboise"] = new Seed("buisson_pousse", "tt_framboise", 11, 12, 25, 0);
    seeds["framboise2"] = new Seed("buisson_pousse", "tt_framboise", 1, 3, 25, 0);
    seeds["haricot"] = new Seed("buisson_pousse", "tt_haricot", 5, 7, 9, 0);
    seeds["kiwi"] = new Seed("arbre_pousse", "tt_kiwi", 11, 12, 8, 0);
    seeds["kiwi2"] = new Seed("arbre_pousse", "tt_kiwi", 1, 3, 8, 0);
    seeds["laitue"] = new Seed("pousse", "tt_laitue", 3, 8, 6, 0);
    seeds["mais"] = new Seed("pousse", "tt_mais", 0, 0, 5, 0);
    seeds["mure"] = new Seed("buisson_pousse", "tt_mure", 11, 12, 20, 0);
    seeds["mure2"] = new Seed("buisson_pousse", "tt_mure", 1, 3, 20, 0);
    seeds["myrtille"] = new Seed("buisson_pousse", "tt_myrtille", 11, 12, 24, 0);
    seeds["myrtille2"] = new Seed("buisson_pousse", "tt_myrtille", 1, 3, 24, 0);
    seeds["nectarine"] = new Seed("arbre_pousse", "tt_nectarine", 11, 12, 5, 0);
    seeds["nectarine2"] = new Seed("arbre_pousse", "tt_nectarine", 1, 3, 5, 0);
    seeds["onion"] = new Seed("pousse", "tt_onion", 3, 4, 2, 0);
    seeds["patate"] = new Seed("pousse", "tt_patate", 0, 0, 1, 0);
    seeds["peche"] = new Seed("arbre_pousse", "tt_peche", 11, 12, 4, 0);
    seeds["peche2"] = new Seed("arbre_pousse", "tt_peche", 1, 3, 4, 0);
    seeds["poire"] = new Seed("arbre_pousse", "tt_poire", 11, 12, 4, 0);
    seeds["poire2"] = new Seed("arbre_pousse", "tt_poire", 1, 3, 4, 0);
    seeds["poireau"] = new Seed("pousse", "tt_poireau", 3, 4, 5, 0);
    seeds["poireau2"] = new Seed("pousse", "tt_poireau", 6, 6, 5, 0);
    seeds["poivron"] = new Seed("pousse", "tt_poivron", 2, 3, 3, 0);
    seeds["poivron2"] = new Seed("buisson_pousse", "tt_poivron", 5, 5, 3, 0);
    seeds["pomme"] = new Seed("arbre_pousse", "tt_pomme", 11, 12, 4, 0);
    seeds["pomme2"] = new Seed("arbre_pousse", "tt_pomme", 1, 3, 4, 0);
    seeds["prune"] = new Seed("arbre_pousse", "tt_prune", 1, 3, 5, 0);
    seeds["prune2"] = new Seed("arbre_pousse", "tt_prune", 11, 12, 5, 0);
    seeds["raisin"] = new Seed("buisson_pousse", "tt_raisin", 11, 12, 7, 0);
    seeds["raisin2"] = new Seed("buisson_pousse", "tt_raisin", 1, 3, 7, 0);
    seeds["raisinet"] = new Seed("buisson_pousse", "tt_raisinet", 11, 12, 20, 0);
    seeds["raisinet2"] = new Seed("buisson_pousse", "tt_raisinet", 1, 3, 20, 0);
    seeds["salade"] = new Seed("pousse", "tt_salade", 3, 9, 2, 0);
    seeds["tomate"] = new Seed("pousse", "tt_tomate", 3, 3, 5, 0);
    seeds["tomate2"] = new Seed("buisson_pousse", "tt_tomate", 5, 5, 5, 0);
 
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