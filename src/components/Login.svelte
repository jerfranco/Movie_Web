<main id="loginMain">
    <section id="loginSection">
        <form id="login">
            <label for="user">Email/Username</label>
            <input type="text" id="user" name="user" required>
            <label for="pass">Password </label>
            <input type="password" id="pass" name="pass" required>
            <button id="loginSubmit">Login</button>
            <p>No Account?</p>
            <button id="signup" on:click={() => window.location.href = '/signup.html'}>Signup</button>    
        </form>
    </section>
</main>
