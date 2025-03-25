<script>
  import { onMount } from "svelte";
  const API_KEY = "a55bc385"; // Your activated API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let horrorMovies = $state([]);
  let isLoading = $state(true);
  let error = $state(null);

  onMount(async () => {
    try {
      horrorMovies = await fetchHorrorMovies();
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

  async function fetchHorrorMovieDetails(imdbID) {
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

  async function fetchHorrorMovies() {
    const allHorrorMovies = [
      "tt9682428", // Night Swim
      "tt21188080", // Lisa Frankenstein
      "tt26658104", // Imaginary
      "tt23137390", // Immaculate
      "tt23330554", // Winnie-the-Pooh: Blood and Honey 2
      "tt5672290", // The First Omen
      "tt20112746", // Sting
      "tt22939186", // Arcadian
      "tt27489557", // Abigail
      "tt16280912", // Humane
      "tt13899250", // Bloodline Killer
      "tt28763074", // Dancing Village: The Curse Begins
      // link for the 2024 horror movies: https://www.imdb.com/list/ls569954808/
    ];

    const shuffledHorrorMovies = allHorrorMovies.sort(() => 0.5 - Math.random());
    const selectedHorrorMovies = shuffledHorrorMovies.slice(0, 12);

    const horrorMovieList = [];
    for (const imdbID of selectedHorrorMovies) {
      try {
        const horrorMovie = await fetchHorrorMovieDetails(imdbID);
        horrorMovieList.push(horrorMovie);
      } catch (error) {
        console.error(error.message);
      }
    }
    horrorMovies = horrorMovieList;
    return horrorMovies;
  }
</script>


<div id="horrorMovies">
    <h2>Popular Horror Movies of 2024</h2>
    {#if isLoading}
    <p>Loading horror movies...</p>
  {:else if error}
    <p style="color: red;">Error: {error}</p>
  {:else}
    <ul>
      {#each horrorMovies as horrorMovie}
        <li>
          <img src={horrorMovie.Poster} alt={horrorMovie.Title} />
          <h3>{horrorMovie.Title}</h3>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
    #horrorMovies {
      text-align: center;
      padding-top: 3%;
    }
  
    #horrorMovies ul {
      padding: 0;
      width: 65%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-left: auto;
      margin-right: auto;
    }
  
    #horrorMovies ul li {
      margin: 1rem;
  
      padding: 0.5rem;
    }
  
    #horrorMovies img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }
  </style>