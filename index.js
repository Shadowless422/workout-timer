const express = require('express')
const socketio = require('socket.io')
const {response} = require("express");

const app = express()
const { readFile} = require('fs').promises

app.get('/', async (request, response) => {
    response.send( await readFile('./settings.html', 'utf8' ) );
});

app.get('/timer', async (request, response) => {
    response.send( await readFile('./timer.html', 'utf8' ) );
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:${process.env.PORT || 3000}`));
