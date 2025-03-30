<script>
  import { supabase } from "../scripts/supabase";

  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";

  async function handleSignup(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match!";
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } } // Store username
    });

    if (error) {
      errorMessage = error.message;
    } else {
      alert("Signup successful! Check your email for verification.");
      window.location.href = "/login.html"; // Redirect to login
    }
  }
</script>

<main id="signupMain">
  <form id="signupForm" on:submit={handleSignup}>
    <label for="user">Username</label>
    <input type="text" id="user" bind:value={username} required />

    <label for="email">Email</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="pass">Password</label>
    <input type="password" id="pass" bind:value={password} required />

    <label for="confirmPass">Confirm Password</label>
    <input type="password" id="confirmPass" bind:value={confirmPassword} required />

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    <button type="submit" id="signupSubmit">Signup</button>
  </form>
</main>