

CREATE TABLE tbl_votos (

  id INT AUTO_INCREMENT PRIMARY KEY,

  opcao_nome VARCHAR(100) NOT NULL UNIQUE,

  total_votos INT DEFAULT 0

);

INSERT INTO

  tbl_votos (opcao_nome, total_votos)

VALUES

  ('JavaScript', 0),

  ('Python', 0),

  ('SQL', 0);


select* from tbl_votos;