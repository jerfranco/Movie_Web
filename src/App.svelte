<script>
  import { onMount } from "svelte";
  import PopularMovies from "./components/PopularMovies.svelte";
  import HorrorMovies from "./components/HorrorGenre.svelte";
  import SciFiMovies from "./components/SciFiGenre.svelte";

  let showHorrorMovies = $state(false);
  let showSciFiMovies = $state(false);
</script>

<main>
    <div id="genre">
        <h3>Genre</h3>
        <a href="#" class="genre-item">
          <img src="src/images/action-genre.svg" alt="Action" />
          <span class="genre-label">Action</span>
        </a>
        <a href="#" class="genre-item">
          <img src="src/images/comedy-genre.svg" alt="Comedy" />
          <span class="genre-label">Comedy</span>
        </a>
        <!-- <a href="#" class="genre-item">
          <img src="src/images/horror-genre.svg" alt="Horror" />
          <span class="genre-label">Horror</span>
        </a> -->
        <a href="#" class="genre-item" on:click|preventDefault={() => showHorrorMovies = true}>
            <img src="src/images/horror-genre.svg" alt="Horror" />
            <span class="genre-label">Horror</span>
          </a>
        <!-- <a href="#" class="genre-item">
          <img src="src/images/sci_fi-genre.svg" alt="Sci-Fi" />
          <span class="genre-label">Sci-Fi</span>
        </a> -->
        <a href="#" class="genre-item" on:click|preventDefault={() => showSciFiMovies = true}>
            <img src="src/images/sci_fi-genre.svg" alt="Sci-Fi" />
            <span class="genre-label">Sci-Fi</span>
          </a>
      </div>

  <div id="searchMovie">
    <input
      type="text"
      id="search"
      name="search"
      placeholder="Enter Movie Name Here"
    />
    <button id="searchButton"><img src="src/images/searchIcon.png" /></button>
    <!-- <img src="images/searchIcon.png" alt="test"> -->
  </div>

  <div id="popMovies">
    {#if showHorrorMovies}
      <HorrorMovies />
    {:else if showSciFiMovies}
      <SciFiMovies />
    {:else}
      <PopularMovies />
    {/if}
  </div>
</main>
