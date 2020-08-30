"use strict";
const sqlite3 = require("sqlite3").verbose();

class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.createTable();
    this.createDBTron();
  }

  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id integer PRIMARY KEY, 
            name text, 
            email text UNIQUE, 
            user_pass text,
            is_admin integer)`;
    return this.db.run(sql);
  }
  get(sql, cb){
    return this.db.get(sql, [], (err, row) => {
      cb(err, row);
    })
  }

  selectByEmail(email, callback) {
    return this.db.get(`SELECT * FROM user WHERE email = ?`, [email], function(
      err,
      row
    ) {
      callback(err, row);
    });
  }

  insertAdmin(user, callback) {
    return this.db.run(
      "INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)",
      user,
      err => {
        callback(err);
      }
    );
  }

  selectAll(callback) {
    return this.db.all(`SELECT * FROM user`, function(err, rows) {
      callback(err, rows);
    });
  }

  insert(user, callback) {
    return this.db.run(
      "INSERT INTO user (name,email,user_pass) VALUES (?,?,?)",
      user,
      err => {
        callback(err);
      }
    );
  }
  createDBTron(){
    const sql = `
        CREATE TABLE IF NOT EXISTS tron (
          id integer PRIMARY KEY, 
          address text UNIQUE, 
          total_invest float, 
          total_withdraw float)`;
    return this.db.run(sql);
  }
  insertTron(tron, callback) {
    return this.db.run(
      "INSERT INTO tron (address,total_invest,total_withdraw) VALUES (?,?,?)",
      tron,
      err => {
        callback(err);
      }
    );
  }
  updateTron(data, cb){
    return this.db.run(
      "UPDATE tron SET total_invest=?, total_withdraw=? WHERE address=?",
      data,
      err => {
        cb(err);
      }
    );
  }
  selectTron(address, callback) {
    return this.db.get(`SELECT * FROM tron WHERE address = ?`, [address], function(
      err,
      row
    ) {
      callback(err, row);
    });
  }
}

module.exports = Db;
