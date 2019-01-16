$(document).ready(function() {
  if (window.matchMedia("(max-width: 500px)").matches) {
    $(".fb-like").attr("data-size", "small");
  }
  $("#button").click(function() {
    $(".tryb").slideToggle(200);
  });
  $.ajax({
    type: "POST",
    url: "tp_server.php",
    success: function(result) {
      var obj = JSON.parse(result);
      var txt = "<tr><th>User</th><th>Complete Levels</th><th>Mode</th></tr>";
      for (i = 0; i < 3; i++) {
        txt += "<tr><td>" + obj.results[i].username + "</td>";
        txt += "<td>" + obj.results[i].level + "</td>";
        txt += "<td>" + obj.results[i].Mode + "</td></tr>";
      }
      $("#list").html(txt);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });
});
