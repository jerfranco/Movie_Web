<script>
  import { onMount } from "svelte";
  import MovieDetails from "./MovieDetails.svelte";

  const API_KEY = "a55bc385"; // Your activated API key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  let displayedMovies = $state([]);
  let isLoading = $state(false);
  let error = $state(null);
  let genreTitle = $state("Random Movies");
  let selectedMovie = $state(null); // this tracks the selected movie (details)
  let modalOpen = $state(false); // modal is the popup details of the movie

  const movieIDs = [
    "tt6263850", // Moonfall
    "tt4919268", // The Northman
    "tt17279496", // The Marvels
    "tt1684562", // The Flash
    "tt15239678", // Dune: Part Two
    "tt12037194", // Furiosa
    "tt14539740", // Oppenheimer
    "tt3083016", // John Wick: Chapter 4
    "tt9218128", // The Batman
    "tt23778968", // Barbie
  ];
  const actionMovieIDs = [
    "tt6263850", // Deadpool & Wolverine
    "tt4919268", // Bad Boys: Ride or Die
    "tt17279496", // Civil War
    "tt1684562", // The Fall Guy
    "tt15239678", // Dune: Part Two
    "tt12037194", // Furiosa: A Mad Max Saga
    "tt14539740", // Godzilla x Kong: The New Empire
    "tt3083016", // Beverly Hills Cop: Axel F
    "tt9218128", // Gladiator II
    "tt23778968", // Thelma
    "tt11301886", // Rebel Ridge
    "tt3359350", // Road House
    "tt0327785", // The Killer's Game
    "tt15314262", // The Beekeeper
    "tt12584954", // Twisters
    "tt11389872", // Kingdom of the Planet of the Apes
    "tt9214772", // Monkey Man
    "tt20115766", // Knox Goes Away
    "tt21382296", // Carry-On
    "tt14371878", // Lift
  ];
  const comedyMovieIDs = [
    "tt6263850", // Deadpool & Wolverine
    "tt20215968", // Hit Man
    "tt11762114", // Mean Girls
    "tt3083016", // Beverly Hills Cop: Axel F
    "tt27657135", // Saturday Night
    "tt19356262", // Drive-Away Dolls
    "tt21188080", // Lisa Frankenstein
    "tt23778968", // Thelma
    "tt21823606", // A Real Pain
    "tt1684562", // The Fall Guy
    "tt21270966", // Scrambled
    "tt4919268", // Bad Boys: Ride or Die
    "tt21284218", // Incoming
    "tt21276958", // Babes
    "tt2049403", // Beetlejuice Beetlejuice
    "tt12444168", // Don't Tell Mom the Babysitter's Dead
    "tt1660648", // Ricky Stanicky
    "tt21235248", // Ghostbusters: Frozen Empire
    "tt30007864", // The American Society of Magical Negroes
    "tt21434318", // The Underdoggs
  ];
  const horrorMovieIDs = [
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
    "tt15574270", // I Saw the TV Glow
    "tt14088510", // Tarot
    "tt22050754", // The Strangers: Chapter 1
    "tt30321146", // In a Violent Nature
    "tt13964390", // Under Paris
    "tt26736843", // The Watchers
    "tt2118648", // Handling the Undead
    "tt11240348", // The Exorcism
  ];
  const sciFiMovieIDs = [
    "tt18412256", // Alien: Romulus
    "tt8228288", // The Platform
    "tt27729779", // The Platform 2
    "tt6263850", // Deadpool & Wolverine
    "tt16366836", // Venom: The Last Dance
    "tt1630029", // Avatar: The Way of Water
    "tt0499549", // Avatar
    "tt8790086", // Kraven the Hunter
    "tt14549466", // Crimes of the Future
    "tt10676048", // The Marvels
    "tt13433802", // A Quiet Place: Day One
    "tt8332922", // A Quiet Place Part II
    "tt6644200", // A Quiet Place
    "tt2015381", // Guardians of the Galaxy
    "tt3896198", // Guardians of the Galaxy Vol. 2
    "tt6791350", // Guardians of the Galaxy Vol. 3
    "tt11389872", // Kingdom of the Planet of the Apes
    "tt12037194", // Furiosa: A Mad Max Saga
    "tt8760708", // M3GAN
    "tt12361974", // Zack Snyder's Justice League
  ];

  async function fetchMoviesByGenre(genre) {
    try {
      isLoading = true;
      error = null;

      // Update the genre title
      genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1);

      let genreList;
      switch (genre) {
        case "action":
          genreList = actionMovieIDs;
          break;
        case "comedy":
          genreList = comedyMovieIDs;
          break;
        case "horror":
          genreList = horrorMovieIDs;
          break;
        case "sci-fi":
          genreList = sciFiMovieIDs;
          break;
        default:
          genreList = movieIDs;
          genreTitle = "Random Movies"; // Reset title for default
      }
      const shuffledMovies = genreList.sort(() => 0.5 - Math.random());
      const selectedMovies = shuffledMovies.slice(0, 9);

      const movieList = [];
      for (const imdbID of selectedMovies) {
        try {
          const movie = await fetchMovieDetails(imdbID);
          movieList.push(movie);
        } catch (error) {
          console.error(error.message);
        }
      }
      displayedMovies = movieList;
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  }

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

  export { fetchMoviesByGenre };
</script>

<div id="randomMovies">
  <h2>{genreTitle}</h2>

  {#if isLoading}
    <p>Loading movies...</p>
  {:else if error}
    <p style="color: red;">Error: {error}</p>
  {:else if displayedMovies.length > 0}
    <ul>
      {#each displayedMovies as movie}
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
  <MovieDetails movie={selectedMovie} onClose={() => (selectedMovie = null)} />
{/if}

<style>
  #randomMovies {
    text-align: center;
    padding-top: 3%;
  }

  #randomMovies ul {
    padding: 0;
    width: 65%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: auto;
    margin-right: auto;
  }

  #randomMovies ul li {
    margin: 1rem;
    padding: 0.5rem;
  }

  #randomMovies img {
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
  #randomMovies ul li {
    cursor: pointer;
    transition: transform 0.2s;
  }

  #randomMovies ul li:hover {
    transform: scale(1.03);
  }
</style>
