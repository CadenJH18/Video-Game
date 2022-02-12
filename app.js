//character and blocks
var block = document.getElementById("block");
var character = document.getElementById("character");
var counter = 0;

//jump function
function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}