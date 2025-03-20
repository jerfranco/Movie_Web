<script>
  import { onMount } from "svelte";
  import fetchPopularMovies from './components/PopularMovies.svelte';

//   let movies = [];
//   let isLoading = true;
//   let error = null;

//   onMount(async () => {
//     try {
//       movies = await fetchPopularMovies();
//     } catch (err) {
//       error = err.message;
//     } finally {
//       isLoading = false;
//     }
//   });
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
  <!-- <div id="popMovies">
    <h2>Popular Movies of 2024</h2>
    {#if isLoading}
      <p>Loading movies...</p>
    {:else if error}
      <p style="color: red;">Error: {error}</p>
    {:else}
      <ul>
        {#each movies as movie}
          <li>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
          </li>
        {/each}
      </ul>
    {/if}
  </div> -->
</main>

<!-- <style>
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
  </style> -->