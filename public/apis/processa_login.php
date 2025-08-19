<?php
// Permitir qualquer origem
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

require_once __DIR__ . '/../../vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

try {
    require_once('conexao_db.php');

    // Ler dados JSON do fetch
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $senha = $input['senha'] ?? '';

    // Verificar se o usuário existe
    $sql = "SELECT * FROM users WHERE email = :email";
    $query = $pdo->prepare($sql);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();

    if ($query->rowCount() > 0) {
        $user = $query->fetch(PDO::FETCH_ASSOC);

        if (password_verify($senha, $user['senha'])) {
            // Definir payload do JWT
            $payload = [
                'id' => $user['id_user'],
                'nome' => $user['name'],
                'email' => $user['email'],
                'iat' => time(),             // emitido em
                'exp' => time() + 3600       // expira em 1h
            ];

            // Chave secreta (alterar para algo mais seguro e guardar fora do código)
            $secretKey = 'minha_chave_super_secreta';

            // Gerar token
            $jwt = JWT::encode($payload, $secretKey, 'HS256');

            echo json_encode([
                "success" => true,
                "message" => "Login realizado com sucesso",
                'id_user' => $user['id_user'],
                "token" => $jwt
            ]);
            exit;
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Email ou Senha incorreta"
            ]);
            exit;
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Email ou Senha incorreta"
        ]);
        exit;
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erro de conexão",
        "error" => $e->getMessage()
    ]);
    exit;
}