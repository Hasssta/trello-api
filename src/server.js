// const express = require('express');
import express from 'express';

const app = express();

const hostname = 'localhost';
const port = 8017; // tuy chon nhe

app.get('/', (req, res) => {
  res.send('<h1>Hello World Nodejs</h1>');
})

app.listen(port, hostname, () => {
    console.log(`Hello Hassta, I'm running server at http://${hostname}:${port}/`);
})