<script>
  import { supabase } from "../scripts/supabase";

  let emailOrUsername = "";
  let password = "";
  let errorMessage = "";

  async function handleLogin(event) {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      window.location.href = "/"; // Redirect to home page without alert
    }
  }
</script>

<main id="loginMain">
  <section id="loginSection">
    <form id="login" on:submit={handleLogin}>
      <label for="user">Email</label>
      <input type="email" id="user" bind:value={emailOrUsername} placeholder="Enter your email" required />

      <label for="pass">Password</label>
      <input type="password" id="pass" bind:value={password} placeholder="Enter your password" required />

      {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
      {/if}

      <button type="submit" id="loginSubmit">Login</button>
      <p>No Account?</p>
      <button type="button" on:click={() => window.location.href = '/signup.html'}>Signup</button>
    </form>
  </section>
</main>