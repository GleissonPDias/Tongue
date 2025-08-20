<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require 'conexao_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['user_id'];

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $photoData = file_get_contents($_FILES['photo']['tmp_name']);

        $stmt = $pdo->prepare("UPDATE users SET photo = ? WHERE id_user = ?");
        $stmt->execute([$photoData, $userId]);

        echo json_encode(["success" => true, "message" => "Foto atualizada com sucesso"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro no upload da imagem"]);
    }
}