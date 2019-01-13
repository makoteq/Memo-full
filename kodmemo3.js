var png = [
  "img/title_0.png",
  "img/title_1.png",
  "img/title_2.png",
  "img/title_3.png",
  "img/title_4.png",
  "img/title_5.png",
  "img/title_6.png",
  "img/title_7.png"
];
var array = [];
var los1 = "";
var los2 = "";
var click = 0;
var sukces = 0;
var blad = 0;
var color = 0;
var blokada = 0;
var level = 0;
var blokada2 = 0; //blokada do levelów
var username = "";
var mode ="Hard";
function Zaczynamy() {
  /* inicjalizacja */
  document.getElementById("button").innerHTML = "finish the level";
  color = 0;
  sukces = 0;
  blad = 0;
  los1 = 0;
  los2 = 0;
  click = 0;
  blokada = 0;
  if (blokada2 == 1) {
    alert("you can click only once ");
    theEnd();
  }
  console.log(array);
  console.log("zaczynamy");
  document.getElementById("licznik").innerHTML = level;
  //generowanie par+resetowanie koloru pól
  for (i = 0; i < 12; i++) {
    array.push(Math.floor(i / 2));
    document.getElementById("img" + i).src = "";
  }
  console.log(array);
  //mieszanie tablicy
  for (i = 12 - 1; i > 0; i--) {
    var swap = Math.floor(Math.random() * i);
    var tmp = array[i];
    array[i] = array[swap];
    array[swap] = tmp;
  }
  for (i = 0; i < 12; i++) {
    console.log(i);
    document.getElementById("img" + i).src = png[array[i]];
    blokada2 = 1;
  }
  setTimeout(function() {
    for (i = 0; i < 12; i++) {
      document.getElementById("img" + i).src = "";
      blokada = 1;
    }
  }, 3000);
}
function spr(id) {
  //blokada
  if (blokada == 1) {
    if (click == 1) {
      console.log("click");
      document.getElementById("img" + id).src = png[array[id]];
      los2 = array[id];
      click = 0;
      if (los1 == los2 && id != color) {
        sukces++;
        console.log(los1);
        console.log(id);
        console.log("wygrałeś");
        document.getElementById("img" + id).style.backgroundColor =
          png[array[id]];
        document.getElementById("img" + color).style.backgroundColor =
          png[array[id]];
      } else if (los1 != los2) {
        setTimeout(rem, 1000, id, color);
        blad++;
      } else if (los1 == los2 && id == color) {
        rem(id, color);
        blad++;
      }
    } else {
      document.getElementById("img" + id).src = png[array[id]];
      los1 = array[id];
      color = id;
      click = 1;
      console;
    }
    if (sukces == 6 && sukces + blad == 6) {
      document.getElementById("button").innerHTML = "next level";
      level++;
      blokada = 0;
      blokada2 = 0;
    } else if (sukces + blad == 6) {
      theEnd();
    }
  }
}
function rem(id1, color1) {
  document.getElementById("img" + id1).src = "";
  document.getElementById("img" + color1).src = "";
}
function theEnd() {
  //modalbox from SweetAlert :-D
  swal({
    closeOnClickOutside: false,
    title: "Oh noo... you lose... next time will be better",
    text: "You complite " + level + " levels",
    icon: "error",
    buttons: {
      main: "MAIN MENU",
      reload: "Let's play again",
      score: "SAVE SCORE"
    }
  }).then(value => {
    switch (value) {
      case "main":
        window.location.assign("http://localhost:8080/memo-full/");
        break;

      case "reload":
        location.reload();
        break;

      case "score":
        addUserName();
        break;

      default:
        location.reload();
    }
  });
}
function addUserName() {
  swal({
    content: {
      element: "input",
      attributes: {
        placeholder: "Write your username (max 10 words)"
      }
    }
  }).then(value => {
    check(value);
  });
}

function saveScore() {
  $.ajax({
    url: "insert.php",
    type: "POST",
    data: {
      Mode:mode,
      level: level,
      nick: username
    },
    success: function(result) {
      swal({
        closeOnClickOutside: false,
        title: "Good job! " + username,
        text: "Your score will bee add to database :-D",
        icon: "success",
        button: "NICE!"
      })
      .then((value) => {
        window.location.assign("http://localhost:8080/memo-full/");
      });
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert("Sorry something went wrong!");
    }
  });
}
function check(vol){
  if(vol.length>10  || vol.length<=0){
    addUserName();
    }else{
      username = vol;
      saveScore();
    }
  }
