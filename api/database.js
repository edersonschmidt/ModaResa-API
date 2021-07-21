const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.')

        db.run(`
            CREATE TABLE staffs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname text, 
                lastname text, 
                email text UNIQUE, 
                password text, 
                CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (!err) {
                const insertStaff = 'INSERT INTO staffs (firstname, lastname, email, password) VALUES (?,?,?,?)'
                db.run(insertStaff, ["adminStaff", "lastname admin", "adminStaff@example.com", md5("admin123456")])
                db.run(insertStaff, ["userStaff", "lastname user", "userStaff@example.com", md5("user123456")])
            }
        });

        db.run(`
            CREATE TABLE clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text, 
                email text UNIQUE, 
                password text, 
                CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (!err) {
                const insertClient = 'INSERT INTO clients (name, email, password) VALUES (?,?,?)'
                db.run(insertClient, ["adminClient", "admin@example.com", md5("admin123456")])
                db.run(insertClient, ["userClient", "user@example.com", md5("user123456")])
            }
        });

        db.run(`
            CREATE TABLE appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                startTime TEXT, 
                endTime TEXT, 
                subject TEXT,
                description TEXT,
                clientId INTEGER NOT NULL,
                staffId INTEGER NOT NULL,
                FOREIGN KEY (clientId) REFERENCES clients(id),
                FOREIGN KEY (staffId) REFERENCES staffs(id)
            )`,
        (err) => {
            if (!err) {
                const insertClient = 'INSERT INTO appointments (startTime, endTime, clientId, staffId, subject, description) VALUES (?,?,?,?,?,?)'
                db.run(insertClient, ['1626696900000', '1626714900000', 1, 1, 'event subject', 'event description'])
                db.run(insertClient, ['1626790261000', '1626812700000', 1, 1, 'event subject 2', 'event description 2'])
            }
        });
    }
});

async function all(query, params = []){
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
           if (err){ return reject(err); }
           resolve(rows);
         });
    });
}

async function get(query, params = []){
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, rows) => {
           if (err){ return reject(err); }
           resolve(rows);
         });
    });
}

async function run(query, params = []){
    return new Promise((resolve, reject) => {
        db.run(query, params, (err, result) => {
           if (err){ return reject(err); }
           resolve(result);
         });
    });
}

module.exports = { all, get, run }
