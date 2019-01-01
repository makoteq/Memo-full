<?php
$host = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "memo";
$conn = new mysqli($host, $db_user, $db_password, $db_name);

function addJsonString($name, $value) {
    return "\"".$name."\": \"".$value."\"";
}
if ($conn->connect_error) {
    echo "Brak połączenia z bazą danych";
} else {
    //ok :-D
}
$sql = "SELECT username, level,Mode FROM Base ORDER BY level DESC  ";
$result = $conn->query($sql);
$size = $result->num_rows;


$jsonResponse = "{";

if ($size==0){
    $jsonResponse .= "nic";
}else{
    $jsonResponse .= "\"size\": $size,";
}

$jsonResponse .= "\n\"results\":[";
for ($i=0; $i<$size; $i++) { 
    $row = $result->fetch_assoc();
    if ($i) $jsonResponse .= "\n,";
    $jsonResponse .= "{";
    $jsonResponse .= addJsonString("username", $row["username"]);        
    $jsonResponse .= ",";
    $jsonResponse .= addJsonString("level", $row["level"]);      
    $jsonResponse .= ",";
    $jsonResponse .= addJsonString("Mode", $row["Mode"]);        
    $jsonResponse .= "}";
}
$jsonResponse .= "]";

$jsonResponse .= "}";
echo $jsonResponse;
$conn->close();
?>
