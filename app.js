'use strict';
const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = 3000;

var uptime = () => {
	var t = os.uptime();
	var days = Math.floor(t / 3600 / 24);
	var hours = Math.floor(t / 3600 % 24);
	var minutes = Math.floor(t % 3600 / 60);
	var seconds = Math.floor(t % 3600 % 60);
	return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {hostname:process.env.HOSTNAME_ENV, ip:process.env.IP_ENV, uptime:uptime()});
})

app.listen(port, () => {
	console.log(`Listening on http://0.0.0.0:${port}/`);
})
