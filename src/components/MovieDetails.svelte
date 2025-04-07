<script>
  import { supabase } from "../scripts/supabase";

  export let movie;
  export let onClose;

  let isLoading = false;
  let error = "";

  // Close popup with Escape key
  function handleKeydown(e) {
    if (e.key === "Escape") onClose();
  }

  async function handleWatchlist() {
    // Check if user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Show login prompt inside the popup
      const wantsToLogin = confirm(
        `Want to save "${movie.Title}" to your watchlist?\n\nPlease login or sign up.`
      );
      if (wantsToLogin) {
        // Store movie for later
        sessionStorage.setItem("watchlist_movie", JSON.stringify(movie));
        // Redirect to login page
        window.location.href = "/src/user/login.html";
      }
      return;
    }

    // If logged in, add to watchlist
    isLoading = true;
    try {
      const { error } = await supabase.from("watchlist").upsert({
        user_id: user.id,
        movie_id: movie.imdbID,
        title: movie.Title,
        // poster: movie.Poster,
        year: movie.Year,
      });

      if (error) throw error;
      alert(`${movie.Title} added to your watchlist!`);
    } catch (err) {
      error = err.message;
      alert("Error: " + err.message);
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="popup">
  <div class="popup-content" role="dialog" aria-modal="true">
    <div class="modal-content">
      <div class="movie-details">
        <div class="poster-and-info">
          <img
            src={movie.Poster}
            alt={`Poster for ${movie.Title}`}
            class="modal-poster"
          />
          <div class="details">
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <div class="ratings">
              {#each movie.Ratings as rating}
                <p><strong>{rating.Source}:</strong> {rating.Value}</p>
              {/each}
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button on:click={onClose}>Close</button>
          <button
            on:click={handleWatchlist}
            class="watchlist-btn"
            disabled={isLoading}
          >
            {#if isLoading}
              <span class="loading-spinner">↻</span> Adding...
            {:else}
              Add to Watchlist
            {/if}
          </button>
        </div>

        {#if error}
          <p class="error-message">{error}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-family: "Inter", sans-serif;
  }

  .modal-content {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    border-radius: 16px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .poster-and-info {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .modal-poster {
    max-width: 260px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
  }

  .details h2 {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  .details p {
    margin: 0.5rem 0;
  }

  .details p:nth-of-type(3) {
    font-style: italic;
    line-height: 1.7;
    color: #444;
  }

  .details p strong {
    color: #555;
  }

  .ratings p {
    margin: 0.25rem 0;
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  button {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .watchlist-btn {
    background: #2563EB;
    color: white;
  }

  .watchlist-btn:hover:not(:disabled) {
    background: #1b48aa;
  }

  .loading-spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    color: #e63946;
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .poster-and-info {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .modal-poster {
      max-width: 200px;
    }

    .details {
      padding: 0 0.5rem;
    }
  }
</style>
