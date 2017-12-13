<?php
$q=$_GET["q"];

if(isset($_GET["q"]))
{
    $fileContent = fopen($_GET["q"], "r");

    while(!feof($fileContent))
    {
        $mapContent = fgets($fileContent);
    }

    fclose($fileContent);

    echo($mapContent);
}

?>