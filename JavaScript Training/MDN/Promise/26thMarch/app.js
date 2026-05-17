// doSomething().then((url)=>{
//     return fetch(url);

// }).then((result) => console.log("ok"));

doSomethingCritical()
    .then((res)=>{
        doSomethingOptional(res).catch((e) => {"ignore it"});
    })
    .then(()=> moreCriticalStuff()).catch((error)=> console.log("Total System failure"));


process.on("unhandledRejection", (reason, promise) => {
    console.log("A Promise failed and no one caugt it", reason);    
})

function successCallback(res) {
    console.log(`Audio file ready at URL: ${res}`);
}
function failureCallback(error) {
    console.log(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback)

AbortController;
rejectionHandled;
