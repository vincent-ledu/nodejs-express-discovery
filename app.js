const express = require('express');
const middle1 = require("./middleware1")
const { secret } = require("./secret")
const app = express();
const port = 3000;

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
app.use(middle1.middle1)
app.use(express.json());

app.use(secret)

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
    res.status(200).json(users)
})

app.get('/secret', (req, res) => {
    res.status(200).send("you are in secret area")
})

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});