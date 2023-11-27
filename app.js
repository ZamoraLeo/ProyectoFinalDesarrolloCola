const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('app.db');

app.use(express.static(path.join(__dirname, 'public')));

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS materias (id INTEGER PRIMARY KEY, nombre TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS alumnos (id INTEGER PRIMARY KEY, nombre TEXT, materia_id INTEGER)');
});

app.get('/materias', (req, res) => {
  db.all('SELECT * FROM materias', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ materias: rows });
  });
});

app.post('/materias', (req, res) => {
  const nombre = req.body.nombre;
  db.run('INSERT INTO materias (nombre) VALUES (?)', [nombre], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Materia creada exitosamente' });
  });
});

app.get('/alumnos', (req, res) => {
  db.all('SELECT * FROM alumnos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ alumnos: rows });
  });
});

app.post('/alumnos', (req, res) => {
  const nombre = req.body.nombre;
  const materia_id = req.body.materia_id;
  db.run('INSERT INTO alumnos (nombre, materia_id) VALUES (?, ?)', [nombre, materia_id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Alumno creado exitosamente' });
  });
});

//Eliminar Datos
//require('./eliminar-datos');

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
