<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

header('Content-Type: application/json');

require_once __DIR__ . '/../../vendor/autoload.php';
use \Firebase\JWT\JWT;

try {
    require_once('conexao_db.php');

    $input = json_decode(file_get_contents('php://input'), true);
    $email = strtolower(trim($input['email'] ?? ''));
    $senha = $input['senha'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (password_verify($senha, $user['senha'])) {
            $payload = [
                'id' => $user['id_user'],
                'nome' => $user['name'],
                'email' => $user['email'],
                'iat' => time(),
                'exp' => time() + 3600
            ];
            $secretKey = 'minha_chave_super_secreta';
            $jwt = JWT::encode($payload, $secretKey, 'HS256');

            echo json_encode([
                "success"=>true,
                "message"=>"Login realizado com sucesso",
                "id_user"=>$user['id_user'],
                "token"=>$jwt
            ]);
            exit;
        }
    }

    echo json_encode(["success"=>false,"message"=>"Email ou senha incorreta"]);
} catch (Exception $e) {
    echo json_encode(["success"=>false,"message"=>"Erro de conexão","error"=>$e->getMessage()]);
}
?>
