import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies")) ?? [],
    totalResults: 0,
    isLoading: false
  },
  getters: {
    movies: state => state.movies,
    favoriteMovies: state => state.favoriteMovies,
    totalResults: state => state.totalResults,
    isLoading: state => state.isLoading
  },
  mutations: {
    SET_MOVIES: ( state, payload ) => state.movies = payload,
    SET_FAVORITEMOVIES: ( state, payload ) => state.favoriteMovies = payload,
    SET_TOTALRESULTS: ( state, payload ) => state.totalResults = payload,
    SET_ISLOADING: ( state, payload ) => state.isLoading = payload
  },
  actions: {
    async getMovies({commit}, params) {
      this.commit('SET_ISLOADING', true)
      const api_url = "https://www.omdbapi.com/";
      const api_key = "369e003e";

      if(!params){
        params = {
          title: 'Alien',
          page: 1
        }
      }
      if(params.title == "") {
        params.title = 'Alien'
      }
      
      params.title == "" ? 'Alien' : params.title

      const response = await axios.get(`${api_url}?apikey=${api_key}&s=${params.title}&page=${params.page}`)
      const searchData = response.data.Search
      for (let index = 0; index < searchData.length; index++) {
        searchData[index].favorite = false
        searchData[index].rating = 0
      }
      const favStorage = JSON.parse(localStorage.getItem("favoriteMovies"))
      if(favStorage){
        for (let index = 0; index < favStorage.length; index++) {
          for (let i = 0; i < searchData.length; i++) {
            if(favStorage[index].imdbID === searchData[i].imdbID) {
              searchData[i].favorite = true
            }
          }
        }
      }
      commit('SET_MOVIES', response.data.Search)
      commit('SET_TOTALRESULTS', response.data.totalResults)
      commit('SET_ISLOADING', false)
    },
    async getMovieRating() {
      const api_url = "https://www.omdbapi.com/";
      const api_key = "369e003e";
      /* eslint-disable */ 
      debugger
      const data = this.state.movies
      for (let index = 0; index < data.length; index++) {
        const response = await axios.get(`${api_url}?apikey=${api_key}&i=${data[index].imdbID}`)
        console.log(response.data.imdbRating)
        data[index].rating = response.data.imdbRating / 2
      }
    },
    addFavoriteMovies({commit}, data) {
      data.favorite = true
      let newData = [data, ...this.state.favoriteMovies]
      
      localStorage.setItem("favoriteMovies", JSON.stringify(newData))
      commit('SET_FAVORITEMOVIES', newData)
    },
    removeFavoriteMovies({commit}, data) {
      data.favorite = false
      let newData = this.state.favoriteMovies.filter( x => x.imdbID !== data.imdbID)
      
      localStorage.setItem("favoriteMovies", JSON.stringify(newData));
      commit('SET_FAVORITEMOVIES', newData)
    }
  }
})
