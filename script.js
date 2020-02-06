let color_table = ["blue", "red", "green", "yellow"];
let sekwencja = [];
let input_table = [];
let level = 1;


function next(){
    let randomnumber = Math.floor(Math.random() * 4);
    return randomnumber;
}

function bringback_colors(id){
    var blue_color = "rgb(74,35,232)";
    var yellow_color = "rgb(231,235,33)";
    var red_color = "rgb(232,74,35)";
    var green_color = "rgb(33,235,63)";
    switch(id){
        case "blue":
            $("#blue").css("background-color", blue_color);
            break;
        case "red":
            $("#red").css("background-color", red_color);
            break;
        case "green":
            $("#green").css("background-color", green_color);
            break;
        case "yellow":
            $("#yellow").css("background-color", yellow_color);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function change_color(id, color){
    $("#" + id).css("background-color", color);
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
    sleep(1200).then(() => { bringback_colors(id); });
}

function pick_color(color_id){
    let new_color = "";
    switch(color_id){
        case "blue":
            new_color = "rgb(36, 150, 237)";
            change_color("blue", new_color);
            break;
        case "red":
            new_color = "rgb(242, 105, 92)";
            change_color("red", new_color);
            break;
        case "green":
            new_color = "rgb(131, 242, 124)";
            change_color("green", new_color);
            break;
        case "yellow":
            new_color = "rgb(240, 245, 108)";
            change_color("yellow", new_color);
        }
    }

function dodaj_do_sekwencji(kolor){
    sekwencja.push(kolor);
}

async function graj_sekwencje(){
        for (var i=0; i<sekwencja.length; i++){
            pick_color(sekwencja[i]);
            await sleep(1000);
        }
}

function graj_automat(){
    let losowy_nr = next();
    let wybrany_kolor = color_table[losowy_nr];
    dodaj_do_sekwencji(wybrany_kolor);
    graj_sekwencje();
}

function sprawdz(){
    var test = 1;
    for (var i=0; i<input_table.length; i++){
        if (input_table[i] != sekwencja[i]){
            var audio = new Audio("sounds/wrong.mp3");
                audio.play();
                sekwencja = [];
            level = 1;
            document.getElementById("lvl").innerHTML = "1";
            document.getElementById("okej").innerHTML = "";
            test = 0;
        }
    }
    if ((input_table.length == sekwencja.length) && test == 1){
        document.getElementById("okej").innerHTML = "dobrze";
    }
}

$(".inside").click(function(){
    var color_id2 = $(this).attr("id");
    pick_color(color_id2);
    input_table.push(color_id2);
    sprawdz();
});

$("#btn1").click(function(){
    document.getElementById("lvl").innerHTML = level; 
    document.getElementById("okej").innerHTML = "";
    level += 1;
    input_table = [];
    graj_automat();
});