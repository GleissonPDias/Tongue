<?php
require_once('verificar_token.php');

$usuario = verificarToken(); // só continua se o token for válido

echo json_encode([
    "success" => true,
    "message" => "Você acessou uma rota protegida!",
    "dados_token" => $usuario
]);