function animate(id){
    let element = document.getElementById(id);
    let textNode = element.childNodes[0];
    // console.log(textNode);
    let originalText = textNode.data;
    let text = originalText;

    setInterval(function () {
        // text = text[text.length -1];
        text = text.substring(0, text.length-1);
        if (text.length === 0) {
            text = originalText;
        }
        textNode.data = text;
    },100);
}    

