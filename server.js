const express = require('express');
const app = express();

const port = 3000;
const contactlist = [
	{ name: 'Vasa Pupkin', checked: true },
	{ name: 'Syava Pupkin', checked: true },
	{ name: 'Vanya Pupkin', checked: false },
	{ name: 'Petya Pupkin', checked: true },
];

app.use(express.static(__dirname + '/public'));

app.listen(port);

app.get('/api/contactlist', (req, res) => {
	res.json(contactlist);
});

console.log(`Server is running on port ${port}`);