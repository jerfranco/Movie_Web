<script>
  import { gfg } from "../scripts/stars.js";
  import { supabase } from "../scripts/supabase";
  import { onMount } from "svelte";

  let watchlist = [];
  let loading = true;
  let error = null;

  // Fetch user's watchlist (now a reusable function)
  async function fetchWatchlist() {
    loading = true;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: fetchError } = await supabase
        .from("watchlist")
        .select("*")
        .eq("user_id", user.id);

      if (fetchError) throw fetchError;
      watchlist = data || [];
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // Load watchlist on mount
  onMount(fetchWatchlist);

  // Delete movie
  async function deleteMovie(movieId) {
    if (confirm('Are you sure you want to remove this from your watchlist?')) {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('movie_id', movieId);
      
      if (error) {
        alert('Error deleting movie');
      } else {
        fetchWatchlist();
      }
    }
  }
</script>

<main id="dashMain">
  <h2>Watchlist</h2>
  {#if loading}
    <p>Loading your watchlist...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if watchlist.length === 0}
    <p id="empty">Your watchlist is empty</p>
  {:else}
    <div id="watchlist">
      <ul id="watchHeading">
        <!-- <li>Poster</li> -->
        <li>Title</li>
        <li>Year</li>
        <li>Action</li>
      </ul>

      {#each watchlist as movie}
        <ul>
          <!-- <li>
            {#if movie.poster}
              <img src={movie.poster} alt={movie.title} width="50" />
            {:else}
              No poster
            {/if}
          </li> -->
          <li>{movie.title}</li>
          <li>{movie.year}</li>
          <li>
            <button 
      on:click={() => deleteMovie(movie.movie_id)} 
      class="delete-btn"
      title="Remove from watchlist"
    >
      Remove from Watchlist
    </button>
          </li>
        </ul>
      {/each}
    </div>
  {/if}
</main>

<style>
  .error {
    color: #e63946;
    font-weight: 600;
    margin: 0.5rem 0;
    text-align: center;
    font-family: 'Inter', sans-serif;
  }

  .delete-btn {
    background: #2563EB;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .delete-btn:hover {
    background: #1b48aa;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .delete-btn:active {
    transform: scale(0.98);
  }
</style>

