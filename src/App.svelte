<script>
  import { onMount } from "svelte";
  import { supabase } from "./scripts/supabase";
  import PopularMovies from "./components/PopularMovies.svelte";

  let user = null;

  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    user = data.user;

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
    });
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    user = null;
    window.location.reload(); // Refresh to update UI
  }
</script>

<main>
  {#if user}
    <p>Welcome, {user.email}!</p>
  {/if}

  <div id="genre">
    <h3>Genre</h3>
    <a href="#"><img src="src/images/action-genre.svg" alt="Action Genre" /></a>
    <a href="#"><img src="src/images/comedy-genre.svg" alt="Comedy Genre" /></a>
    <a href="#"><img src="src/images/horror-genre.svg" alt="Horror Genre" /></a>
    <a href="#"><img src="src/images/sci_fi-genre.svg" alt="Sci-Fi Genre" /></a>
  </div>

  <div id="searchMovie">
    <input type="text" id="search" name="search" placeholder="Enter Movie Name Here" />
    <button id="searchButton"><img src="src/images/searchIcon.png" /></button>
  </div>

  <div id="popMovies">
    <PopularMovies />
  </div>
</main>
