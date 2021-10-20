randoms = {
  word1: ["Cool", "Super", "Nice", "Epic", "Wowers", "Pogger"],
  word2: ["Man", "World", "Boy", "Girl", "Frogger", "Tortoise", "Cat"]
}

function setCookie(cname, cvalue, exdays=null) {
  var expires = "";
  if (exdays != null) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires="+d.toUTCString() + ";";
  }
  document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

usernameTXT = document.getElementById("username");
function GetUsername() {
    if (getCookie("username") == "") {
        SetUsername();
    } else
    {
        username = getCookie("username");
        usernameTXT.innerHTML = "Username: " + username;
    }
}
function RandomUsername()
{
    var word1 = randoms.word1[Math.random(randoms.word1) * randoms.word1.length];
    var word2 = randoms.word2[Math.random(randoms.word2) * randoms.word2.length];
    var num = Math.random() * 1000;
    return word1 + word2 + num;
}
function SetUsername()
{
    setCookie("username", prompt("Enter a username", RandomUsername()));
}
