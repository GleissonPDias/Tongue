<?php

// Permitir qualquer origem
header("Access-Control-Allow-Origin: *");

// Permitir métodos
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Permitir cabeçalhos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Se for pré-requisição (OPTIONS), apenas retorna ok
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
session_start();

try {
    require_once('conexao_db.php');

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$confirm_password = $input['confirm_password'] ?? '';
$email = $input['email'] ?? '';
$security_phrase = $input['security_phrase'] ?? '';

    // Verifica se as senhas coincidem
    if ($password !== $confirm_password) {
        echo json_encode([
            "success" => false,
            "message" => "As senhas não coincidem"
        ]);
        exit;
    }

    // Verifica se usuário ou e-mail já existem
    $checkSql = "SELECT COUNT(*) FROM users WHERE name = :username OR email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->bindParam(':username', $username, PDO::PARAM_STR);
    $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $checkStmt->execute();
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Usuário ou e-mail já cadastrado"
        ]);
        exit;
    }

    // Cadastra o novo usuário
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (name, email, senha, security_phrase)
            VALUES (:username, :email, :password, :security_phrase)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', $hashed_password, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':security_phrase', $security_phrase, PDO::PARAM_STR);

    $stmt->execute();

    $_SESSION['usuario_logado'] = true;

    echo json_encode([
        "success" => true,
        "message" => "Usuário cadastrado com sucesso!"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao realizar cadastro!",
        "error" => $e->getMessage() // opcional, para debug
    ]);
}
?>