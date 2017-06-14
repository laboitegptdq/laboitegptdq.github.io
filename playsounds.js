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
        $("div#soundcontainer").append("<button class='soundButton randomColor' id='" + sound + "'>" + sound.split(".")[0] + "</button>");
        /* This may me too heavy for small internet connexions */
        /*
        var audio = new Audio("/sounds/" + sound);
        playingSoundsMap.set(sound, audio);
        */
    });

    $("button.soundButton").bind( "click", function(event) {
        var audio,
            soundName = event.target.id;
        
        /* obligatory "if", if we do not load all sound when creating buttons */
        if (!playingSoundsMap.has(soundName)){
            audio = new Audio("/sounds/" + soundName);
            playingSoundsMap.set(soundName, audio);
        }
        
        audio = playingSoundsMap.get(soundName);
        if (!audio.paused && !audio.ended){/* the "ended" part is needed because of IE =] */
            audio.pause();
        } else {
            if(audio.readyState > 0){/* This is impossible on some browser (IE) if the sound isn't fully loaded */
                audio.currentTime = 0;
            }
            audio.play();
        }
    });

    randomizeColors();
});