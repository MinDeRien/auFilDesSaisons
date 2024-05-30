import {Collectable} from './types';
export function getCollectables(){
        //////////// P2 stuff (collect)
        collectables = {};
        //arbres
        collectables["cerises"] = new Collectable("cerise", "arbre", "tt_cerise", 6, 8, 14, 0); //rappel: "fruit", "parent", "icon", start, end, score (CHF/kg), offset
        collectables["pommes"] = new Collectable("pomme", "arbre", "tt_pomme", 6, 10, 4, 0);
        collectables["poires"] = new Collectable("poire", "arbre", "tt_poire", 6, 11, 4, 0);
        collectables["prunes"] = new Collectable("prune", "arbre", "tt_prune", 8, 9, 6, 0);
        collectables["abricots"] = new Collectable("abricot", "arbre", "tt_abricot", 6, 9, 10, 0);
        collectables["kiwis"] = new Collectable("kiwi", "arbre", "tt_kiwi", 9, 11, 8, 0);
        collectables["nectarines"] = new Collectable("nectarine", "arbre", "tt_nectarine", 7, 8, 10, 0);
        //collectables["figue"] = new Collectable("figue","arbre", "tt_figue",7, 9, 45,0); //Gwenäelle ne sait plus où elle a trouver l'info des figues
        collectables["peches"] = new Collectable("peche","arbre", "tt_peche", 7, 8, 6, 0);

        //buissons
        collectables["fraises"] = new Collectable("fraise", "buisson", "tt_fraise", 5, 9, 18, 0);
        collectables["framboises"] = new Collectable("framboise", "buisson", "tt_framboise", 6, 9, 27, 0);
        collectables["myrtilles"] = new Collectable("myrtille", "buisson", "tt_myrtille", 7, 8, 24, 0);
        collectables["tomates"] = new Collectable("tomate", "buisson", "tt_tomate", 7, 10, 5, 0);
        collectables["cassis"] = new Collectable("cassis","buisson", "tt_cassis",7,8,19,0);
        collectables["mures"] = new Collectable("mure","buisson", "tt_mure", 7, 9, 20, 0);
        collectables["raisins"] = new Collectable("raisin","buisson", "tt_raisin", 8, 9, 7, 0);
        collectables["raisinets"] = new Collectable("raisinet","buisson", "tt_raisinet", 7, 8, 20, 0);
        collectables["aubergines"] = new Collectable("aubergine","buisson", "tt_aubergine", 7, 10, 6, 0);
        collectables["haricots"] = new Collectable("haricot","buisson", "tt_haricot", 6, 10, 9, 0);
        collectables["poivrons"] = new Collectable("poivron","buisson", "tt_poivron", 6, 10, 3, 0);
        collectables["concombres"] = new Collectable("concombre","buisson_cucurb", "tt_concombre", 5, 9, 5, 4);
        collectables["courges"] = new Collectable("courge","buisson_cucurb", "tt_courge", 8, 10, 5, 4);
        collectables["courgettes"] = new Collectable("courgette","buisson_cucurb", "tt_courgette", 6, 10, 5, 4);
    
        //racines
        collectables["carottes"] = new Collectable("carotte", "carotte_trou", "tt_carotte", 5,11,3,50);
        collectables["onions"] = new Collectable("onion","onion_trou", "tt_onion",  6,10,2,50);
        collectables["endives1"] = new Collectable("endive","endive_trou", "tt_endive",  11, 12, 5, 50);
        collectables["endives2"] = new Collectable("endive","endive_trou", "tt_endive",  1, 4, 5, 50);
        collectables["tetes d'ail1"] = new Collectable("ail","ail_trou", "tt_ail",  4, 5, 13, 50);
        collectables["tetes d'ail2"] = new Collectable("ail","ail_trou", "tt_ail",  7, 8, 13, 50);
        collectables["betteraves"] = new Collectable("betterave","betterave_trou", "tt_betterave",  7, 11, 4, 50);
        collectables["brocolis"] = new Collectable("brocoli","brocoli_trou", "tt_brocoli",  7, 11, 7, 50);
        collectables["chou fleurs"] = new Collectable("chouFleur","chouFleur_trou", "tt_chouFleur",  5, 11, 5, 50);
        collectables["choux"] = new Collectable("chou","chou_trou", "tt_chou",  4, 12, 4, 50);
        collectables["epinards1"] = new Collectable("epinard","epinard_trou", "tt_epinard",  3, 6, 8, 50);
        collectables["epinards2"] = new Collectable("epinard","epinard_trou", "tt_epinard",  10, 12, 8, 50);
        collectables["fenouils"] = new Collectable("fenouil","fenouil_trou", "tt_fenouil",  5, 10, 6, 50);
        collectables["laitues"] = new Collectable("laitue","laitue_trou", "tt_laitue",  4, 11, 6, 50);
        collectables["poireaux"] = new Collectable("poireau","poireau_trou", "tt_poireau",  1, 12, 5, 50);
        collectables["salades"] = new Collectable("salade","salade_trou", "tt_salade",  4, 11, 3, 50);
        collectables["asperges"] = new Collectable("asperge","asperge_racine", "tt_asperge",  4, 6, 22, 50);
        collectables["patates"] = new Collectable("patate","patate_trou", "tt_patate",  6, 10, 2, 50);
        collectables["mais"] = new Collectable("mais","mais_trou", "tt_mais",  8, 10, 6, 50);
        //brusselSprout Insanity (note: Have to redraw sprouts, I f'ed up... :/)
        collectables["chouBruxelles1"] = new Collectable("chouBruxellesPetit","chouBruxellesPetit_base", "tt_chouBruxelles", 9, 10, 7, 50);
        collectables["chouBruxelles2"] = new Collectable("chouBruxellesMoyen","chouBruxellesMoyen_base", "tt_chouBruxelles", 11, 12, 8, 50);
        collectables["chouBruxelles3"] = new Collectable("chouBruxellesGrand","chouBruxellesGrand_base", "tt_chouBruxelles", 1, 2, 8, 50);
        collectables["chouBruxelles4"] = new Collectable("chouBruxellesGrandFin","chouBruxellesGrandFin_trou", "tt_chouBruxelles", 3, 3, 8, 50);
        return collectables;
}