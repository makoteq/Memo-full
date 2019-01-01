let cout1 = 0;
let cout2 = 0;
let cout3 = 0;
$(document).ready(function() {
  $.ajax({
    type: "POST",
    url: "tp_server.php",
    success: function(result) {
      var obj = JSON.parse(result);
      var size = obj.results.length;
      var txt1 = "<tr><th>User</th><th>Complete Levels</th></tr>";
      var txt2 = "<tr><th>User</th><th>Complete Levels</th></tr>";
      var txt3 = "<tr><th>User</th><th>Complete Levels</th></tr>";
      for (i = 0; i < size; i++) {
        if (cout1 < 10) {
          if (obj.results[i].Mode == "Easy") {
            txt1 += "<tr><td>" + obj.results[i].username + "</td>";
            txt1 += "<td>" + obj.results[i].level + "</td></tr>";
            cout1++;
          }
        }
        if (cout2 < 10) {
          if (obj.results[i].Mode == "Medium") {
            txt2 += "<tr><td>" + obj.results[i].username + "</td>";
            txt2 += "<td>" + obj.results[i].level + "</td></tr>";
            cout2++;
          }
        }
        if (cout3 < 10) {
          if (obj.results[i].Mode == "Hard") {
            txt3 += "<tr><td>" + obj.results[i].username + "</td>";
            txt3 += "<td>" + obj.results[i].level + "</td></tr>";
            cout3++;
          }
        }
      }
      $("#tableEasy").html(txt1);
      $("#tableMedium").html(txt2);
      $("#tableHard").html(txt3);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  });
});
