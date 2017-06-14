var playingSoundsMap = new Map(),
    borderStyle = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];

function getRandomColor(colorType) {
    var randomness = 255;
    if (colorType == "dark"){
        randomness = 126
    }
    var redValue = Math.floor(Math.random() * randomness + 1) - 1,
        greenValue = Math.floor(Math.random() * randomness + 1) - 1,
        blueValue = Math.floor(Math.random() * randomness + 1) - 1;
    if (colorType == "light"){
        var minLightValue = 240;
        while (redValue < minLightValue && greenValue < minLightValue && blueValue < minLightValue) {
            if(Math.random() < 0.2) redValue += 255 - minLightValue;
            if(Math.random() < 0.2) greenValue += 255 - minLightValue;
            if(Math.random() < 0.2) blueValue += 255 - minLightValue;
        }
    }
    return "rgb(" + redValue + ", " + blueValue + ", " + greenValue + ")";
}

function getRandomElement(array){
    return array[Math.floor(Math.random() * array.length + 1) - 1];
}

function randomizeColors(){
    $(".randomColor").each(function(){
        if (Math.random() < 0.5) {
            $(this).css("background-color", getRandomColor("dark"));
            $(this).css("color", getRandomColor("light"));
        } else {
            $(this).css("background-color", getRandomColor("light"));
            $(this).css("color", getRandomColor("dark"));
        }
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