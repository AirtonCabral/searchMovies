<template>
  <div class="about">
    <MovieCard :movies="favoriteMovies" />
  </div>
</template>

<script>
import movieCard from "@/components/movieCard";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    MovieCard: movieCard,
  },
  computed: {
    ...mapGetters(["favoriteMovies"]),
  },
};
</script>
