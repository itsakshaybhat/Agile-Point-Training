// Get the HTML element where we want to display the speech recognition results
// This will show the text that the user speaks
const resultElement = document.getElementById("result");

// Global variable to store the speech recognition instance
// This allows us to access the recognition object in different functions
let recognition;

// ============================================
// FUNCTION 1: START SPEECH RECOGNITION
// ============================================
// This function is called when user clicks "Click to talk" button
function startConverting() {
    // Check if the browser supports speech recognition API (webkitSpeechRecognition)
    // Different browsers may use different names for this API
    if ('webkitSpeechRecognition' in window) {
        // Create a new instance of speech recognition
        // This object will capture and process the user's voice
        recognition = new webkitSpeechRecognition();

        // Configure the speech recognition settings
        setupRecognition(recognition);

        // Start listening to the user's voice
        recognition.start();
    }
}

// ============================================
// FUNCTION 2: SETUP SPEECH RECOGNITION CONFIGURATION
// ============================================
// This function configures how the speech recognition should behave
function setupRecognition(recognition) {
    // Allow continuous speech recognition (don't stop after first pause)
    recognition.continuous = true;

    // Show interim results (text that's being recognized while user is still speaking)
    recognition.interimResults = true;

    // Set the language for speech recognition (en-US = English - United States)
    // Change this to 'hi-IN' for Hindi, 'es-ES' for Spanish, etc.
    recognition.lang = 'en-US';

    // This event handler runs every time speech is recognized
    // 'event.results' contains all the recognized speech
    recognition.onresult = function(event) {
        // Call processResult to separate final and interim transcripts
        const {finalTranscript, interTranscript} = processResult(event.results);

        // Display the combined text in the result element
        resultElement.innerHTML = finalTranscript + interTranscript;
    }
}

// ============================================
// FUNCTION 3: PROCESS SPEECH RESULTS
// ============================================
// This function separates final (completed) and interim (temporary) speech results
function processResult(results){
    // Store the final text that has been confirmed by the system
    let finalTranscript = '';

    // Store the interim text that's still being recognized (user is still speaking)
    let interTranscript = '';

    // Loop through all results from the speech recognition
    // Each result contains one or more transcript options
    for(let i = 0 ; i < results.length; i++){
        // Get the first transcript option for this result
        // results[i][0] = first option, .transcript = the actual text
        let transcript = results[i][0].transcript;

        // Replace line breaks (\n) with HTML line break tags (<br>)
        // This makes multiple lines display properly on the webpage
        // /\n/g = regular expression to find all newlines
        transcript = transcript.replace(/\n/g,"<br>");

        // Check if this result is final (user has completed speaking for this segment)
        if(results[i].isFinal) {
            // Add confirmed text to finalTranscript
            finalTranscript += transcript;
        } else {
            // Add temporary/interim text to interTranscript
            // This text might change as user continues speaking
            interTranscript += transcript;
        } 
    }

    // Return both transcripts as an object
    // This allows the calling function to get both at once
    return {finalTranscript, interTranscript};
}

// ============================================
// FUNCTION 4: STOP SPEECH RECOGNITION
// ============================================
// This function is called when user clicks "Stop the Record" button
function stopConverting() {
    // Check if recognition object exists (if speech recognition was started)
    if(recognition){
        // Stop listening to the user's voice
        recognition.stop();
    }
}

