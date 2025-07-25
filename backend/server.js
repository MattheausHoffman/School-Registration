const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "school_registration",
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Conectado ao MySQL');
// });

// Tabelas - Criação da tabela USERS
db.query(
  `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  sobrenome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20),
  dataNascimento DATE,
  genero VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  password VARCHAR(100)
)`,
  (err) => {
    if (err) console.error("Erro ao criar tabela users:", err);
    else console.log("Tabela users verificada/criada.");
  }
);

// Criação da tabela STUDENTS
db.query(
  `CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  serieAno VARCHAR(20),
  semestre VARCHAR(10),
  FOREIGN KEY (userId) REFERENCES users(id)
)`,
  (err) => {
    if (err) console.error("Erro ao criar tabela students:", err);
    else console.log("Tabela students verificada/criada.");
  }
);

// Criação da tabela TEACHERS
db.query(
  `CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  serieAno VARCHAR(20),
  disciplina VARCHAR(100),
  FOREIGN KEY (userId) REFERENCES users(id)
)`,
  (err) => {
    if (err) console.error("Erro ao criar tabela teachers:", err);
    else console.log("Tabela teachers verificada/criada.");
  }
);

// ROTAS
app.post("/students", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO students SET ?", data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      message: "Estudante cadastrado com sucesso",
      id: result.insertId,
    });
  });
});

app.post("/teachers", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO teachers SET ?", data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      message: "Professor cadastrado com sucesso",
      id: result.insertId,
    });
  });
});

app.post("/users", async (req, res) => {
  const user = req.body;
  console.log("Recebido do front-end:", user);

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const senhaOriginal = user.password;

    user.password = hashedPassword;

    db.query("INSERT INTO users SET ?", user, async (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário:", err);
        return res.status(500).send(err);
      }

      await enviarEmailComSenha(user.email, senhaOriginal);

      res.send({
        message: "Usuário cadastrado com sucesso",
        id: result.insertId,
      });
    });

    console.log("Senha hasheada:", hashedPassword);
  } catch (error) {
    console.error("Erro ao gerar hash:", error);
    res.status(500).send({ error: "Erro interno ao cadastrar usuário" });
  }
});

async function enviarEmailComSenha(destinatario, senhaOriginal) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "registro.escolar.estudos@gmail.com",
      pass: "rmgr slso ymdo qgut",
    },
  });

  const mailOptions = {
    from: "registro.escolar.estudos@gmail.com",
    to: destinatario,
    subject: "Cadastro realizado com sucesso!",
    html: `
      <h3>Bem-vindo ao sistema!</h3>
      <p>Sua senha temporária é: <strong>${senhaOriginal}</strong></p>
      <p>Recomenda-se alterá-la após o primeiro acesso.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
