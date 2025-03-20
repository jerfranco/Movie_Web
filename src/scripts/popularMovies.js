// const API_KEY = 'a55bc385'; // Your activated API key
// const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// export async function fetchMovieDetails(imdbID) {
//   const response = await fetch(`${API_URL}&i=${imdbID}`);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch movie details: ${response.status}`);
//   }
//   const data = await response.json();
//   if (data.Response === "False") {
//     throw new Error(`API error: ${data.Error}`);
//   }
//   return data;
// }

// export async function fetchPopularMovies() {
//   const allPopularMovies = [
//     'tt15239678', // Dune: Part Two
//     'tt8999762', // The Brutalist
//     'tt30321095', // Ghostlight
//     'tt5040012', // Nosferatu
//     'tt29623480', // The Wild Robot
//     'tt12037194', // Furiosa: A Mad Max Saga
//     'tt17526714', // The Substance
//     'tt21823606', // A Real Pain
//     'tt28491891', // His Three Daughters
//     'tt20215234', // Conclave
//     'tt26446278', // The Count of Monte-Cristo
//     'tt11687002', // The Outrun
//   ]; //this data is from IMDb using the ID for the movie

//   const shuffledMovies = allPopularMovies.sort(() => 0.5 - Math.random());
//   const selectedMovies = shuffledMovies.slice(0, 3);

//   const movies = [];
//   for (const imdbID of selectedMovies) {
//     try {
//       const movie = await fetchMovieDetails(imdbID);
//       movies.push(movie);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return movies;
// }