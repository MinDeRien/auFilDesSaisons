import {Seed} from './types';
export function getSeeds(){
    /// P1 stuff: LES GRAINES
    seeds = {}
    //par ordre alphabétique cette fois...
    var pousse_delta = 1;
    var arbre_delta = 10;
    seeds["abricots1"] = new Seed("arbre_pousse", "tt_abricot", 11, 12, 12, arbre_delta);
    seeds["abricots2"] = new Seed("arbre_pousse", "tt_abricot", 1, 3, 12, arbre_delta); //rappel: "pousse_fruit", "icon", start, end, score (bit random), offset
    seeds["ails1"] = new Seed("pousse", "tt_ail", 10, 11, 13, pousse_delta);
    seeds["ails2"] = new Seed("pousse", "tt_ail", 2, 3, 13, pousse_delta);
    seeds["asperges"] = new Seed("pousse", "tt_asperge", 3, 6, 22, pousse_delta);
    seeds["aubergines"] = new Seed("buisson_pousse", "tt_aubergine", 5, 5, 7, pousse_delta);
    seeds["betteraves"] = new Seed("pousse", "tt_betterave", 4, 6, 4, pousse_delta);
    seeds["brocolis"] = new Seed("pousse", "tt_brocoli", 4, 6, 7, pousse_delta);
    seeds["carottes"] = new Seed("pousse", "tt_carotte", 2, 7, 3, pousse_delta);
    seeds["cassis1"] = new Seed("buisson_pousse", "tt_cassis", 11, 12, 15, 0);
    seeds["cassis2"] = new Seed("buisson_pousse", "tt_cassis", 1, 3, 15, 0);
    seeds["cerises1"] = new Seed("arbre_pousse", "tt_cerise", 11, 12, 14, arbre_delta);
    seeds["cerises2"] = new Seed("arbre_pousse", "tt_cerise", 1, 3, 14, arbre_delta);
    seeds["choux"] = new Seed("pousse", "tt_chou", 5, 6, 4, pousse_delta);
    seeds["chouBruxelles"] = new Seed("pousse", "tt_chouBruxelles", 5, 6, 7, pousse_delta);
    seeds["concombres"] = new Seed("buisson_pousse", "tt_concombre", 3, 5, 6, 0);
    seeds["courges"] = new Seed("buisson_pousse", "tt_courge", 4, 5, 4, 0);
    seeds["courgettes"] = new Seed("buisson_pousse", "tt_courgette", 4, 5, 4, 0);
    seeds["endives"] = new Seed("pousse", "tt_endive", 4, 6, 5, pousse_delta);
    seeds["epinards1"] = new Seed("pousse", "tt_epinard", 3, 4, 8, pousse_delta);
    seeds["epinards2"] = new Seed("pousse", "tt_epinard", 7, 8, 8, pousse_delta);
    seeds["fenouils"] = new Seed("pousse", "tt_fenouil", 2, 7, 7, pousse_delta);
    //seeds["figue1"] = new Seed("arbre_pousse", "tt_figue", 11, 12, 45, arbre_delta); //Gwenäelle ne sait plus où elle a trouver l'info des figues
    //seeds["figue2"] = new Seed("arbre_pousse", "tt_figue", 1, 3, 45, arbre_delta); //Gwenäelle ne sait plus où elle a trouver l'info des figues
    seeds["fraises1"] = new Seed("buisson_pousse", "tt_fraise", 8, 12, 18, 0);
    seeds["fraises2"] = new Seed("buisson_pousse", "tt_fraise", 1, 3, 18, 0);
    seeds["framboises1"] = new Seed("buisson_pousse", "tt_framboise", 11, 12, 25, 0);
    seeds["framboises2"] = new Seed("buisson_pousse", "tt_framboise", 1, 3, 25, 0);
    seeds["haricots"] = new Seed("buisson_pousse", "tt_haricot", 5, 7, 9, 0);
    seeds["kiwis1"] = new Seed("arbre_pousse", "tt_kiwi", 11, 12, 8, arbre_delta);
    seeds["kiwis2"] = new Seed("arbre_pousse", "tt_kiwi", 1, 3, 8, arbre_delta);
    seeds["laitues"] = new Seed("pousse", "tt_laitue", 3, 8, 6, pousse_delta);
    seeds["mais"] = new Seed("pousse", "tt_mais", 4, 5, 5, pousse_delta);
    seeds["mures1"] = new Seed("buisson_pousse", "tt_mure", 11, 12, 20, 0);
    seeds["mures2"] = new Seed("buisson_pousse", "tt_mure", 1, 3, 20, 0);
    seeds["myrtilles1"] = new Seed("buisson_pousse", "tt_myrtille", 11, 12, 24, 0);
    seeds["myrtilles2"] = new Seed("buisson_pousse", "tt_myrtille", 1, 3, 24, 0);
    seeds["nectarines1"] = new Seed("arbre_pousse", "tt_nectarine", 11, 12, 5, arbre_delta);
    seeds["nectarines2"] = new Seed("arbre_pousse", "tt_nectarine", 1, 3, 5, arbre_delta);
    seeds["onions"] = new Seed("pousse", "tt_onion", 3, 4, 2, pousse_delta);
    seeds["patates"] = new Seed("pousse", "tt_patate", 4, 5, 1, pousse_delta);
    seeds["peches1"] = new Seed("arbre_pousse", "tt_peche", 11, 12, 4, arbre_delta);
    seeds["peches2"] = new Seed("arbre_pousse", "tt_peche", 1, 3, 4, arbre_delta);
    seeds["poires1"] = new Seed("arbre_pousse", "tt_poire", 11, 12, 4, arbre_delta);
    seeds["poires2"] = new Seed("arbre_pousse", "tt_poire", 1, 3, 4, arbre_delta);
    seeds["poireaux1"] = new Seed("pousse", "tt_poireau", 3, 4, 5, pousse_delta);
    seeds["poireaux2"] = new Seed("pousse", "tt_poireau", 6, 6, 5, pousse_delta);
    seeds["poivrons1"] = new Seed("pousse", "tt_poivron", 2, 3, 3, pousse_delta);
    seeds["poivrons2"] = new Seed("buisson_pousse", "tt_poivron", 5, 5, 3, 0);
    seeds["pommes1"] = new Seed("arbre_pousse", "tt_pomme", 11, 12, 4, arbre_delta);
    seeds["pommes2"] = new Seed("arbre_pousse", "tt_pomme", 1, 3, 4, arbre_delta);
    seeds["prunes1"] = new Seed("arbre_pousse", "tt_prune", 1, 3, 5, arbre_delta);
    seeds["prunes2"] = new Seed("arbre_pousse", "tt_prune", 11, 12, 5, arbre_delta);
    seeds["raisins1"] = new Seed("buisson_pousse", "tt_raisin", 11, 12, 7, 0);
    seeds["raisins2"] = new Seed("buisson_pousse", "tt_raisin", 1, 3, 7, 0);
    seeds["raisinets1"] = new Seed("buisson_pousse", "tt_raisinet", 11, 12, 20, 0);
    seeds["raisinets2"] = new Seed("buisson_pousse", "tt_raisinet", 1, 3, 20, 0);
    seeds["salades"] = new Seed("pousse", "tt_salade", 3, 9, 2, pousse_delta);
    seeds["tomates1"] = new Seed("pousse", "tt_tomate", 3, 3, 5, pousse_delta);
    seeds["tomates2"] = new Seed("buisson_pousse", "tt_tomate", 5, 5, 5, 0);
    return seeds;
}