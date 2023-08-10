<?php

$img = file_get_contents("php://input");

$img = str_replace('data:image/png;base64,', '', $img);

$img = str_replace(' ', '+', $img);

$data = base64_decode($img);

$file = "../generated-images/".time().'.png';

$success = file_put_contents($file, $data);

print $success ? $file.' saved.' : 'Unable to save the file.';
?>