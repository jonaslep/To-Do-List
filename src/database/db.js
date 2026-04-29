import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./tasks.db',(err)=>{
if(err){
console.log(err);
}else{
console.log('Banco conectado');
}
});

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS tasks(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
completed INTEGER DEFAULT 0
)
`);

});

export default db;