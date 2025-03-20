<script>
  import { onMount } from "svelte";
  import PopularMovies from "./components/PopularMovies.svelte";
  import Search from './components/Search.svelte';
  import { writable } from 'svelte/store';

    // Create a writable store for the search query
    export let searchQuery = writable("");
    let searchComponent;

    async function handleSearch() {
        searchQuery.set(document.getElementById('search').value);
        await searchComponent.fetchMovies();
    }
</script>

<main>
  <div id="genre">
    <h3>Genre</h3>
    <a href="#"><img src="src/images/action-genre.svg" alt="Action Genre" /></a>
    <a href="#"><img src="src/images/comedy-genre.svg" alt="Comedy Genre" /></a>
    <a href="#"><img src="src/images/horror-genre.svg" alt="Horror Genre" /></a>
    <a href="#"><img src="src/images/sci_fi-genre.svg" alt="Sci-Fi Genre" /></a>
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
  
  </div>
</main>
