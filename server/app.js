"use strict";
const express = require("express");
const DB = require("./db");
const config = require("./config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");
const history = require("connect-history-api-fallback");

const db = new DB("sqlitedb");
const app = express();
const router = express.Router();

app.use(history());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

router.get("/", function(req, res) {
  res.status(200).render(distPath + "/index.html");
});

router.get("*", function(req, res) {
  res.redirect("/");
});

router.post("/express/register", function(req, res) {
  db.insert(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8)],
    function(err) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

router.post("/express/register-admin", function(req, res) {
  db.insertAdmin(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8), 1],
    function(err) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

router.post("/express/login", (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, user: user });
  });
});

router.post("/api/createTron", async function(req, res) {
  let sql = `SELECT * FROM tron WHERE address = ${req.body.address}`;
  db.selectTron(req.body.address, (err, user) => {
    if(user && !err){
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    }else{
      db.insertTron(
          [req.body.address, 0, 0],
          function(err) {
            if (err)
              return res
                .status(500)
                .send("There was a problem registering the user.");
            db.selectTron(req.body.address, (err, user) => {
              if (err)
                return res.status(500).send("There was a problem getting user");
              let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token, user: user });
            });
          }
        );
    }
  })
  
});
router.post("/api/updateTron", async function(req, res) {
  var inputData = [req.body.total_invested, req.body.total_withdrawn, req.body.address];

  db.updateTron(inputData, function(err){
    if (err) 
      return res
      .status(500)
      .send("There was a problem registering the user.");
    else 
      res.status(200).send({ success: true });

  })
});
app.use(router);

let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log("Express server listening on port " + port);
});
