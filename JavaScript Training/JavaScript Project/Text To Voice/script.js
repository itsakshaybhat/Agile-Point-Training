/**
 * TEXT TO AUDIO CONVERSION
 * This application converts user-typed text into spoken audio using the Web Speech API.
 * The SpeechSynthesisUtterance object handles all the configuration for voice output.
 */

/**
 * MAIN FUNCTION - Converts text to speech
 *
 * What it does:
 * 1. Gets the text that the user typed in the input field
 * 2. Creates a SpeechSynthesisUtterance object (the browser's container for speech settings)
 * 3. Configures the speech properties (language, text, volume, speed, pitch)
 * 4. Plays the audio using the browser's speechSynthesis API
 * 5. Includes error handling for empty text
 */
function textToAudio() {
    /**
     * GET USER INPUT
     * We select the textarea/input element with class "text" and extract the user's typed text
     * .value gets the current value from the input field
     */
    let textInput = document.querySelector(".text").value.trim();

    /**
     * VALIDATION - Check if text is empty
     * We should not attempt to speak empty text, so we alert the user and exit early
     * .trim() removes whitespace, so empty spaces don't count as valid input
     */
    if (textInput === "") {
        alert("Please enter some text to convert to speech!");
        return;
    }

    /**
     * CREATE SPEECH OBJECT
     * SpeechSynthesisUtterance is a browser API object that holds all settings for text-to-speech
     * Think of it as a container for: what to say, how to say it, and in what language
     */
    let speech = new SpeechSynthesisUtterance();

    /**
     * SET LANGUAGE
     * Specifies which language to use for pronunciation and voice
     * 'en-US' = English (United States)
     * Other examples: 'en-GB' (British), 'es-ES' (Spanish), 'fr-FR' (French)
     */
    speech.lang = 'en-US';

    /**
     * SET TEXT TO SPEAK
     * This is the actual content the browser will read aloud
     * It should be the text the user typed in the input field
     */
    speech.text = textInput;

    /**
     * SET VOLUME LEVEL
     * Range: 0 to 1 (0 = silent, 1 = full volume)
     * Example: 0.5 = medium volume, 0.1 = very quiet
     */
    speech.volume = 1;

    /**
     * SET SPEAKING RATE (SPEED)
     * Range: 0.1 to 10 (1 = normal speed)
     * Example: 0.5 = half speed (slower), 2 = double speed (faster)
     * Default is 1, which is natural speaking speed
     */
    speech.rate = 1;

    /**
     * SET PITCH OF VOICE
     * Range: 0.1 to 2 (1 = normal pitch)
     * Example: 0.5 = deeper voice, 1.5 = higher pitched voice
     * Default is 1 for normal pitch
     */
    speech.pitch = 1;

    /**
     * PLAY THE AUDIO
     * speechSynthesis.speak() tells the browser to start speaking the utterance
     * It uses the system's default voice unless we specify a different one
     * The browser will read the text aloud using the settings we configured above
     */
    speechSynthesis.speak(speech);
}

/**
 * STOP SPEAKING FUNCTION
 * Stops the current speech if the user clicks a stop/pause button
 *
 * What it does:
 * - Cancels any ongoing speech synthesis
 * - Useful if the user changes their mind or plays the wrong text
 */
function stopSpeech() {
    /**
     * CANCEL SPEECH
     * The speechSynthesis.cancel() method immediately stops all speech playback
     * Unlike .pause(), cancel() will completely stop and reset the utterance
     */
    speechSynthesis.cancel();
}

/**
 * PAUSE SPEAKING FUNCTION
 * Pauses the current speech (can be resumed later)
 *
 * What it does:
 * - Temporarily stops speech but remembers where it stopped
 * - User can resume with a resume function
 */
function pauseSpeech() {
    /**
     * PAUSE SPEECH
     * The speechSynthesis.pause() method pauses speech temporarily
     * Speaking can be resumed by calling speechSynthesis.resume()
     * Different from cancel() which completely stops and resets
     */
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
}

/**
 * RESUME SPEAKING FUNCTION
 * Resumes paused speech from where it left off
 *
 * What it does:
 * - Continues speaking the paused text
 * - Only works if speech was paused (not cancelled)
 */
function resumeSpeech() {
    /**
     * RESUME SPEECH
     * The speechSynthesis.resume() method continues speaking after a pause
     * This only works if pause() was called, not cancel()
     */
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}
