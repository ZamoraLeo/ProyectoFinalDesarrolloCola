const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('app.db');

db.run('DELETE FROM materias', function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('Todos los datos de materias fueron eliminados');
});

db.run('DELETE FROM alumnos', function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('Todos los datos de alumnos fueron eliminados');
});

db.close();