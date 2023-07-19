
const audioButton = document.getElementById("audioButton");
var audio = document.getElementById("myAudio");

audioButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play(); 
        audioButton.innerText = "Pausar sonido"; 
    } else {
        audio.pause(); 
        audioButton.innerText = "Reproducir sonido"; 
    }
});