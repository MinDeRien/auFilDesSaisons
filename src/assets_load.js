export function LoadAssets(){

    bg_nb = 12;
    part_by_bg = 2;

    loadFont("chalkduster", "fonts/Chalkduster.ttf");
    loadFont("chalkboard", "fonts/ChalkBoard.ttf");
    loadFont("indieflower", "fonts/IndieFlower-Regular.ttf");

    loadSprite("start_screen", "sprites/start_screen.png");
    loadSprite("level_select_screen", "sprites/level_select_screen.png");
    loadSprite("credits_screen", "sprites/credits_screen.png");
    loadSprite("quiz_screen", "sprites/quiz_screen.png");
    loadSprite("end_screen", "sprites/end_screen.png");
    loadSprite("button_1", "sprites/button1.png");
    loadSprite("button_1_hover", "sprites/button1_hover.png");
    loadSprite("button_2", "sprites/button2.png");
    loadSprite("button_2_hover", "sprites/button2_hover.png");
    loadSprite("button_3", "sprites/button3.png");
    loadSprite("button_3_hover", "sprites/button3_hover.png");
    loadSprite("button_hiver", "sprites/button_hiver.png");
    loadSprite("button_hiver_hover", "sprites/button_hiver_hover.png");
    loadSprite("button_automne", "sprites/button_automne.png");
    loadSprite("button_automne_hover", "sprites/button_automne_hover.png");
    loadSprite("button_ete", "sprites/button_ete.png");
    loadSprite("button_ete_hover", "sprites/button_ete_hover.png");
    loadSprite("button_printemps", "sprites/button_printemps.png");
    loadSprite("button_printemps_hover", "sprites/button_printemps_hover.png");
    loadSprite("button_random", "sprites/button_random.png");
    loadSprite("button_random_hover", "sprites/button_random_hover.png");

    // load quiz assets
    loadSprite("player1_quiz", "sprites/player1_quiz.png");
    loadSprite("player2_quiz", "sprites/player2_quiz.png");
    loadSprite("quiz_faux", "sprites/quiz_faux.png");
    loadSprite("quiz_juste", "sprites/quiz_juste.png");

    loadAseprite("player", "sprites/player1.png", "sprites/player1.json");
    //LOAD DA PLANTS
    //chargement des arbres
    loadSprite("arbre_6", "sprites/arbre/arbre_6.png");
    loadSprite("arbre_7", "sprites/arbre/arbre_7.png");
    loadSprite("arbre_8", "sprites/arbre/arbre_8.png");
    loadSprite("arbre_9", "sprites/arbre/arbre_9.png");
    loadSprite("arbre_10", "sprites/arbre/arbre_10.png");
    loadSprite("arbre_11", "sprites/arbre/arbre_11.png");
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
    loadSprite("tt_chouFleur","sprites/icones/tt_chouFleur.png");
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

    loadSprite("bandeau", "sprites/decor.png");
    loadSprite("panneau", "sprites/panneau.png");
    loadSprite("tonneaux", "sprites/tonneaux.png");
    loadSprite("silo", "sprites/silo.png");
    loadSprite("tunnel_back","sprites/tunnel_back.png");
    loadSprite("tunnel_front","sprites/tunnel_front.png");
    loadSprite("recoltes", "sprites/recoltes.png");
    loadSprite("semailles", "sprites/semailles.png");

    // load top backgrounds
    for (var i = 1; i <= bg_nb; i++) {
        for (var part = 1; part <= part_by_bg; part++) {
            loadSprite(`bg_${i}_${part}`, `sprites/background/${i}_${part}.png`)
        }
        loadSprite(`arbre_saison_${i}`, `sprites/arbre_saison/${i}.png`)
    }

    // loadMusic not in this version of Kaboom, strange...
    loadSound("hiver", "music/hiver.mp3");
    loadSound("printemps", "music/printemps.mp3");
    loadSound("ete", "music/ete.mp3");
    loadSound("automne", "music/automne.mp3");
    loadSound("all", "music/all.mp3");

    loadSound("pas", "sounds/son_pas.mp3");
    loadSound("graines", "sounds/graines.mp3");
    loadSound("pop", "sounds/pop.mp3");
    loadSound("defaite", "sounds/defaite.mp3");
    loadSound("victoire", "sounds/victoire.mp3");
    loadSound("click_button", "sounds/click_button.mp3");
    loadSound("hover_button", "sounds/hover_button.mp3");
    loadSound("swish", "sounds/swish3.mp3");
}