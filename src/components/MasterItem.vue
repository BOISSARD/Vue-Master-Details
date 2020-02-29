<template>
    <button type="button" :class="design.bouton" @click="clickEvent">
        {{ personne.surnom }}
        {{ personne }}
        <span :class="design.badge">2</span>
    </button>
</template>

<script>
import Vuex from 'vuex'

import Personne from "../model/Personne";

export default {
    name: "MasterItem",
    props: {
        id: Number,
        personne: Personne
    },
    data() {
        return {
            design: {
                bouton: [],
                badge: []
            },
            actif: false
        };
    },
    computed: {
        ...Vuex.mapGetters('personnes', ['getSelectedId'])
    },
    watch: {
        actif(booleen) {
            this.prepareDesign(booleen);
        },
        getSelectedId(selectId) {
            this.actif = this.id === selectId;
        }
    },
    created() {
        this.prepareDesign(this.actif);
    },
    methods: {
        ...Vuex.mapActions('personnes', ['select_id', 'deselect_id']),
        prepareDesign(actif) {
            this.design.bouton = [
                "list-group-item",
                "list-group-item-action",
                "d-flex",
                "justify-content-between"
            ];
            this.design.badge = ["badge", "badge-pill", "ml-3"];
            if (actif) {
                this.design.bouton.push("active");
                this.design.badge.push("badge-light text-primary");
            } else {
                this.design.bouton.push("text-primary");
                this.design.badge.push("badge-primary");
            }
        },
        clickEvent() {
            this.actif = !this.actif;
            this.actif ? this.select_id(this.id) : this.deselect_id();
        }
    }
};
</script>  