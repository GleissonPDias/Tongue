<?php

$host='localhost:3307';
$db='users_db';
$user='adm';
$pass='password';
$charset='utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try{
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Pode registrar o erro em um arquivo log
    error_log("Erro DB: " . $e->getMessage());
    // Ou relançar a exceção para ser capturada no seu script PHP principal
    throw $e;
};