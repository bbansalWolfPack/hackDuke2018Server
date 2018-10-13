const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = 'mongodb://bbansal:hackduke2018@ds231643.mlab.com:31643/go-green';
var db

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db('go-green') // whatever your database name is
  app.listen(8080, () => {
    console.log('listening on 8080')

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get('/', function(req, res) {
      res.send('Hello World')
    });

    app.get('/userDetails', (req, res) => {
      // find user details from the database
      db.collection('User').findOne({"email": "bbansal@ncsu.edu"}, function(err, document) {
        res.send(document);
      });
    })
  })
})
