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

// Aqui vai o resto do seu código de login
header('Content-Type: application/json');

// Iniciar sessão
session_start();

try {
    // Conexão PDO
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
            $_SESSION['admin_logado'] = true;

            echo json_encode([
                "success" => true,
                "message" => "Login realizado com sucesso",
                "user" => [
                    "id" => $user['id'],
                    "nome" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
            exit;
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Senha incorreta"
            ]);
            exit;
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "E-mail não encontrado"
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
