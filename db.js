const sqlite3 = require("sqlite3").verbose();
const dbName = "reader.sqlite";
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  const sql = `
  CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content TEXT, time)
  `;
  db.run(sql);
});

class Article {
  static all(cb) {
    db.all("SELECT * FROM articles", cb);
    console.log(cb);
  }

  static find(id, cb) {
    db.get("SELECT * FROM articles WHERE id = ?", id, cb);
  }

  static create(data, cb) {
    const sql = "INSERT INTO articles(title, content, time) VALUES (?, ?, ?)";
    db.run(sql, data.title, data.content, data.time, cb);
  }

  static delete(id, cb) {
    if (!id) return cb(new Error("Please provide an id"));
    db.run("DELETE FROM articles WHERE id = ?", id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;
