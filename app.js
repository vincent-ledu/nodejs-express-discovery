const express = require('express');
const { middle1 } = require("./middleware1")
const { secret } = require("./secret")
const app = express();

const users = []

let a_middleware_function = function(req, res, next) {
    console.log("a middleware1")
    next(); // Appelez next() pour qu'Express appelle la fonction middleware suivante dans la chaîne.
  }
  let a_middleware_function2 = function(req, res, next) {
    console.log("a middleware2")
    next(); // Appelez next() pour qu'Express appelle la fonction middleware suivante dans la chaîne.
  }
  
// Fonction ajoutée avec use() pour toutes les routes et verbes
app.use(a_middleware_function2);
app.use(a_middleware_function);
app.use(middle1)
app.use(express.json());

app.use('/secret', secret)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/users', (req, res) => {
  console.log(req.body)
  users.push(req.body.username)
  res.status(201).json(req.body)
})

app.get('/users', (req, res) => {
  console.log(users)
  console.log(req.query)
  if (req.query.err) {
    let err = req.query.err
    res.status(500).json(`error: ${err}`)
  } else {
    res.status(200).json(users)
  }
})

app.delete('/users/:id', (req, res) => {
  let id = parseInt(req.params.id)
  console.log(`users.length: ${users.length}`)
  if (users.length >= parseInt(id)) {
    users.slice(id, id+1)
    res.status(200).send("OK")
  } else {
    res.status(204).send("No content found")
  }
})

app.get('/secret', (req, res) => {
  res.status(200).send("you are in secret area")
})

module.exports = app