<template>
    <div id="detail-part">
        <form id="formulaire">
            <div class="form-group row">
                <label for="formSurnom" class="col-sm-2 col-form-label">Surnom</label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formSurnom"
                        placeholder="Surnom"
                        v-model="surnom"
                    />
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
                </div>
            </div>
            <div class="form-group row d-flex justify-content-around">
                <button
                    type="button"
                    @click="ajouterPersonne()"
                    class="btn btn-success col-sm-3"
                >Ajouter</button>
                <button
                    type="button"
                    @click="modifierPersonne()"
                    :class="design.bouton.modifier"
                    :disabled="!activerBoutons"
                >Modifier</button>
                <button
                    type="button"
                    @click="supprimerPersonne()"
                    :class="design.bouton.supprimer"
                    :disabled="!activerBoutons"
                >Supprimer</button>
                <!---->
                <!--<input type="submit" @click="ajouterPersonne()" class="btn btn-success col-sm-3" value="Ajouter">
                <input type="submit" @click="modifierPersonne()" class="btn col-sm-3" value="Modifier" :class="activerBoutons ? 'btn-secondary' : 'btn-warning'" :disabled="activerBoutons">
                <input type="submit" @click="supprimerPersonne()" class="btn col-sm-3" value="Supprimer" :class="activerBoutons ? 'btn-secondary' : 'btn-danger'" :disabled="activerBoutons">
                <input type="hidden" id="formId" v-model="personneForm.id">-->
            </div>
        </form>
    </div>
</template>

<script>
import Vuex from "vuex";

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
                    modifier: [],
                    supprimer: []
                }
            }
        };
    },
    computed: {
        ...Vuex.mapGetters("personnes", {
            getPersonne: "getPersonne",
            getId: "getSelectedId"
        }),
        activerBoutons() {
            return this.getId !== null;
        }
    },
    watch: {
        activerBoutons: {
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
            this.design.bouton.modifier = ["btn", "col-sm-3"];
            this.design.bouton.supprimer = ["btn", "col-sm-3"];

            if (actif) {
                this.design.bouton.modifier.push("btn-warning");
                this.design.bouton.supprimer.push("btn-danger");
            } else {
                this.design.bouton.modifier.push("btn-secondary");
                this.design.bouton.supprimer.push("btn-secondary");
            }
        },
        ajouterPersonne() {
            this.ajouter_personne({
                surnom: this.surnom,
                nom: this.nom,
                prenom: this.prenom,
                dateNaissance: new Date(this.ddn),
            });
        },
        modifierPersonne() {
            if (!this.activerBoutons) return;
            this.modifier_personne({
                index: this.getId,
                surnom: this.surnom,
                nom: this.nom,
                prenom: this.prenom,
                dateNaissance: new Date(this.ddn),
            });
        },
        supprimerPersonne() {
            if (!this.activerBoutons) return;
            this.supprimer_personne(this.getId);
        }
    }
};
</script>  

<style>
#detail-part {
    padding: 20px 20px 0px 20px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}

form .btn {
    margin: 5px 15px;
}
</style>
