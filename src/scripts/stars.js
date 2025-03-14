// script.js

// To access the stars
let stars = 
	document.getElementsByClassName("star");
let output = 
	document.getElementById("output");

// Funtion to update rating
export function gfg(n, card) {
    // Get all stars within the clicked card
    let stars = card.getElementsByClassName("star");

    // Remove previous styling
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = "star";
    }

    // Apply new styling based on the rating
    for (let i = 0; i < n; i++) {
        let cls;
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }

    // Optional: Update output for the specific card
    let output = card.querySelector(".output");
    if (output) {
        output.innerText = "Rating is: " + n + "/5";
    }
}
