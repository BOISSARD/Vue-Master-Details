<template>
    <div id="detail-part">
        <form id="formulaire">
            <div class="form-group row justify-content-end">
                <label for="formSurnom" class="col-sm-2 col-form-label">Surnom</label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formSurnom"
                        placeholder="Surnom"
                        v-model="surnom"
                    />
                    <Message v-if="errors.surnom.afficher" fermable class="col-sm-12 message-perso" type="danger">{{ errors.surnom.motif }}</Message>
                </div>
            </div>
            <div class="form-group row">
                <label for="formPrenom" class="col-sm-2 col-form-label">Prénom</label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formPrenom"
                        placeholder="Prénom"
                        v-model="prenom"
                    />
                <Message v-if="errors.prenom.afficher" fermable class="col-sm-12 message-perso" type="danger">{{ errors.prenom.motif }}</Message>
                </div>
            </div>
            <div class="form-group row">
                <label for="formNom" class="col-sm-2 col-form-label">Nom</label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formNom"
                        placeholder="Nom"
                        v-model="nom"
                    />
                <Message v-if="errors.nom.afficher" fermable class="col-sm-12 message-perso" type="danger">{{ errors.nom.motif }}</Message>
                </div>
            </div>
            <div class="form-group row">
                <label for="formDateNaissance" class="col-sm-4 col-form-label">Date naissance</label>
                <div class="col-sm-8">
                    <input
                        type="date"
                        class="form-control"
                        id="formDateNaissance"
                        placeholder="Date naissance"
                        v-model="ddn"
                    />
                    <Message v-if="errors.ddn.afficher" fermable class="col-sm-12 message-perso" type="danger">{{ errors.ddn.motif }}</Message>
                </div>
            </div>
            <div class="form-group row d-flex justify-content-around">
                <button
                    type="button"
                    @click="ajouterPersonne()"
                    :class="design.bouton.ajouter"
                    :disabled="activerModification"
                    class="btn col-sm-3"
                >Ajouter</button>
                <button
                    type="button"
                    @click="modifierPersonne()"
                    :class="design.bouton.modifier"
                    :disabled="!activerModification"
                >Modifier</button>
                <button
                    type="button"
                    @click="supprimerPersonne()"
                    :class="design.bouton.supprimer"
                    :disabled="!activerModification"
                >Supprimer</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vuex from "vuex";

import Message from './Message';

export default {
    name: "Detail",
    data() {
        return {
            surnom: null,
            nom: null,
            prenom: null,
            ddn: null,
            design: {
                bouton: {
                    ajouter: [],
                    modifier: [],
                    supprimer: []
                }
            },
            errors: {
                surnom: {
                    afficher: false,
                    motif: ""
                },
                nom: {
                    afficher: false,
                    motif: ""
                },
                prenom: {
                    afficher: false,
                    motif: ""
                },
                ddn: {
                    afficher: false,
                    motif: ""
                }
            }
        };
    },
    computed: {
        ...Vuex.mapGetters("personnes", {
            getPersonne: "getPersonne",
            getId: "getSelectedId"
        }),
        activerModification() {
            return this.getId !== null;
        },
        activerAjout(){
            return this.getId === null;
        }
    },
    watch: {
        activerModification: {
            handler: function(booleen) {
                this.prepareDesign(booleen);
            },
            immediate: true
        },
        getId() {
            let p = this.getPersonne(this.getId);
            if (p !== null) {
                this.surnom = p.surnom;
                this.nom = p.nom;
                this.prenom = p.prenom;
                this.ddn = p.dateNaissance.toISOString().split("T")[0];
            } else {
                this.surnom = this.nom = this.prenom = this.ddn = null;
            }
        }
    },
    methods: {
        ...Vuex.mapActions("personnes", [
            "ajouter_personne",
            "modifier_personne",
            "supprimer_personne"
        ]),
        prepareDesign(actif) {
            this.design.bouton.ajouter = ["btn", "col-sm-3"];
            this.design.bouton.modifier = ["btn", "col-sm-3"];
            this.design.bouton.supprimer = ["btn", "col-sm-3"];

            if (actif) {
                this.design.bouton.ajouter.push("btn-secondary");
                this.design.bouton.modifier.push("btn-warning");
                this.design.bouton.supprimer.push("btn-danger");
            } else {
                this.design.bouton.ajouter.push("btn-success");
                this.design.bouton.modifier.push("btn-secondary");
                this.design.bouton.supprimer.push("btn-secondary");
            }
        },
        validation(){
            let surnomOk = true;
            let prenomOk = true;
            let nomOk = true;
            let ddnOk = true;
            
            surnomOk &= this.surnom !== null && this.surnom !== undefined;
            if(!surnomOk) this.errors.surnom = {afficher: true, motif: "Le surnom ne peut être vide"}
            else this.errors.surnom.afficher = false;

            prenomOk &= this.prenom !== null && this.prenom !== undefined;
            if(!prenomOk) this.errors.prenom = {afficher: true, motif: "Le prénom ne peut être vide"}
            else this.errors.prenom.afficher = false;
            
            nomOk &= this.nom !== null && this.nom !== undefined;
            if(!nomOk) this.errors.nom = {afficher: true, motif: "Le nom ne peut être vide"}
            else this.errors.nom.afficher = false;
            
            ddnOk &= this.ddn !== null && this.ddn !== undefined;
            if(!ddnOk) this.errors.ddn = {afficher: true, motif: "La date de naissance ne peut être vide"}
            else this.errors.ddn.afficher = false;

            return surnomOk && prenomOk && nomOk && ddnOk;
        },
        ajouterPersonne() {
            if (this.activerModification || !this.validation()) return;
            this.ajouter_personne({
                surnom: this.surnom,
                nom: this.nom,
                prenom: this.prenom,
                dateNaissance: new Date(this.ddn),
            });
        },
        modifierPersonne() {
            if (!this.activerModification) return;
            this.modifier_personne({
                index: this.getId,
                surnom: this.surnom,
                nom: this.nom,
                prenom: this.prenom,
                dateNaissance: new Date(this.ddn),
            });
        },
        supprimerPersonne() {
            if (!this.activerModification) return;
            this.supprimer_personne(this.getId);
        }
    },
    components: {
        Message
    }
};
</script>  

<style> /* scoped */
#detail-part {
    padding: 20px 20px 0px 20px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}

form .btn {
    margin: 5px 15px;
}

.message-perso {
    margin: 5px 0 0 0;
}
</style>
