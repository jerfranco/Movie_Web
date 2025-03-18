<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    export let searchQuery;

    let movies = [];

    export async function fetchMovies() {
        const search = get(searchQuery);
        if (!search) return;

        const response = await fetch(`https://www.omdbapi.com/?apikey=93c9c418&s=${search}`);
        const data = await response.json();
        console.log(data);
        movies = data.Search;
        console.log(movies);
    }
</script>

<main>
    <ul>
        {#each movies as movie}
            <li>{movie.Title} ({movie.Year})</li>
        {/each}
    </ul>
</main>