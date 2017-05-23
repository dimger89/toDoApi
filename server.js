const express = require('express');
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/play');
mongoose.Promise = require('bluebird');
const db = mongoose.connection;
const port = 3000;

let userSchema = mongoose.Schema({
    name: String,
    checked: Boolean
});

let User = mongoose.model('User', userSchema);

var anotherUser = new User({ name: 'Zhora', checked: true });
console.log(anotherUser.name);

anotherUser.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('added new user!');
    User.find(function (err, users) {
	  if (err) return console.error(err);
	  console.log(users);
	});
  }
});



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('we\'re connected!');
});

app.use(express.static(__dirname + '/public'));

app.listen(port);

app.get('/api/contactlist', (req, res) => {
	User.find(function (err, users) {
	  if (err) return console.error(err);
	  res.json(users);
	});
	
});

console.log(`Server is running on port ${port}`);