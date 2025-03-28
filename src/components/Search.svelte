<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import MovieDetails from "./MovieDetails.svelte";

  // export let searchQuery;
  const { searchQuery } = $props();
  const API_KEY = "93c9c418"; // Your API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let movies = $state([]);
  let error = $state(null);
  let isLoading = $state(false);
  let selectedMovie = $state(null); // this tracks the selected movie (details)
  let modalOpen = $state(false); // modal is the popup details of the movie

  export async function fetchMovies() {
    const search = get(searchQuery);
    if (!search) return;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=93c9c418&s=${search}`
    );
    const data = await response.json();
    console.log(data);
    movies = data.Search;
    console.log(movies);
  }

  async function showMovieDetails(imdbID) {
    modalOpen = true;
    selectedMovie = null; // Reset before loading new data
    try {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      if (data.Response === "False") throw new Error(data.Error);
      selectedMovie = data;
    } catch (err) {
      error = err.message;
    } finally {
      modalOpen = false;
    }
  }
</script>

<div id="popMovies">
  <h2>Search Results</h2>
  
  {#if isLoading}
    <p>Loading...</p>
  {:else if error}
    <p style="color: red;">{error}</p>
  {:else if movies.length === 0}
    <p>No movies found</p>
  {:else}
    <ul>
      {#each movies as movie}
        <li>
          <button
            type="button"
            class="movie-button"
            onclick={() => showMovieDetails(movie.imdbID)}
            onkeydown={(e) =>
              e.key === "Enter" && showMovieDetails(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title} ({movie.Year})</h3>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Popup -->
{#if selectedMovie}
  <MovieDetails movie={selectedMovie} onClose={() => (selectedMovie = null)} />
{/if}

<style>
  #popMovies {
    text-align: center;
    padding-top: 3%;
  }

  #popMovies ul {
    padding: 0;
    width: 65%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: auto;
    margin-right: auto;
  }

  #popMovies ul li {
    margin: 1rem;

    padding: 0.5rem;
  }

  #popMovies img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .movie-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    text-align: left;
    cursor: pointer;
    width: 100%;
  }

  /* Styling for the poster */
  #popMovies ul li {
    cursor: pointer;
    transition: transform 0.2s;
  }

  #popMovies ul li:hover {
    transform: scale(1.03);
  }
</style>
