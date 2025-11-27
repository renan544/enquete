<?php
$conexao = new mysqli("localhost", "root", "", "enquete_db");

$resultado = $conexao->query(
  "SELECT opcao, COUNT(*) AS total 
   FROM votos 
   GROUP BY opcao"
);
?>

<h2>Resultado da enquete</h2>

<?php
while ($linha = $resultado->fetch_assoc()) {
  echo $linha['opcao'] . ": " . $linha['total'] . " votos<br>";
}
?>