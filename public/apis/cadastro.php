<?php
header('Content-Type: application/json');
session_start();

try {
    require_once('conexao_db.php');

    // Lê os dados da requisição POST
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $email = $_POST['email'] ?? '';
    $security_phrase = $_POST['security_phrase'] ?? '';

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