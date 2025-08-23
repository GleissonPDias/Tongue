<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

header('Content-Type: application/json');

try {
    require_once('conexao_db.php');

    $input = json_decode(file_get_contents('php://input'), true);
    $username = trim($input['username'] ?? '');
    $password = $input['password'] ?? '';
    $confirm_password = $input['confirm_password'] ?? '';
    $email = strtolower(trim($input['email'] ?? ''));
    $security_phrase = trim($input['security_phrase'] ?? '');
    $bio = trim($input['bio'] ?? '');

    if ($password !== $confirm_password) {
        echo json_encode(["success"=>false,"message"=>"As senhas não coincidem"]);
        exit;
    }

    // Verifica se email já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(["success"=>false,"message"=>"Email já cadastrado"]);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("
        INSERT INTO users (name, email, senha, security_phrase, bio)
        VALUES (:name, :email, :senha, :security_phrase, :bio)
    ");
    $stmt->execute([
        ':name' => $username,
        ':email' => $email,
        ':senha' => $hashed_password,
        ':security_phrase' => $security_phrase,
        ':bio' => $bio
    ]);

    echo json_encode(["success"=>true,"message"=>"Usuário cadastrado com sucesso"]);
} catch (PDOException $e) {
    echo json_encode(["success"=>false,"message"=>"Erro ao cadastrar","error"=>$e->getMessage()]);
}
?>
