const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = 'mongodb://bbansal:hackduke2018@ds231643.mlab.com:31643/go-green';
var db
var emailService = require('./emailService/emailService');

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db('go-green') // whatever your database name is
  app.listen(8080, () => {
    console.log('listening on 8080')

    app.use(bodyParser.urlencoded({extended: true}), function(req, res, next) {
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

    app.post('/updateUser', (req, res) => {
      let updateUser = req.body.updateUser;
      let userEmail = req.body.userEmail;
      let newScore = req.body.newScore;
      let isEBill = req.body.eBill;
      let userFirstName = req.body.firstName;
      let oldScore = req.body.oldScore;
      let scoreUpdateIndex = newScore - oldScore;
      // send email to user udpating them about score change
      let userEBillCount = 0;

      if (isEBill === "true") {
        userEBillCount = 1;
        emailService.sendEmail(userEmail, userFirstName, oldScore, newScore);
      }

      let dataBody = {
        "firstName": "Robert",
        "lastName": "Patterson",
        "email": userEmail,
        "goGreenScore": 50,
        "totalVisits": 1,
        "eBillVisits": userEBillCount
      }
      if (updateUser === "false") {
        // add user to database
        db.collection('User').save(dataBody, (err, result) => {
          if (err) return res.send(err);
          console.log('saved to database');
          res.send(result)
        })
      } else {
        if (isEBill === "true") {
          db.collection('User').findOneAndUpdate(
            {
              "email": userEmail
            },
            {
              $inc: { "totalVisits": 1, "eBillVisits": 1, "goGreenScore": scoreUpdateIndex}
            },
            (err, result) => {
              if (err) return res.send(err)
              res.send(result)
            }
          )
        } else {
          db.collection('User').findOneAndUpdate(
            {
              "email": userEmail
            },
            {
              $inc: { "totalVisits": 1, "goGreenScore": scoreUpdateIndex}
            },
            (err, result) => {
              if (err) return res.send(err)
              res.send(result)
            }
          )
        }
      }
    })
  })
})
