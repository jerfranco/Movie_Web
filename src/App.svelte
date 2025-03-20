<script>
  import { onMount } from "svelte";
  import PopularMovies from "./components/PopularMovies.svelte";
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
    <PopularMovies />
  </div>
</main>
