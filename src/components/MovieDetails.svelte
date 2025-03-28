<script>
    export let movie; // The movie object passed from parent
    export let onClose; // Close handler function
  
    // Handle Escape key press
    function handleKeydown(e) {
      if (e.key === "Escape") onClose();
    }
  </script>
  
  <svelte:window on:keydown={handleKeydown} />
  
  <div class="popup">
    <div class="popup-content" role="dialog" aria-modal="true">
      <div class="modal-content">
        <div class="movie-details">
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
            <button on:click={onClose}>Close</button>
          </div>
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
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }
  
    .movie-details {
      display: flex;
      gap: 2rem;
    }
  
    .modal-poster {
      max-width: 300px;
      border-radius: 8px;
    }
  
    .details {
      flex: 1;
    }
  
    .ratings {
      margin-top: 1rem;
    }
  
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #1e40af;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background: #1a365d;
    }
  </style>