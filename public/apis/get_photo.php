<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

require 'conexao_db.php';

if (isset($_GET['id_user'])) {
    $stmt = $pdo->prepare("SELECT photo FROM users WHERE id_user = ?");
    $stmt->execute([$_GET['id_user']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && $row['photo']) {
        header("Content-Type: image/jpeg");
        header("Content-Length: " . strlen($row['photo']));
        echo $row['photo'];
    } else {
        http_response_code(404);
        echo "Imagem não encontrada";
    }
} else {
    http_response_code(400);
    echo "Parâmetro id_user é obrigatório";
}