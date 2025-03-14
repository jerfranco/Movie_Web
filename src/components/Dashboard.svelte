<script>
    import { gfg } from '../scripts/stars.js';
    
</script>


<main id="dashMain">
<h2>Watchlist</h2>
    <div id="watchlist">
        <ul id="watchHeading">
        <li>Poster</li>
        <li>Title</li>
        <li>Year</li>
        <li>Watched?</li>
        </ul>
        <ul>
        <li>Poster</li>
        <li>Title</li>
        <li>Year</li>
        <div id="checkbox">
            <input type="checkbox" id="yes" name="yes" />
            <label for="watched">Yes</label>
            <input type="checkbox" id="no" name="no" />
            <label for="no">No</label>
        </div>
        </ul>
        <ul>
        <li>Poster</li>
        <li>Title</li>
        <li>Year</li>
        <div id="checkbox">
            <input type="checkbox" id="yes" name="yes" />
            <label for="watched">Yes</label>
            <input type="checkbox" id="no" name="no" />
            <label for="no">No</label>
        </div>
        </ul>
        <ul>
        <li>Poster</li>
        <li>Title</li>
        <li>Year</li>
        <div id="checkbox">
            <input type="checkbox" id="yes" name="yes" />
            <label for="watched">Yes</label>
            <input type="checkbox" id="no" name="no" />
            <label for="no">No</label>
        </div>
        </ul>
    </div>

    <h2>Review</h2>
    <div id="review">
        <ul id="reviewHeading">
        <li>Movie</li>
        <li>Rating</li>
        <li>Review</li>
        <li>Actions</li>
        </ul>
        <ul>
        <li>Movie</li>
        <div class="card">
            <span on:click={() => gfg(1, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(2, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(3, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(4, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(5, this.parentElement)} class="star">★</span>
            <div class="output"></div> <!-- Optional: Add output for each card -->
        </div>
        <li>Review</li>
        <li>Actions</li>
        </ul>
        <ul>
        <li>Movie</li>
        <div class="card">
            <span on:click={() => gfg(1, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(2, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(3, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(4, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(5, this.parentElement)} class="star">★</span>
            <div class="output"></div> <!-- Optional: Add output for each card -->
        </div>
        <li>Review</li>
        <li>Actions</li>
        </ul>
        <ul>
        <li>Movie</li>
        <div class="card">
            <span on:click={() => gfg(1, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(2, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(3, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(4, this.parentElement)} class="star">★</span>
            <span on:click={() => gfg(5, this.parentElement)} class="star">★</span>
            <div class="output"></div> <!-- Optional: Add output for each card -->
        </div>
        <li>Review</li>
        <li>Actions</li>
        </ul>
    </div>
</main>

<style>
    .card {
      padding: 4rem;
      border: black solid 1px;
      font-size: 23.5px;
    }
  
    .star {
      cursor: pointer;
      font-size: 23px; /* Added font-size for consistency */
    }
  
    .one {
      color: rgb(255, 0, 0);
    }
  
    .two {
      color: rgb(255, 106, 0);
    }
  
    .three {
      color: #fccf00;
    }
  
    .four {
      color: rgb(255, 255, 0);
    }
  
    .five {
      color: rgb(24, 159, 14);
    }
  
    .output {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  </style>