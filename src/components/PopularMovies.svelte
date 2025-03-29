<script>
  import { onMount } from "svelte";
  import MovieDetails from "./MovieDetails.svelte";
  
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let movies = $state([]);
  let isLoading = $state(true);
  let error = $state(null);
  let selectedMovie = $state(null); // this tracks the selected movie (details)
  let modalOpen = $state(false); // modal is the popup details of the movie

  onMount(async () => {
    try {
      movies = await fetchPopularMovies();
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

  async function fetchMovieDetails(imdbID) {
    const response = await fetch(`${API_URL}&i=${imdbID}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(`API error: ${data.Error}`);
    }
    return data;
  }

  async function fetchPopularMovies() {
    const allPopularMovies = [
      "tt15239678", // Dune: Part Two
      "tt8999762", // The Brutalist
      "tt30321095", // Ghostlight
      "tt5040012", // Nosferatu
      "tt29623480", // The Wild Robot
      "tt12037194", // Furiosa: A Mad Max Saga
      "tt17526714", // The Substance
      "tt21823606", // A Real Pain
      "tt28491891", // His Three Daughters
      "tt20215234", // Conclave
      "tt26446278", // The Count of Monte-Cristo
      "tt11687002", // The Outrun
    ]; //this data is from IMDb using the ID for the movie

    const shuffledMovies = allPopularMovies.sort(() => 0.5 - Math.random());
    const selectedMovies = shuffledMovies.slice(0, 3);

    const movieList = [];
    for (const imdbID of selectedMovies) {
      try {
        const movie = await fetchMovieDetails(imdbID);
        movieList.push(movie);
      } catch (error) {
        console.error(error.message);
      }
    }
    movies = movieList;
    return movies;
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
  <h2>Popular Movies of 2024</h2>
  {#if isLoading}
    <p>Loading movies...</p>
  {:else if error}
    <p style="color: red;">Error: {error}</p>
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
            <h3>{movie.Title}</h3>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<!-- Popup -->
{#if selectedMovie}
  <MovieDetails 
    movie={selectedMovie} 
    onClose={() => selectedMovie = null} 
  />
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
