<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  export let searchQuery;

  let movies = [];

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
</script>

<div id="popMovies">
  <h2>Search Results</h2>
  <ul>
    {#each movies as movie}
      <li>
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
      </li>
    {/each}
  </ul>
</div>

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
</style>
