<?php
// Caminho para o arquivo SQLite
$path = __DIR__ . "/../db.db"; // ajuste conforme seu projeto

$dsn = "sqlite:" . $path;

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Cria tabela se não existir
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id_user INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            security_phrase TEXT,
            bio TEXT
        )
    ");
} catch (PDOException $e) {
    error_log("Erro DB: " . $e->getMessage());
    throw $e;
}
?>
