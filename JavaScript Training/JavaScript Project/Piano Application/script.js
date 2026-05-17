/**
 * QUERY SELECTORS - Get all piano keys from the DOM
 * We need to select all elements with class "key" so we can attach click event listeners
 * to them later. querySelectorAll returns a NodeList of all matching elements.
 */
const keys = document.querySelectorAll(".key");

/**
 * SELECT WHITE KEYS - Store reference to white keys separately (optional for future use)
 * This could be used for styling, filtering, or specific white-key functionality.
 */
const whiteKey = document.querySelectorAll(".key.white");

/**
 * SELECT BLACK KEYS - Store reference to black keys separately (optional for future use)
 * This could be used for styling or applying black-key-specific effects.
 */
const blackKey = document.querySelectorAll(".key.black");

/**
 * ATTACH CLICK LISTENERS TO EACH KEY
 * We loop through all keys and add a "click" event listener to each one.
 * When a key is clicked, it triggers the handleKeyClick function.
 * "this" context refers to the individual key element that was clicked.
 */
keys.forEach(key => key.addEventListener("mouseover", handleKeyClick));

/**
 * EVENT HANDLER FUNCTION - Called when a key is clicked
 * This function receives the click event and passes the clicked key element to playKey()
 * We use "this" to reference the element that triggered the click event.
 */
function handleKeyClick() {
    playKey(this);
}

/**
 * PLAY AUDIO FUNCTION - Handles all audio playback logic for a specific key
 *
 * Why we need this function:
 * 1. Gets the correct audio file based on the note name (C, D, Db, etc.)
 * 2. Resets the audio to the start (currentTime = 0) so the sound plays from the beginning
 *    even if clicked multiple times quickly
 * 3. Plays the audio and adds visual feedback (active class for CSS styling)
 * 4. Removes the visual feedback when the sound ends to return key to normal state
 *
//  * param {HTMLElement} key - The piano key element that was clicked
 */
function playKey(key) {
    /**
     * GET THE AUDIO ELEMENT
     * We use key.dataset.note to get the note name from the HTML (e.g., "C", "Db")
     * Then getElementById finds the corresponding audio element with that ID
     * Example: If data-note="C", we get document.getElementById("C")
     */
    const keyAudio = document.getElementById(key.dataset.note);

    /**
     * RESET AUDIO POSITION
     * Setting currentTime to 0 ensures the sound plays from the beginning.
     * This is important for rapid clicks - without this, clicking the same key twice
     * would continue from where it left off instead of replaying from the start.
     */
    keyAudio.currentTime = 0;

    /**
     * PLAY THE SOUND
     * The play() method starts audio playback. It returns a Promise, but we're not
     * handling it here since this is a simple piano app.
     */
    keyAudio.play();

    /**
     * ADD VISUAL FEEDBACK
     * We add the "active" class to the key element, which triggers CSS styling
     * to show the key being pressed (darker color, slightly lower position, etc.)
     */
    key.classList.add("active");

    /**
     * REMOVE VISUAL FEEDBACK WHEN SOUND ENDS
     * We listen for the "ended" event on the audio element, which fires when
     * the audio finishes playing. This removes the "active" class to reset the
     * key's appearance back to normal, creating a realistic piano key animation.
     */
    keyAudio.addEventListener("ended", () => {
        key.classList.remove("active");
    });
}
