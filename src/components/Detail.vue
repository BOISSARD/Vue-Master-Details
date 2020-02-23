<template>
    <div id="detail-part">
        <form id="formulaire" @submit.prevent="validation()">
            <div class="form-group row">
                <label for="formSurnom" class="col-sm-2 col-form-label">Surnom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="formSurnom" placeholder="Surnom">
                </div>
            </div>
            <div class="form-group row">
                <label for="formPrenom" class="col-sm-2 col-form-label">Prénom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="formPrenom" placeholder="Prénom">
                </div>
            </div>
            <div class="form-group row">
                <label for="formNom" class="col-sm-2 col-form-label">Nom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="formNom" placeholder="Nom">
                </div>
            </div>
            <div class="form-group row">
                <label for="formDateNaissance" class="col-sm-4 col-form-label">Date naissance</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="formDateNaissance" placeholder="Date naissance">
                </div>
            </div>
            <div class="form-group row d-flex justify-content-around">
                <!--button type="button" id="form-add" class="btn btn-primary col-sm-3">Submit</button-->
                <input type="submit" @click="ajouterPersonne()" class="btn btn-success col-sm-3 col-lg-4" value="Ajouter">
                <!--button type="button" @click="modifierPersonne()" class="btn btn-outline-primary col-sm-3 col-md-4">Modifier</button-->
                <input type="submit" @click="modifierPersonne()" class="btn btn-warning col-sm-3 col-lg-4" value="Modifier">
                <input type="submit" @click="supprimerPersonne()" class="btn btn-danger col-sm-3 col-lg-4" value="Supprimer">
                <input type="hidden" id="formId" value="-1">
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: "master",
    methods: {
        validation(event){
            console.log("validation",event.target);
        },
        ajouterPersonne(event){
            console.log("ajouter",event.target);
            const p = {
                nom: event.target.form["formNom"].value,
                prenom: event.target.form["formPrenom"].value,
                surnom: event.target.form["formSurnom"].value,
                datenaissance: event.target.form["formDateNaissance"].value,
            };
            this.$store.dispatch("ajouterPersonne", p);
        },
        modifierPersonne(event){
            const p = {
                nom: event.target.form["formNom"].value,
                prenom: event.target.form["formPrenom"].value,
                surnom: event.target.form["formSurnom"].value,
                datenaissance: event.target.form["formDateNaissance"].value,
            };
            this.$store.dispatch("modifierPersonne", p);
        },
        supprimerPersonne(event){
            const p = {
                nom: event.target.form["formNom"].value,
                prenom: event.target.form["formPrenom"].value,
                surnom: event.target.form["formSurnom"].value,
                datenaissance: event.target.form["formDateNaissance"].value,
            };
            this.$store.dispatch("supprimerPersonne", p);
        }
    }
};
</script>  

<style>
    #detail-part {
        padding: 20px 20px 0px 20px; 
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius:  0.25rem;
    }
    
    form .btn{
        margin: 5px 15px;
    }
</style>
