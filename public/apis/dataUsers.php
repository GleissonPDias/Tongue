<?php
// === Exibir erros temporariamente para debug ===
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// === Cabeçalhos CORS e JSON ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === Composer Autoload ===
$autoloadPath = __DIR__ . '/../../vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    echo json_encode(['success' => false, 'error' => 'Autoload não encontrado']);
    exit;
}
require_once $autoloadPath;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// === Chave secreta JWT ===
$secretKey = "minha_chave_super_secreta";

// === Pega Authorization Header de forma confiável ===
$authHeader = '';
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = trim($_SERVER['HTTP_AUTHORIZATION']);
} elseif (function_exists('getallheaders')) {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $authHeader = trim($headers['Authorization']);
    }
}

// === Extrai token do header ===
if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    echo json_encode(["success" => false, "error" => "Token não enviado"]);
    exit;
}
$jwt = $matches[1];

// === Conexão com o banco via PDO ===
$connPath = __DIR__ . '/conexao_db.php';
if (!file_exists($connPath)) {
    echo json_encode(['success' => false, 'error' => 'Arquivo de conexão não encontrado']);
    exit;
}
require_once $connPath;

// Verifica se o PDO está ok
if (!$pdo) {
    echo json_encode(['success' => false, 'error' => 'Erro na conexão com o banco']);
    exit;
}

// === Decodifica JWT e busca usuários ===
try {
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));

    // Buscar apenas o usuário logado
    $stmt = $pdo->prepare("SELECT id_user, name, email FROM users WHERE id_user = :id");
    $stmt->bindValue(':id', $decoded->id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "error" => "Usuário não encontrado"]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Token inválido: " . $e->getMessage()]);
}