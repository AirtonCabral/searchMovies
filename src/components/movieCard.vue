<template>
  <div id="Homeview">
    <v-card v-for="movie in movies" :key="movie.imdbID">
      <v-btn icon>
        <v-icon v-if="movie.favorite" @click="removeFavoriteMovies(movie)">
          mdi-heart
        </v-icon>
        <v-icon v-else @click="addFavoriteMovies(movie)"> mdi-heart-outline </v-icon>
      </v-btn>
      <v-img :src="movie.Poster" height="200px" />
      <v-card-title>{{ movie.Title }} </v-card-title>
      <v-card-subtitle> {{ movie.Type }} / {{ movie.Year }} </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-rating
          v-model="movie.rating"
          disabled
          background-color="white"
          color="yellow accent-4"
          dense
          half-increments
          hover="false"
          size="16"
        ></v-rating>
        <v-spacer></v-spacer>
        <span class="grey--text text--lighten-2 text-caption">
          ({{ movie.rating }})
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "movieCard",
  props: {
    movies: {
      Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getMovieRating");
  },
  methods: {
    addFavoriteMovies(movie) {
      this.$store.dispatch("addFavoriteMovies", movie);
    },
    removeFavoriteMovies(movie) {
      this.$store.dispatch("removeFavoriteMovies", movie);
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
	.v-card
		margin: 10px
		.v-card__subtitle
			text-align: left
		.v-btn--icon
			color: white
			position: absolute
			top: 5px
			right: 0%
			z-index: 9999
		.v-card__actions
			position: sticky
			top: 100%
			pointer-events: none
</style>
