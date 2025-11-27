<?php
$conexao = new mysqli("localhost", "root", "", "enquete_db");

$opcao = $_POST['opcao'];

$sql = "INSERT INTO votos (opcao) VALUES ('$opcao')";
$conexao->query($sql);

header("Location: resultado.php");
?>