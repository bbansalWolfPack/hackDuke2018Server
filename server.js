const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = 'mongodb://bbansal:hackduke2018@ds231643.mlab.com:31643/go-green';
var db

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db('go-green') // whatever your database name is
  app.listen(3000, () => {
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
      let email = req.query.userEmail;
      // find user details from the database
      db.collection('User').findOne({"email": email}, function(err, document) {
        if (err) {
          res.send('Error');
        } else {
          res.send(document);
        }
      });
    })

    // app.put('/quotes', (req, res) => {
    //   res.send('Hello World')
    // })

    // app.put('/updateUser', (req, res) => {
    //   console.log("bhavya")
    //   let userEmail = req.query.userEmail;
    //   let newScore = req.query.newScore;
    //   let isEBill = req.query.eBill;
    //   if (isEBill) {
    //     db.collections('quotes').findOneAndUpdate(
    //       {
    //         "email": userEmail
    //       },
    //       {
    //         $inc: { "totalVists": 1, "eBillVisits": 1}
    //       },
    //       (err, result) => {
    //         if (err) return res.send(err)
    //         res.send(result)
    //       }
    //     )
    //   } else {
    //     db.collections('quotes').findOneAndUpdate(
    //       {
    //         "email": userEmail
    //       },
    //       {
    //         $set: {
    //           quote: req.body.quotes
    //         },
    //
    //         $inc: { totalVists: 1}
    //       },
    //       (err, result) => {
    //         if (err) return res.send(err)
    //         res.send(result)
    //       }
    //     )
    //   }
    // })
  })
})
