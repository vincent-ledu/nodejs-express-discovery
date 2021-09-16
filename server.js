const app  = require('./app')
const port = 3000;

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});