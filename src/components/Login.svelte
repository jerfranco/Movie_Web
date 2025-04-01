<script>
  import { supabase } from "../scripts/supabase";

  let emailOrUsername = "";
  let password = "";
  let errorMessage = "";
  let isLoading = false;

  async function handleLogin(event) {
    event.preventDefault();
    isLoading = true;
    errorMessage = "";

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      });

      if (error) throw error;

      // Check for pending watchlist item
      const pendingMovie = sessionStorage.getItem('watchlist_movie');
      if (pendingMovie) {
        sessionStorage.removeItem('watchlist_movie');
        alert("Login successful! The movie has been added to your watchlist.");
      } else {
        alert("Login successful!");
      }
      
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<main id="loginMain">
  <section id="loginSection">
    <form id="login" on:submit={handleLogin}>
      <label for="user">Email</label>
      <input 
        type="email" 
        id="user" 
        bind:value={emailOrUsername} 
        placeholder="Enter your email" 
        required 
      />

      <label for="pass">Password</label>
      <input 
        type="password" 
        id="pass" 
        bind:value={password} 
        placeholder="Enter your password" 
        required 
      />

      {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
      {/if}

      <button type="submit" id="loginSubmit" disabled={isLoading}>
        {#if isLoading}
          Logging in...
        {:else}
          Login
        {/if}
      </button>
      
      <p>No Account?</p>
      <button 
        type="button" 
        on:click={() => window.location.href = '/signup.html'}
      >
        Signup
      </button>
    </form>
  </section>
</main>