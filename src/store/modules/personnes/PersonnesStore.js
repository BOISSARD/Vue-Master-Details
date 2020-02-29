import Personne from '../../../model/Personne';

export default {
    namespaced: true,
    state: {
        liste: [
            new Personne("Jacque", "Dutronc", "Jacky", new Date(1960, 1, 12)),
            new Personne("Michel", "Dupont", "Michmich", new Date(1972, 10, 21)),
            new Personne("Edouard", "Dupuys", "Doudou", new Date(1985, 8, 30)),
            new Personne("Carla", "Dupuys", "Carlou", new Date(1985, 8, 30))
        ],
        selectedId: null
    },
    mutations:{
        AJOUTER_PERSONNE(state, {nom, prenom, surnom, dateNaissance}){
            state.liste.push(new Personne(nom, prenom, surnom, dateNaissance));
        },
        MODIFIER_PERSONNE(state, {index, nom, prenom, surnom, dateNaissance}){
            if(typeof state.liste[index] === 'undefined') return;
            state.liste[index] = new Personne(nom, prenom, surnom, dateNaissance);
        },
        SUPPRIMER_PERSONNE(state, index){
            if(typeof state.liste[index] === 'undefined') return;
            state.liste.splice(index, 1);
        },
        SELECT_ID(state, index){
            if(typeof state.liste[index] === 'undefined') return;
            state.selectedId = index;
        },
        DESELECT_ID(state){
            state.selectedId = null;
        }
    },
    actions: {
        ajouter_personne({commit}, {nom, prenom, surnom, dateNaissance}) {
            commit("AJOUTER_PERSONNE", {nom, prenom, surnom, dateNaissance});
        },
        modifier_personne({commit}, {index, nom, prenom, surnom, dateNaissance}) {
            commit("MODIFIER_PERSONNE", {index, nom, prenom, surnom, dateNaissance});
        },
        supprimer_personne({commit}, index) {
            commit("SUPPRIMER_PERSONNE", index);
        },
        select_id({commit}, index) {
            commit("SELECT_ID", index);
        },
        deselect_id({commit}) {
            commit("DESELECT_ID");
        },
    },
    getters: {
        getListe: (state) => state.liste,
        getPersonne: (state) => (index) => {
            if(typeof state.liste[index] === 'undefined') return null;
            return state.liste[index];
        },
        getSelectedId: (state) => state.selectedId
    }
}