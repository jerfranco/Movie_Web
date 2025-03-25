<script>
  import { onMount } from "svelte";
  const API_KEY = "a55bc385"; // Your activated API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let sciFiMovies = $state([]);
  let isLoading = $state(true);
  let error = $state(null);

  onMount(async () => {
    try {
      sciFiMovies = await fetchSciFiMovies();
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

  async function fetchSciFiMovieDetails(imdbID) {
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

  async function fetchSciFiMovies() {
    const allSciFiMovies = [
      "tt6263850", // Deadpool & Wolverine
      "tt18412256", // Alien: Romulus
      "tt14539740", // Godzilla x Kong: The New Empire
      "tt11097384", // Spaceman
      "tt10128846", // Megalopolis
      "tt14637386", // Parallel
      "tt24577462", // Afraid
      "tt11057302", // Madame Web
      "tt4978420", // Borderlands
      "tt7766378", // The Electric State
      "tt7892066", // Ayalaan
      "tt17375596", // The Empire
      // link for the 2024 scifi movies: https://www.imdb.com/list/ls528730642/
    ];

    const shuffledSciFiMovies = allSciFiMovies.sort(() => 0.5 - Math.random());
    const selectedSciFiMovies = shuffledSciFiMovies.slice(0, 12);

    const sciFiMovieList = [];
    for (const imdbID of selectedSciFiMovies) {
      try {
        const sciFiMovie = await fetchSciFiMovieDetails(imdbID);
        sciFiMovieList.push(sciFiMovie);
      } catch (error) {
        console.error(error.message);
      }
    }
    sciFiMovies = sciFiMovieList;
    return sciFiMovies;
  }
</script>


<div id="sciFiMovies">
    <h2>Popular Sci-Fi/Fantasy/Supernatural Movies of 2024</h2>
    {#if isLoading}
    <p>Loading movies...</p>
  {:else if error}
    <p style="color: red;">Error: {error}</p>
  {:else}
    <ul>
      {#each sciFiMovies as sciFiMovie}
        <li>
          <img src={sciFiMovie.Poster} alt={sciFiMovie.Title} />
          <h3>{sciFiMovie.Title}</h3>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
    #sciFiMovies {
      text-align: center;
      padding-top: 3%;
    }
  
    #sciFiMovies ul {
      padding: 0;
      width: 65%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-left: auto;
      margin-right: auto;
    }
  
    #sciFiMovies ul li {
      margin: 1rem;
  
      padding: 0.5rem;
    }
  
    #sciFiMovies img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }
  </style>