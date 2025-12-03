
const express = require('express');

const mysql = require('mysql2/promise'); 
const cors = require('cors');

const app = express();

const port = 3000; 

app.use(cors()); 

app.use(express.json()); 

const dbConfig = {

    host: 'localhost',

    user: 'root',

    password: 'flamingo', 

    database: 'enquete_db' 
};

app.use(express.static('public'));

app.get('/api/votos', async (req, res) => {

    console.log('Recebida requisição GET /api/votos');

    try {

        const connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute('SELECT opcao_nome, total_votos FROM tbl_votos');

        await connection.end();

       

       

        res.json(rows);

 

    } catch (error) {

        console.error('Erro ao buscar votos:', error);

        res.status(500).json({ message: 'Erro ao buscar votos.' });

    }

});

 



app.post('/api/votar/:opcao', async (req, res) => {

    const opcao = req.params.opcao;

    console.log(`Recebido voto para: ${opcao}`);

   

    try {

        const connection = await mysql.createConnection(dbConfig);

       

     

        const query = 'UPDATE tbl_votos SET total_votos = total_votos + 1 WHERE opcao_nome = ?';

        const [result] = await connection.execute(query, [opcao]);

        await connection.end();

        if (result.affectedRows === 0) {

            return res.status(404).json({ message: 'Opção de voto não encontrada.' });

        }

        res.status(200).json({ message: `Voto para ${opcao} registrado com sucesso!` });

    } catch (error) {

        console.error(`Erro ao votar em ${opcao}:`, error);

        res.status(500).json({ message: 'Erro ao registrar voto.' });

    }

});

 


app.listen(port, () => {

    console.log(`Servidor rodando em http://localhost:${port}`);

    console.log('Sirva o frontend abrindo http://localhost:3000 no seu navegador.');

});

