# Express discovery

## Steps

1. Install Express
1. Express Hello World
1. Handle GET request
    1. Routing
    1. Parse args
1. Handle POST request
    1. Routing
    2. Parse args
1. Handle DELETE request
    1. Routing
    2. Parse args
1. Express middleware


## Install Express

* Configure your registry for internal access (if you have an internal nexus)
```shell
npm config set registry <url-to-your-internal-nexus-nodejs-repo>
# if ssl error :
npm set strict-ssl false
```

* Configure your project and install express framework
```shell
npm init
npm install --save express
```

## Express Hello World

In index.js:
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});
```

* Launch your app:
```shell
npm start
```

* Go to http://localhost:3000


## Handle GET request
### Routing

* Make a route to handle GET /test
* Return a json object as follow:
  * Return { "alive": 0 }
  * Return http code 200

### parse args

* On GET /test?err=1, return
  * { "alive": 1 }
  * http code 500

## Handle POST request
### Routing

* Create route POST /users, to handle such requests: 
```shell
curl -X POST -H "Content-Type: application/json" -d '{"username": "bob"}' http://localhost:3000/users 
```

### Parse args

Use express.json() as middleware to:
* parse the body 
* store (in memory) the username in an array, 
* return a standard REST response: HTTP 201 and the object created in a json object

```js
const users = []
app.use(express.json());
app.post('/users', (req, res) => {
    console.log(req.body)
    users.push(req.body.username)
    res.status(201).json(req.body)
})
```

## Handle DELETE request
### Routing

* Create route DELETE /users/:id, to handle such requests: 
```shell
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/users/1 
```

### Parse args

Get the id with ```req.params.id``` and delete the user if exists

## Express middleware

Introduction to middleware (fr): https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs/Introduction#using_middleware

* Create a middleware that output "middle1" on console log on every request, without blocking the request
* Create a middleware that output "middle2" on console log on every request, blocking the process of process
* Switch order of middle1 & middle2, and watch the log

* On /secret, authorize access only to request that have an header "secret: OK"
