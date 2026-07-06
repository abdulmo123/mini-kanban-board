const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS task (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                status TEXT NOT NULL
            );
        `)

    const stmt = db.prepare('INSERT INTO task (id, name, status) VALUES(?, ?, ?)')
    stmt.run(1, 'car wash', 'to-do');
    stmt.run(2, 'groceries', 'in progress');
    stmt.run(3, 'oil change', 'done');

    stmt.finalize();

    db.each(('SELECT * FROM task'), (err, row) => {
        console.log(row.id + ' --- ' + row.name + ' --- ' + row.status);
    });
});

db.close();