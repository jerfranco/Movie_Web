<script>
  import { onMount } from "svelte";
  import PopularMovies from "./components/PopularMovies.svelte";
  import Search from './components/Search.svelte';
  import RandomMovies from './components/RandomMovies.svelte';
  import { writable } from 'svelte/store';

  export let searchQuery = writable("");
  let searchComponent;
  let randomMoviesComponent;
  let genreMovies = [];
  let isLoading = false;
  let error = null;

  const API_KEY = "a55bc385"; // Your activated API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  async function handleSearch() {
    searchQuery.set(document.getElementById('search').value);
    await searchComponent.fetchMovies();
  }

  async function fetchMoviesByGenre(genre) {
    try {
      isLoading = true;
      error = null;
      const response = await fetch(`${API_URL}&s=${genre}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(`API error: ${data.Error}`);
      }
      genreMovies = data.Search || [];
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<main>
  <div id="genre">
    <h3>Genre</h3>
    <a href="#" on:click={() => randomMoviesComponent.fetchMoviesByGenre('action')}><img src="src/images/action-genre.svg" alt="Action Genre" /></a>
    <a href="#" on:click={() => randomMoviesComponent.fetchMoviesByGenre('comedy')}><img src="src/images/comedy-genre.svg" alt="Comedy Genre" /></a>
    <a href="#" on:click={() => randomMoviesComponent.fetchMoviesByGenre('horror')}><img src="src/images/horror-genre.svg" alt="Horror Genre" /></a>
    <a href="#" on:click={() => randomMoviesComponent.fetchMoviesByGenre('sci-fi')}><img src="src/images/sci_fi-genre.svg" alt="Sci-Fi Genre" /></a>
  </div>
  <div id="searchMovie">
    <input type="text" id="search" name="search" placeholder="Enter Movie Name Here" bind:value={$searchQuery}>
    <button id="searchButton" on:click={handleSearch}>
        <img src="src/images/searchIcon.png">
    </button>
  </div>
  <div id="popMovies">
    <Search bind:this={searchComponent} {searchQuery} />
    <PopularMovies />
    <RandomMovies bind:this={randomMoviesComponent} />
    {#if isLoading}
      <p>Loading movies...</p>
    {:else if error}
      <p style="color: red;">Error: {error}</p>
    {:else if genreMovies.length > 0}
      <ul>
        {#each genreMovies as movie}
          <li>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>

<style>
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
</style>
