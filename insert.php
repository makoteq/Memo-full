<?php
$host = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "memo";
$conn = new mysqli($host, $db_user, $db_password, $db_name);
$username= $_POST["nick"];
$level= $_POST["level"];
$mode =$_POST["Mode"];
if ($conn->connect_error) {
    echo "Brak połączenia z bazą danych";
} else {
    //ok :-D
}
$sql = "INSERT INTO Base (username, level,Mode)
VALUES ('$username','$level','$mode')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>