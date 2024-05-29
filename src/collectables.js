import {Collectable} from './types';
export function getCollectables(){
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
        //collectables["figue"] = new Collectable("figue","arbre", "tt_figue",7, 9, 45,0); //Gwenäelle ne sait plus où elle a trouver l'info des figues
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
        collectables["endive1"] = new Collectable("endive","endive_trou", "tt_endive",  11, 12, 5, 50);
        collectables["endive2"] = new Collectable("endive","endive_trou", "tt_endive",  1, 4, 5, 50);
        collectables["ail1"] = new Collectable("ail","ail_trou", "tt_ail",  4, 5, 13, 50);
        collectables["ail2"] = new Collectable("ail","ail_trou", "tt_ail",  7, 8, 13, 50);
        collectables["betterave"] = new Collectable("betterave","betterave_trou", "tt_betterave",  7, 11, 4, 50);
        collectables["brocoli"] = new Collectable("brocoli","brocoli_trou", "tt_brocoli",  7, 11, 7, 50);
        collectables["chouFleur"] = new Collectable("chouFleur","chouFleur_trou", "tt_chouFleur",  5, 11, 5, 50);
        collectables["chou"] = new Collectable("chou","chou_trou", "tt_chou",  4, 12, 4, 50);
        collectables["epinard1"] = new Collectable("epinard","epinard_trou", "tt_epinard",  3, 6, 8, 50);
        collectables["epinard2"] = new Collectable("epinard","epinard_trou", "tt_epinard",  10, 12, 8, 50);
        collectables["fenouil"] = new Collectable("fenouil","fenouil_trou", "tt_fenouil",  5, 10, 6, 50);
        collectables["laitue"] = new Collectable("laitue","laitue_trou", "tt_laitue",  4, 11, 6, 50);
        collectables["poireau"] = new Collectable("poireau","poireau_trou", "tt_poireau",  1, 12, 5, 50);
        collectables["salade"] = new Collectable("salade","salade_trou", "tt_salade",  4, 11, 3, 50);
        collectables["asperge"] = new Collectable("asperge","asperge_racine", "tt_asperge",  4, 6, 22, 50);
        collectables["patate"] = new Collectable("patate","patate_trou", "tt_patate",  6, 10, 2, 50);
        collectables["mais"] = new Collectable("mais","mais_trou", "tt_mais",  8, 10, 6, 50);
        //brusselSprout Insanity (note: Have to redraw sprouts, I f'ed up... :/)
        collectables["chouBruxelles1"] = new Collectable("chouBruxellesPetit","chouBruxellesPetit_base", "tt_chouBruxelles", 9, 10, 7, 50);
        collectables["chouBruxelles2"] = new Collectable("chouBruxellesMoyen","chouBruxellesMoyen_base", "tt_chouBruxelles", 11, 12, 8, 50);
        collectables["chouBruxelles3"] = new Collectable("chouBruxellesGrand","chouBruxellesGrand_base", "tt_chouBruxelles", 1, 2, 8, 50);
        collectables["chouBruxelles4"] = new Collectable("chouBruxellesGrandFin","chouBruxellesGrandFin_trou", "tt_chouBruxelles", 3, 3, 8, 50);
        return collectables;
}