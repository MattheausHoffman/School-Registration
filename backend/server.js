const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com MySQL via WAMP
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // padrão do WAMP
  database: 'school_registration'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

// Tabelas
db.query(`CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL FOREIGN KEY REFERENCES users(id),
  serieAno VARCHAR(20),
  semestre VARCHAR(10)
)`);

db.query(`CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL FOREIGN KEY REFERENCES users(id),
  serieAno VARCHAR(20),
  disciplina VARCHAR(100),
)`);

db.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  sobrenome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20),
  dataNascimento DATE,
  genero VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  password VARCHAR(100),
)`);

// ROTAS
app.post('/students', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO students SET ?', data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Estudante cadastrado com sucesso', id: result.insertId });
  });
});

app.post('/teachers', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO teachers SET ?', data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Professor cadastrado com sucesso', id: result.insertId });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).send({ message: 'Credenciais inválidas' });
    res.send({ message: 'Login bem-sucedido', user: results[0] });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
