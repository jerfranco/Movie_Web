<script>
    import { onMount } from "svelte";
    import { supabase } from "../scripts/supabase";
  
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
<header id="homeHeader">
    <h2><a href="/">Movie Website</a></h2>
    <nav>
        <ul>
            {#if user}
                <li>
                    <button on:click={handleLogout}>Logout</button>
                </li>
            {:else}
                <li>
                    <a href="/src/user/login.html">Login</a>
                    <a href="/src/user/signup.html">Sign up</a>
                </li>
            {/if}
            <!-- <li><a href="/src/user/dashboard.html">Dashboard</a></li> -->
        </ul>
    </nav>
</header>