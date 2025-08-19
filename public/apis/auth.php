<?php
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verificarToken() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Token não informado"]);
        exit;
    }

    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);

    try {
        $decoded = JWT::decode($token, new Key("seu_segredo_aqui", 'HS256'));
        return $decoded; // retorna os dados do token
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Token inválido", "error" => $e->getMessage()]);
        exit;
    }
}

?>