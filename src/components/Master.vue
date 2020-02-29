<template>
    <div id="master-part">
        <div class="">
            <div class="list-group "><!-- list-group-flush -->
                <MasterItem v-for="(p, index) in getListePersonnes" :key="index" :personne="p" :id="index"/>
            </div>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex'

import MasterItem from './MasterItem';

export default {
  name: "Master",
  components: {
    MasterItem
  },
  computed: {
      ...Vuex.mapGetters('personnes', {
          getListePersonnes: 'getListe'
      })
  },

  watch: {
      getListePersonnes: {
          handler: function(newListe) {
              console.log(newListe);
          },
          deep: true
      }
  },
};
</script>  
