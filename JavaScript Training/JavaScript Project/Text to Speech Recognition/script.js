const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
    if('webkitSpeechRecognition' in  window){
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    }
}

function setupRecognition(recognition){
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        const {finalTranscript, interimTranscript} = processTranscript(event.results);
        resultElement.innerHTML =  finalTranscript + interimTranscript;
    }
}

function processTranscript(results) {
    let finalTranscript = '' ;
    let interimTranscript = '';
    for (let i = 0 ; i< results.length; i++){
        let transcript = results[i][0].transcript;
        transcript = transcript.replace(/\n/g,"<br>");
        if(results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript ;
        }
    }
    return {finalTranscript, interimTranscript};
}

function stopConverting() {
    if(recognition) {
        recognition.stop();
    }
}