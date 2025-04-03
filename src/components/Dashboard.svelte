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

  // Update watched status
  async function toggleWatched(movieId, isWatched) {
    const { error } = await supabase
      .from("watchlist")
      .update({ watched: isWatched })
      .eq("movie_id", movieId);

    if (error) alert("Error updating status");
    else fetchWatchlist(); // Refresh the list
  }

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
    <p>Your watchlist is empty</p>
  {:else}
    <div id="watchlist">
      <ul id="watchHeading">
        <li>Poster</li>
        <li>Title</li>
        <li>Year</li>
        <li>Watched?</li>
      </ul>

      {#each watchlist as movie}
        <ul>
          <li>
            {#if movie.poster}
              <img src={movie.poster} alt={movie.title} width="50" />
            {:else}
              No poster
            {/if}
          </li>
          <li>{movie.title}</li>
          <li>{movie.year}</li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={movie.watched || false}
                on:change={() => toggleWatched(movie.movie_id, !movie.watched)}
              />
              Watched
            </label>
            <button 
      on:click={() => deleteMovie(movie.movie_id)} 
      class="delete-btn"
      title="Remove from watchlist"
    >
      Delete
    </button>
          </li>
        </ul>
      {/each}
    </div>
  {/if}
</main>

<style>
  .error {
    color: red;
  }
  #watchlist img {
    max-height: 75px;
  }

  .delete-btn {
    background: #ff4757;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .delete-btn:hover {
    background: #e84118;
  }
</style>
