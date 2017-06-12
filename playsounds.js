var playingSoundsMap = new Map(),
    borderStyle = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];

/* thanks Anatoliy (https://stackoverflow.com/questions/1484506/random-color-generator-in-javascript) */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomElement(array){
    return array[Math.floor(Math.random() * array.length + 1) - 1];
}

function randomizeColors(){
    $(".randomColor").each(function(){
        $(this).css("background-color", getRandomColor());
        $(this).css("color", getRandomColor());
        $(this).css("border-color", getRandomColor());
        $(this).css("border-style", getRandomElement(borderStyle)+" "+getRandomElement(borderStyle)+" "+getRandomElement(borderStyle)+" "+getRandomElement(borderStyle));
    });
    $("body").css("background-color", getRandomColor());
}

$("button.newColors").bind( "click", function() {
    randomizeColors();
});

$.getJSON('/sounds/list.json', function(data) {        
    var soundList = String(data["sound"]).split(",");
    soundList.forEach(function(sound) {
        $("div#soundcontainer").append("<span class='soundButton randomColor' id='" + sound + "'>" + sound.split(".")[0] + "</span>");
    });

    $("span.soundButton").bind( "click", function(event) {
        songName = event.target.id;
        if (playingSoundsMap.has(songName)){
            playingSoundsMap.get(songName).pause();
            playingSoundsMap.delete(songName);
        } else {
            var audio = new Audio("/sounds/" + songName);
            audio.play();
            playingSoundsMap.set(songName, audio);
        }
    });

    randomizeColors();
});