$("#login-button").click(function (event) {
  var userName = document.getElementById("userName").value;
  var pwd = document.getElementById("pwd").value;
  //修改密码请改此处
  if (userName == "WangNan" && pwd == "0118") {
    event.preventDefault();
    $("form").fadeOut(500);
    $(".wrapper").addClass("form-success");
    setTimeout(function () {
      location.href="eleword.html";
    }, 1000);
  } else {
    alert("密码是WangNan的生日哦!（密码为4位数）");
  }
});