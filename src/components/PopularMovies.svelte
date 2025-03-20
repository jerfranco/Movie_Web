<script>
  import { onMount } from "svelte";
  const API_KEY = "a55bc385"; // Your activated API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let movies = $state([]);
  let isLoading = $state(true);
  let error = $state(null);

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
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
        </li>
      {/each}
    </ul>
  {/if}
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
