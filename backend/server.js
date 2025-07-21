const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com MySQL via WAMP
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // padrão do WAMP
  database: 'school_registration'
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Conectado ao MySQL');
// });


// Tabelas
// Criação da tabela USERS
db.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  sobrenome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20),
  dataNascimento DATE,
  genero VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  password VARCHAR(100)
)`, (err) => {
  if (err) console.error('Erro ao criar tabela users:', err);
  else console.log('Tabela users verificada/criada.');
});

// Criação da tabela STUDENTS
db.query(`CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  serieAno VARCHAR(20),
  semestre VARCHAR(10),
  FOREIGN KEY (userId) REFERENCES users(id)
)`, (err) => {
  if (err) console.error('Erro ao criar tabela students:', err);
  else console.log('Tabela students verificada/criada.');
});

// Criação da tabela TEACHERS
db.query(`CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  serieAno VARCHAR(20),
  disciplina VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(id)
)`, (err) => {
  if (err) console.error('Erro ao criar tabela teachers:', err);
  else console.log('Tabela teachers verificada/criada.');
});


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

app.post('/users', (req, res) => {
  const user = req.body;
  console.log('Recebido do front-end:', user); // 👈 Adiciona esse log

  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err); // 👈 E esse também
      return res.status(500).send(err);
    }
    res.send({ message: 'Usuário cadastrado com sucesso', id: result.insertId });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
