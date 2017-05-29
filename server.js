const express = require('express');
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/play');
mongoose.Promise = require('bluebird');
const db = mongoose.connection;
const bodyParser = require('body-parser');
const port = 3000;

let userSchema = mongoose.Schema({
    name: String,
    checked: Boolean,
    children: Array
});

let User = mongoose.model('User', userSchema);

//var anotherUser = new User({ name: 'Petya', checked: true, children: [{name: 'Petya2', checked: true}] });
//var anotherUser2 = new User({ name: 'Kolya', checked: true, children: [{name: 'Kolya2', checked: true}] });
//var anotherUser3 = new User({ name: 'Zhenya', checked: true, children: [{name: 'Zhenya2', checked: true}] });
//var anotherUser4 = new User({ name: 'Leha', checked: true, children: [{name: 'Leha2', checked: true}] });


 //anotherUser.save((err) => {
 //  if (err) {
 //    console.log(err);
 //  } else {
 //    console.log('added new user!');
 //    User.find(function (err, users) {
 //       if (err) return console.error(err);
 //       console.log(users);
 //     });
 //  }
 //});



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
        console.log('we\'re connected!');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port);

app.get('/api/contactlist/', (req, res) => {
                 User.find(function (err, users) {
                  if (err) return console.error(err);
                  res.json(users);
                });
});

app.get('/api/contactlist/:_id', (req, res) => {
        User.find(req.params, function (err, users) {
                if (err) return console.error(err);
                res.json(users);
        });
});

app.post('/api/contactlist/', (req, res) => {
        console.log(req.body);
        var reqBody = req.body,
                anotherUser;
        if (!reqBody.checked) {
                reqBody.checked = false;
        }
        if (reqBody.name) {
                anotherUser = new User(reqBody);
        }

        anotherUser.save((err) => {
          if (err) {
                console.log(err);
          } else {
                res.send(true);
          }
        });
});

app.delete('/api/contactlist/:_id', (req, res) => {
        User.remove(req.params, (err, users) => {
                console.log(users);
                res.send(true);
        });
});

app.put('/api/contactlist/:_id', (req, res) => {

        User.find(req.params, function (err, user) {
                if (err) return console.error(err);
                var selectedUser = user;
                if (!req.body.children) {
                        req.body.children = [];
                }
                req.body.children.push(selectedUser[0]);
                console.log(req.body);
                //User.update(req.params, req.body, {multi: false}, function(err, doc){
                //      if (err) return res.status(500).send({ error: err });
        //
                //      res.send("succesfully saved");
                //});
        });


});

console.log(`Server is running on port ${port}`);