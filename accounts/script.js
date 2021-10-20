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
        usernameTXT.innerHTML = "(not logged in)";
    } else
    {
        usernameTXT.innerHTML = "Username: " + getCookie("username");
    }
}
username = GetUsername();
