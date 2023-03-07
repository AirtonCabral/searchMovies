<template>
  <div id="Homeview">
    <div class="search">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="title" label="Title" required />

        <v-btn @click="getMoviesPage(-1)" :disabled="page == 1" color="blue" fab x-small>
          <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
        </v-btn>
        {{ this.page }} / {{ Math.ceil(totalResults / 10) }}
        <v-btn
          @click="getMoviesPage(+1)"
          :disabled="page == Math.ceil(totalResults / 10)"
          color="blue"
          fab
          x-small
        >
          <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
        </v-btn>
        <v-btn color="blue" class="mr-4 py-4" @click="getMovies()"> Search </v-btn>
      </v-form>
    </div>
    <p v-if="isLoading">Loading data...</p>
    <MovieCard v-else :movies="movies" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import movieCard from "@/components/movieCard";

export default {
  name: "HomeView",
  components: {
    MovieCard: movieCard,
  },
  data() {
    return {
      title: "",
      page: 1,
    };
  },
  created() {
    this.$store.dispatch("getMovies");
  },
  computed: {
    ...mapGetters(["movies", "isLoading", "totalResults", "favoriteMovies"]),
  },
  methods: {
    getMovies() {
      let params = {
        title: this.title,
        page: this.page,
      };
      this.$store.dispatch("getMovies", params);
    },
    getMoviesPage(boo) {
      this.page = this.page + boo;
    },
  },
};
</script>
<style lang="sass">
#Homeview
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: flex-start
  align-items: stretch
  width: 95%
  margin: 0 auto
  .search
    width: 100%
  .v-card
    margin: 5px
    width: 19%
    .v-card__subtitle
      text-align: left
  .v-form
    width: 50%
    display: flex
    align-items: center
    margin: 15px
    .v-btn
      margin-left: 15px
</style>
